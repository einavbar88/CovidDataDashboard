const mongoose = require('mongoose')

const hospitalsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    maxCapacity: {
        type: Number
    },
    staffCurfew: {
        type: Object
    }, 
    patients: {
        type: Number
    },
}, {
    timestamps: true
})

const Hospitals = mongoose.model('Hospitals', hospitalsSchema)

module.exports = Hospitals;