//adoption.js

const express = require('express')
const path = require('path')
let router = express.Router()
let databaseRef = require('../config/database')

router.get('/api/adoption', (req, res) => {
    let animals = databaseRef.getAnimalsList()
    res.json(animals)
})

// router.post('/api/adoption', (err, req, res) => {
//
// })

module.exports = router