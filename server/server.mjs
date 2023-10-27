import express from 'express'
import path from 'path'
import cors from 'cors'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const app = express()
const PORT = process.env.PORT || 3000 // If port is changed, change proxy in client package.json

app.use(express.static(path.join(__dirname, "..", "client", "dist")))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// Default page served should be the Dashboard, but only if there is a valid session active
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"))
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))