const express = require('express')
const Stats = require('../models/covidModel')
const DailyStats = require('../models/dailyUpdateModel')
const HospitalStats = require('../models/hospitalsModel')

const router = new express.Router()

router.post('/new/person', async (req, res) => {
    const person = new Stats(req.body)
    try {
        await person.save()
        res.send(person)
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message
        })
    }
})

router.post('/daily/new', async (req, res) => {
    const doc = new DailyStats(req.body)
    try {
        await doc.save()
        res.send(doc)
    } catch (err) {
        console.log(err)
        res.status(400).send({
            status: 400,
            message: err.message
        })
    }
})

router.get('/daily/get', async (req, res) => {
    try {
        const data = await DailyStats.find({})
        if (!data)
            return res.status(404).send({
                status: 404
            })
        res.send(data)
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message
        })
    }
})

router.post('/hospitals/new', async (req, res) => {
    const hospital = new HospitalStats(req.body)
    try {
        await hospital.save()
        res.send(hospital)
    } catch (err) {
        console.log(err)
        res.status(400).send({
            status: 400,
            message: err.message
        })
    }
})

router.patch('/hospitals/edit', async (req, res) => {
    try {
        const update = await HospitalStats.findOneAndUpdate({}, req.body, {new: true, upsert: true})
        return res.send(update)
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message
        })
    }
})

router.get('/get', async (req, res) => {
    try {
        const data = await Stats.find({})
        if (!data)
            return res.status(404).send({
                status: 404
            })
        res.send(data)
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message
        })
    }
})

router.get('/search', async (req, res) => {
    const personID = req.query.id
    try {
        const person = await Stats.find({"personID": personID})
        if (!person || person[0] == undefined)
            return res.status(404).send({
                status: 404,
                message: "No such person!"
            })
        res.send(person)
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message
        })
    }
})

router.patch('/edit', async (req, res) => {
    const personID =  req.query.id;
    try {
        const update = await Stats.findOneAndUpdate({"personID": personID}, req.body, {new: true, upsert: true})
        return res.send(update)
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message
        })
    }
})

router.delete('/delete', async (req, res) => {
    const personID = req.query.id
    try {
        const deletePerson = await Stats.findOneAndDelete({"personID": personID})
        if (!deletePerson)
            return res.status(404).send({
                status: 404,
                message: "Wrong id"
            })
            res.send(deletePerson)
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message
        })
    }
})

module.exports = router