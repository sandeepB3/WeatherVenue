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

// get data from openweathermap API
const { setupCache } = require('axios-cache-adapter')
const cache = setupCache({
  maxAge: 24 * 60 * 3
})
const api = axios.create({
  adapter: cache.adapter
})

router.get('/', function rootHandler (req, res) {
  res.render('index')
})

router.get('/ar', function rootHandler (req, res) {
  res.render('index_ar')
})

router.get('/weather_map_view', function rootHandler (req, res) {
  res.render('weather_map_view')
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

let language = 'en'
async function fetchWeather (city) {
  return new Promise(async (resolve, reject) => {
    const APIUrlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&lang=${language}&exclude=hourly,minutely,hourly&units=metric&appid=${OPENWEATHERMAP_API_KEY}`
    const body0 = await api({ url: APIUrlWeather, method: 'get' })
    const data0 = await body0.data
    const APIUrlPollution = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${city.lat}&lon=${city.lon}&appid=${OPENWEATHERMAP_API_KEY}`
    const body1 = await api({ url: APIUrlPollution, method: 'get' })
    const data1 = await body1.data
    resolve({ weather: data0, pollution: data1 })
  })
}

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
      } else {
        const query = {
          latitude: geometry.lat,
          longitude: geometry.lng
        }
        const cities = nearbyCities(query).slice(0, 10)
        const actions = cities.map(fetchWeather)
        Promise.all(actions).then(function (forecasts) {
          var weathers = forecasts.map(elem => { return elem.weather })
          var pollutions = forecasts.map(elem => { return elem.pollution })
          const result = formatCities(cities, weathers, pollutions)
          client.setex(cityname, 24 * 60 * 3, JSON.stringify(result))
          return res.status(200).send({
            error: false,
            message: 'Weather data for nearby cities from the server',
            data: result
          })
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
})

function formatCities (cities, weathers, pollutions) {
  const newVar = {
    type: 'FeatureCollection',
    features: [],
    weather: [],
    pollution: []
  }
  cities.forEach(function (city, index) {
    // console.log(city)
    const feature = {
      cityid: undefined, // getCityId({ lon: city["lon"], lat: city["lat"] })
      geometry: {
        type: 'Point',
        coordinates: [city.lon, city.lat]
      },
      type: 'Feature',
      properties: {
        category: 'Town',
        hours: '--',
        description: '--',
        name: city.name,
        phone: '--',
        place_id: '011101101'
      }
    }
    newVar.features.push(feature)
    weathers[index].cityName = city.name
    pollutions[index].cityName = city.name
  })

  newVar.weather = weathers
  newVar.pollution = pollutions
  return newVar
}

module.exports = router