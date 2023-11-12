import dotenv from 'dotenv'
import pkg from 'jsonwebtoken'
import mongoose from 'mongoose'
import express from 'express'
import path from 'path'
import cors from 'cors'
import * as url from 'url'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { hash, verify } from 'argon2'
import User from './model/User.mjs'
import Document from './model/Document.mjs'
import findOrCreateDocument from './functions/getDoc.mjs'
import verifyJWT from './middleware/verifyJWT.mjs'

dotenv.config()

mongoose.connect(process.env.DATABASE_URI)

// CORS config
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5317']
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1)
            callback(null, true)
        else
            callback(new Error('Not allowed by CORS'))
    },
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

// Set up server with socket.io
const app = express()
const httpServer = createServer(app)
const PORT = process.env.PORT || 3000 // If port is changed, change proxy in client package.json
const io = new Server(httpServer, {
    cors: corsOptions
})

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const { sign, verify: jwtVerify } = pkg

// Middleware
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, "..", "writing-tool", "dist")))
app.use(express.json())
app.use(cookieParser())

// User registration route
app.post('/register', async (req, res) => {
    const { username, password } = req.body
    // Check for missing username or password
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required' })

    // Check for duplicate user in the database
    const duplicate = await User.findOne({ username: username }).exec()
    if (duplicate) return res.sendStatus(409)

    // Register the new user account
    try {
        // Encrypt the password
        const hashedPswd = await hash(password)
        const result = await User.create({ "username": username, "password": hashedPswd })

        res.status(201).send()
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
})

// Login authentication route
app.post('/login', async (req, res) => {
    const { username, password } = req.body
    // Check for missing username or password
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required' })

    // Look for username
    const foundUser = await User.findOne({ username: username }).exec()
    if (!foundUser) return res.status(401).json({ 'message': 'User not found' }) // Unauthorized

    // Verify password
    try {
        const pswdMatch = await verify(foundUser.password, password)
        if (pswdMatch) {
            // Create access token
            const accessToken = sign(
                { 'username': foundUser.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: 300 }
            )
            // Create refresh token
            const refreshToken = sign(
                { 'username': foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '12h' }
            )

            // Save refresh token in user document
            const result = await User.updateOne({ username: foundUser.username }, { refreshToken: refreshToken })
            // Send access and refresh tokens to the client
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none', secure: true })
            res.status(201).json({ accessToken })
        } else
            res.sendStatus(401) // Unauthorized
    } catch (err) {
        res.status(500).json({ 'message': err.message }) // Unknown error
    }
})

// Refresh token route
app.get('/refresh', async (req, res) => {
    // Get the refresh token
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401) // Unauthorized
    const refreshToken = cookies.jwt

    // Find the user with the refresh token sent
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec()
    if (!foundUser) return res.sendStatus(403) // Forbidden

    // Verify token
    jwtVerify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        // Send forbidden message if token has been tampered with
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403)

        // Create new access token and send it
        const accessToken = sign(
            { 'username': decoded.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 300 }
        )
        res.json({ 'username': decoded.username, 'accessToken': accessToken })
    })
})

// All routes to be verified should go below this middleware
app.use(verifyJWT)

// User logout route
app.get('/logout', async (req, res) => {
    // Get the refresh token
    const cookies = req.cookies
    // If there is no token in cookies, then that's fine
    if (!cookies?.jwt) return res.sendStatus(204) // Successful
    const refreshToken = cookies.jwt

    // Find the user with the refresh token sent
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec()
    if (!foundUser) {
        // No user in database found with this cookie, but delete cookie anyway
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
        return res.sendStatus(204)
    }

    // Delete refresh token for logged out user in database
    const result = await User.updateOne({ username: foundUser.username }, { refreshToken: '' })

    // Delete cookie
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    res.sendStatus(204)
})

// Get user documents route
app.post('/docs', async (req, res) => {
    const { username } = req.body
    if (!username) return res.status(400).json({ 'message': 'Username required' })

    const docs = await Document.find({ creator: username }).exec()
    res.status(200).json({ 'manuscripts': docs })
})

// Handle socket connection for client-side document editor
io.on('connection', socket => {
    socket.on('get-document', async (documentId, name, creator) => {
        const doc = await findOrCreateDocument(documentId, name, creator)
        socket.join(documentId)
        socket.emit('load-document', doc.data)

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta)
        })

        socket.on('save-document', async data => {
            await Document.findByIdAndUpdate(documentId, { data })
        })
    })
})

mongoose.connection.once('open', () => {
    console.log('Connected to database')
    httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})