const express = require('express')
const cors = require('cors')
const path = require('path')

const port = process.env.PORT
require('./db/mogoose')
const covidRouter = require('./routers/covidRouter')
const publicDirectoryPath = path.join(__dirname, '../public')

const app = express()

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(cors())
app.use(covidRouter)


app.listen(port, ()=> {
    console.log('Server connected, port:', port)
})