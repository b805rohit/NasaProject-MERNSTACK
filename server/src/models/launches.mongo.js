const mongoose = require('mongoose')

const launchesSchema=new mongoose.Schema({
    flightNumber:{
        type: Number,
        required: true,
    },
    mission:{
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    target:{
        type: String,
    },
    customers:[String],
    upcoming:{
        required: true,
        type: Boolean,
    },
    success:{
        type: Boolean,
        default:true
    }
})

module.exports = mongoose.model('Launch',launchesSchema)