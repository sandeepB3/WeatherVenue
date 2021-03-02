const fs = require('fs')
const zlib = require('zlib')
const axios = require('axios')
const path = require('path')
const rawdata = zlib.gunzipSync(fs.readFileSync(path.join(__dirname, '/../data/city.list.min.json.gz'))).toString()
const citiesIds = JSON.parse(rawdata)
// get data from openweathermap API
const { setupCache } = require('axios-cache-adapter')
const cache = setupCache({
  maxAge: 24 * 60 * 3
})
const api = axios.create({
  adapter: cache.adapter
})
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY

function getCityId (coord) {
  // return undefined;
  const toPrecision = x => Number.parseFloat(x).toPrecision(3)
  coord.lon = toPrecision(coord.lon)
  coord.lat = toPrecision(coord.lat)
  const onecity = citiesIds.filter((item) => {
    const lon = toPrecision(item.coord.lon)
    const lat = toPrecision(item.coord.lat)
    return lon === coord.lon && lat === coord.lat
  })[0]
  if (onecity) {
    return onecity.id
  } else {
    console.log("getCityId called: \n city not found :(")
    return undefined
  }
}

async function fetchWeather0 (westLng, northLat, eastLng, southLat, mapZoom) {
  return new Promise(async (resolve, reject) => {
    const openWeatherMapAPI = `https://api.openweathermap.org/data/2.5/box/city?bbox=${westLng},${northLat},${eastLng},${southLat},${mapZoom}&cluster=yes&format=json&APPID=${OPENWEATHERMAP_API_KEY}`
    const body0 = await api({ url: openWeatherMapAPI, method: 'get' })
    resolve(body0)
  })
}

async function fetchWeather (city, language) {
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

exports.getCityId = getCityId
exports.fetchWeather = fetchWeather
exports.fetchWeather0 = fetchWeather0
exports.formatCities = formatCities
