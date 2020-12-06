const mongoose = require('mongoose')

const covidSchema = new mongoose.Schema({
    name: {
        type: String
    },
    personID: {
        type: Number,
        unique: true
    },
    age: {
        type: Number
    }, 
    city: {
        type: String
    },
    gender:{
        type: String
    },
    testDate: {
        type: Object
    },
    condition: {
        type: Object
    },
    healed: {
        type: Boolean
    },
    healedDate:{
        type: Object
    },
    deceased: {
        type: Boolean
    },
    ventilated: {
        type: Boolean
    },
    hospital: {
        type: String
    },
}, {
    timestamps: true
})

const Stats = mongoose.model('Stats', covidSchema)

module.exports = Stats;