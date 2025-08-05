// invocar BD mongoose 
const mongoose = require("mongoose");

// Desestrutura o Schema do mongoose
const { Schema } = mongoose;

// Esqueleto do schema com name, description, price, image
const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Service = mongoose.model("Service", ServiceSchema);

module.exports = {
    Service,
    ServiceSchema,
};
