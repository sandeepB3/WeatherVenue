const helpers = require('../helpers')
const express = require('express')
const routerUI = express.Router()

let pass = ''
if (process.env.NODE_ENV === 'dev') {
  pass = process.env.PASS
}

const { mappings0, mappings, messages } = helpers

const defaults = {
  scripts: mappings0,
  dependencies: mappings,
  messages,
  pass
}

routerUI.get('/', function rootHandler (req, res) {
  res.render('index', {
    key: process.env.GOOGLE_MAPS_API_KEY,
    lang: 'en',
    ...defaults
  })
})

routerUI.get('/ar', function rootHandler (req, res) {
  res.render('index_ar', {
    key: process.env.GOOGLE_MAPS_API_KEY,
    lang: 'ar',
    ...defaults
  })
})

routerUI.get('/fr', function rootHandler (req, res) {
  res.render('index_fr', {
    key: process.env.GOOGLE_MAPS_API_KEY,
    lang: 'fr',
    ...defaults
  })
})

routerUI.get('/weather_map_view', function rootHandler(req, res) {
  res.render('weather_map_view', {
    key: process.env.GOOGLE_MAPS_API_KEY,
    scripts: mappings0,
    dependencies: mappings,
    pass
  })
})

module.exports = routerUI