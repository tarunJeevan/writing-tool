import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export default function verifyJWT(req, res, next) {
    const authHeader = req.headers['authorization']

    if (!authHeader) return res.sendStatus(401)

    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403) // Invalid token
        req.username = decoded.username
        next()
    })
}