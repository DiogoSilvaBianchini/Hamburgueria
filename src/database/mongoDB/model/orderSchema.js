const {Schema, model} = require("mongoose")

const orderSchema = new Schema({
    user: {
        type: String,
        required: [true, "Nome de usuario inválido."]
    },
    products: {
        type: Array,
        required: [true, "Lista de produtos inválida."]
    },
    totalPrice: {
        type: String,
        require: [true, "Preço total inválido."]
    },
    payment: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: {expires: "43830h"}
    }
})

const orderModel = model("order", orderSchema)

module.exports = orderModel
