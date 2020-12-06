const mongoose = require('mongoose')

const dailySchema = new mongoose.Schema({
    newCases: {
        type: Number
    },
    casesSoFar: {
        type: Number
    },
    date: {
        type: Object,
        unique: true
    },
    active: {
        type: Object
    }, 
    seriousCases: {
        type: Object
    },
    ventilated:{
        type: Number
    },
    ventilatedSoFar:{
        type: Number
    },
    deceased: {
        type: Number
    },
    deceasedSoFar: {
        type: Number
    },
    tests: {
        type: Object
    },
    healed: {
        type: Number
    },
    healedSoFar: {
        type: Number
    },
    citiesData:{
        type: Object
    },
    agesData: {
        type: Object
    },
    hospitalsData: {
        type: Object
    },
}, {
    timestamps: true
})

const DailyStats = mongoose.model('dailyStats', dailySchema)

module.exports = DailyStats;