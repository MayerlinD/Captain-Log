require('dotenv').config()
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
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

// START middleware

app.use(methodOverride('_method'))

// END middleware

// INDEX
app.get('/logs', (req, res) => {
    Log.find({}, (err, foundLogs) => {
      if(err){
        console.error(err)
        res.status(400).send(err)
      } else {
        res.render('logs/Index', {
          logs: foundLogs
        })
      }
    })
  })

// NEW
app.get('/logs/new', (req,res) => {
    res.render('logs/New')
})

// DELETE
app.delete('/logs/:id', (req, res) => {
    Log.findByIdAndDelete(req.params.id, (err, deletedLog) => {
      if(err){
        console.error(err)
        res.status(400).send(err)
      } else {
        res.redirect('/logs')
      }
    })
  })


// UPDATE
app.put('/logs/:id', (req, res) => {
    req.body.shipIsBroken === 'on' || req.body.shipIsBroken === true ? req.body.shipIsBroken = true : req.body.shipIsBroken = false
    Log.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedLog) => {
      if(err){
        console.error(err)
        res.status(400).send(err)
      } else {
        res.redirect(`/logs/${updatedLog._id}`)
      }
    })
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

// EDIT 
app.get('/logs/:id/edit', (req, res) => {
    Log.findById(req.params.id, (err, foundLog) => {
      if(err){
       console.error(err)
       res.status(400).send(err)
      } else {
       res.render('logs/Edit', {
         log: foundLog
       })
      }
    })
   })

// SHOW
app.get('/logs/:id', (req, res) => {
    Log.findById(req.params.id, (err, foundLog) => {
      if(err){
       console.error(err)
       res.status(400).send(err)
      } else {
       res.render('logs/Show', {
           log: foundLog
       })
      }
    })
   })


// Tell the app to listen on a port
app.listen(3000, () => {
    console.log('Listening on Port 3000')
})