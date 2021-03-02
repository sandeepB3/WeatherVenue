const express = require('express')
const routerUI = express.Router()

let pass = ''
if (process.env.NODE_ENV === 'dev') {
  pass = process.env.PASS
}

routerUI.get('/', function rootHandler (req, res) {
  res.render('index', { key: process.env.GOOGLE_MAPS_API_KEY, pass: pass })
})

routerUI.get('/ar', function rootHandler (req, res) {
  res.render('index_ar', { key: process.env.GOOGLE_MAPS_API_KEY, pass: pass })
})

routerUI.get('/weather_map_view', function rootHandler (req, res) {
  res.render('weather_map_view', { key: process.env.GOOGLE_MAPS_API_KEY, pass: pass })
})

module.exports = routerUI