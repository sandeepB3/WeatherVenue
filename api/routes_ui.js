const express = require('express')
const routerUI = express.Router()
const path = require('path')

const fs = require('fs')
let rawdata0 = fs.readFileSync(path.join(__dirname, '../public/js/rev-manifest.json'))
let mappings0 = (JSON.parse(rawdata0))
let rawdata = fs.readFileSync(path.join(__dirname, '../public/js/libraries/rev-manifest.json'))
let mappings = (JSON.parse(rawdata))
let pass = ''
if (process.env.NODE_ENV === 'dev') {
  pass = process.env.PASS
}

routerUI.get('/', function rootHandler (req, res) {
  res.render('index', { key: process.env.GOOGLE_MAPS_API_KEY, pass: pass, scripts: mappings0, dependencies: mappings })
})

routerUI.get('/ar', function rootHandler (req, res) {
  res.render('index_ar', { key: process.env.GOOGLE_MAPS_API_KEY, pass: pass, scripts: mappings0, dependencies: mappings })
})

routerUI.get('/fr', function rootHandler (req, res) {
  res.render('index_fr', { key: process.env.GOOGLE_MAPS_API_KEY, pass: pass, scripts: mappings0, dependencies: mappings })
})

routerUI.get('/weather_map_view', function rootHandler (req, res) {
  res.render('weather_map_view', { key: process.env.GOOGLE_MAPS_API_KEY, pass: pass, scripts: mappings0, dependencies: mappings })
})

module.exports = routerUI