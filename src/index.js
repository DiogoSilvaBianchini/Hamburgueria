require("dotenv")
const express = require("express")
const http = require("http")
const {Server} = require("socket.io")


const app = express()
const server = http.createServer(app)
const io = new Server(server)
const PORT = process.env.PORT || 8085


io.on("connection", (socket) => {
    socket.emit("orders", () => {

    })
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))