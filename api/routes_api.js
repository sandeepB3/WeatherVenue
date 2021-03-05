const express = require('express')
const Joi = require('joi')
const axios = require('axios')
const redis = require('redis')
const nearbyCities = require('nearby-cities')

const routerAPI = express.Router()
const redisPort = process.env.REDIS_PORT
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY
// make a connection to the local instance of redis
const client = (process.env.NODE_ENV === 'dev') ? redis.createClient(redisPort) : redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true })
client.on('error', (error) => {
  console.error(error)
})

routerAPI.get('/weatherMap/:url', function rootHandler (req, res) {
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
  const action = helpers.fetchWeather0(westLng, northLat, eastLng, southLat, mapZoom)
  Promise.resolve(action).then(function (response) {
    return res.status(200).send({
      error: false,
      message: 'Weather data for weather map',
      data: response.data
    })
  })
  // .catch(function (error) {
  //   console.log(error)
  //   return res.status(400).send({
  //     error: true,
  //     message: 'Bad request',
  //     data: 'Bad request'
  //   })
  // })
})

const helpers = require('./helpers')

let language = 'en'
const reqSchema = Joi.object({
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required(),
  cityname: Joi.string().min(3).max(180).required(),
  language: Joi.string().min(2).max(2).required()
})

routerAPI.get('/nearby/:city', function rootHandler (req, res) {
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

// Import dependencies
const fs = require('fs')
const { google } = require('googleapis')

const service = google.sheets('v4')
const credentials = require('../creds/google-credentials.json')

// Configure auth client
const authClient = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
);

routerAPI.get('/answers', async function rootHandler (req, res) {
  try {
    // Authorize the client
    const token = await authClient.authorize()
    // Set the client credentials
    authClient.setCredentials(token)
    // Get the rows
    const res = await service.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId: '1ikPH-WrhC3ogEsHMygYhdkka8cNhRmYVPOkOYYyoQc4',
      range: 'A:D'
    })
    // All of the answers
    const answers = []
    // Set rows to equal the rows
    const rows = res.data.values
    // Check if we have any data and if we do add it to our answers array
    if (rows.length) {
      // Remove the headers
      rows.shift()
      // For each row
      for (const row of rows) {
        answers.push({
          timeStamp: row[0],
          answer: row[1],
          name: row[2],
          email: row[3]
        })
      }
    } else {
      console.log('No data found.')
    }
    // Saved the answers
    fs.writeFileSync('answers.json', JSON.stringify(answers), function (err, file) {
      if (err) throw err
      console.log('Saved!')
    })
  } catch (error) {
    // Log the error
    console.log(error)
  }
  return res.status(200).send()
})

module.exports = routerAPI