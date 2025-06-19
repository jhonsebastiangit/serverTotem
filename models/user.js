const { Schema, model } = require("mongoose");

const esquema = Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    preFix: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    discount: {
        type: String,
    },
    resume: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model("User", esquema, "users");