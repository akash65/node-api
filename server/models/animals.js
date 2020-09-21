const mongoose = require('mongoose')

//creating model using monggose
const AnimalDetails = mongoose.model('Animal', {

    name: { type: String, required: true, minLength: 1, trim: true },
    type: { type: String, required: true, minLength: 1, trim: true },
    gender: { type: String },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null }

})

module.exports = { AnimalDetails }