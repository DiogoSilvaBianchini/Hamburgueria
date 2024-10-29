const mongoose = require("mongoose")
const {DB_MONGO_NAME, DB_MONGO_PASSWORD, DB_MONGO_PORT, DB_MONGO_USER_NAME, NODE_ENV, DB_HOST} = process.env

const host = NODE_ENV == "development" ? "0.0.0.0" : DB_HOST

mongoose.connect(`mongodb://${DB_MONGO_USER_NAME}:${DB_MONGO_PASSWORD}@${host}:${DB_MONGO_PORT}/${DB_MONGO_NAME}?authSource=admin`, {
    serverSelectionTimeoutMS: 30000, 
    socketTimeoutMS: 45000,
})

mongoose.connection.on("error", (error) => console.log(`Mongo error: ${error}`))
mongoose.connection.once("open", () => console.log("MongoDB Online"))

module.exports = mongoose