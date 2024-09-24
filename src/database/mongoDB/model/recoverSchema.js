const {Schema, model} = require("mongoose")

const recoverSchema = new Schema({
    userId: {
        type: String,
        required: [true, "Id do usuário pendente."]
    },
    recoveryPass: {
        type: String,
        required: [true, "Recovery pass pendente."]
    },
    status: {
        type: Boolean,
        default: true
    },
    attempts: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: {expires: '5m'}
    }
})

const recoverModel = model("RecoveryPass", recoverSchema)

module.exports = recoverModel