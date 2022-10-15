require('dotenv').config()
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const Log = require('./models/log')


const app = express()

// Start config
app.use(express.urlencoded({ extended: true }))
app.engine('jsx', require('jsx-view-engine').createEngine())
app.set('view engine', 'jsx')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log('connected to MongoDB Atlas')
})

// END Config

// NEW
app.get('/logs/new', (req,res) => {
    res.render('logs/New')
})

//CREATE
app.post('/logs', (req, res) => {
    req.body.shipIsBroken === 'on' ? req.body.shipIsBroken = true : req.body.shipIsBroken = false
    Log.create(req.body, (err, createdLog) => {
        if(err){
            console.error(err)
            res.status(400).send(err)
        } else {
            res.redirect(`/logs/${createdLog._id}`)
        }
    })
})


// Tell the app to listen on a port
app.listen(3000, () => {
    console.log('Listening on Port 3000')
})