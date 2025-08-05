// invoca o mongoose 

const mongoose = require("mongoose")


// Desestrutua a SCHEMA do mongoose 

const { Schema } = mongoose;

// invoca o serviceSchema 

const { ServiceSchema }= require("./Service")


// cria o esqueleto da schema (title - author - description - budget- image - service )



//    guests: req.body.guests,
//                 location: req.body.location,
//                 data: req.body.data,
//                 hours: req.body.hours,

const PartySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

      guests: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
   eventDate: {
    type: Date,
    require: true,
   },
    budget: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

    services: {
        type: [ServiceSchema],
    },
    
}, {timestamps: true }

);

// Cria o meodel 

const Party = mongoose.model("Party", PartySchema);

// exporta a Party
module.exports = Party;