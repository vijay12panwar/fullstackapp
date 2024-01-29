const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    propertyName: {
        type: String,
        required: true
    },
    propertyType:{
        type: String,
        required: true
    },
    rentPerMonth: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    numberOfBedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
