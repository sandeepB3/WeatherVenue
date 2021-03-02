const express = require('express')
const Joi = require('joi')
const axios = require('axios')
const redis = require('redis')
const nearbyCities = require('nearby-cities')

const router = express.Router()
const redisPort = process.env.REDIS_PORT
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY
// make a connection to the local instance of redis
const client = (process.env.NODE_ENV === 'dev') ? redis.createClient(redisPort) : redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true })
client.on('error', (error) => {
  console.error(error)
})

let pass = ''
if (process.env.NODE_ENV === 'dev') {
  pass = process.env.PASS
}
router.get(`/${pass}`, function rootHandler (req, res) {
  res.render('index', { key: process.env.GOOGLE_MAPS_API_KEY })
})

router.get('/ar', function rootHandler (req, res) {
  res.render('index_ar', { key: process.env.GOOGLE_MAPS_API_KEY })
})

router.get('/weather_map_view', function rootHandler (req, res) {
  res.render('weather_map_view', { key: process.env.GOOGLE_MAPS_API_KEY })
})

router.get('/weatherMap/:url', function rootHandler (req, res) {
  if (!req.params.url) {
    return res.status(400).send({
      error: true,
      message: 'Bad request',
      data: 'Bad request'
    })
  }
  const urlParams = JSON.parse(req.params.url)
  let westLng, northLat, eastLng, southLat, mapZoom
  ({ westLng, northLat, eastLng, southLat, mapZoom } = urlParams)
  const openWeatherMapAPI = `https://api.openweathermap.org/data/2.5/box/city?bbox=${westLng},${northLat},${eastLng},${southLat},${mapZoom}&cluster=yes&format=json&APPID=${OPENWEATHERMAP_API_KEY}`
  axios.get(openWeatherMapAPI).then(function (response) {
    // handle success
    return res.status(200).send({
      error: false,
      message: `Weather data for weather map`,
      data: response.data
    })
  }).catch(function (error) {
    console.log(error)
    return res.status(400).send({
      error: true,
      message: 'Bad request',
      data: 'Bad request'
    })
  })
})

const helpers = require('./helpers')

let language = 'en'
const reqSchema = Joi.object({
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required(),
  cityname: Joi.string().min(3).max(180).required(),
  language: Joi.string().min(2).max(2).required()
})

router.get('/nearby/:city', function rootHandler (req, res) {
  try {
    if (!req.params.city) {
      return res.status(400).send({
        error: true,
        message: 'Bad request',
        data: 'Bad request'
      })
    }

    const geometry = JSON.parse(req.params.city)
    const valid = reqSchema.validate(geometry)
    if (valid.error) {
      return res.status(400).send({
        error: true,
        message: 'Bad request',
        data: 'Bad request error ' + valid.error
      })
    }
    const cityname = geometry.cityname
    language = geometry.language

    // Check the redis store for the data first
    client.get(cityname, async (err, result) => {
      // redis unexpected errors
      if (err) {
        console.error(err)
        return res.status(500).send({
          error: true,
          message: 'Server error',
          data: 'Server error'
        })
      }
      if (result) {
        return res.status(200).send({
          error: false,
          message: `Weather data for nearby cities for ${cityname} from the cache`,
          data: JSON.parse(result)
        })
      }
      const query = {
        latitude: geometry.lat,
        longitude: geometry.lng
      }
      const cities = nearbyCities(query).slice(0, 10)
      const actions = cities.map(x => { return helpers.fetchWeather(x, language) })
      Promise.all(actions).then(function (forecasts) {
        var weathers = forecasts.map(elem => { return elem.weather })
        var pollutions = forecasts.map(elem => { return elem.pollution })
        const result = helpers.formatCities(cities, weathers, pollutions)
        client.setex(cityname, 24 * 60 * 3, JSON.stringify(result))
        return res.status(200).send({
          error: false,
          message: 'Weather data for nearby cities from the server',
          data: result
        })
      })
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router