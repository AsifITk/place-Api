const mongoose = require('mongoose');



const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true


    },
    slug: {
        type: String,
        required: true

    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true



    },

}, { timestamps: true });

const placeModel = mongoose.model('Place', Schema);

module.exports = placeModel;

