/* eslint-disable no-unused-vars */

// js_variables ==> GMap
// _myStorage, _styles, _autocompleteOptions
// _styleItDark(), _styleItWhite(), _showLoading(), _hideLoading(),
// _setWithExpiry(), _getWithExpiry(), _fireAccessFunctions(), _generateDummyCards()

function __id (id) { return document.getElementById(id) }
function __class (classs) { return document.getElementsByClassName(classs) }

const _myStorage = window.localStorage

// less styling, setting business positions off and transit off
const _styles = {
  default: [],
  hide: [
    {
      featureType: 'poi.business',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ],
  night: [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'poi.business',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }]
    }
  ]
}
// Copyright of PimpTrizkit taken from https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
// Version 4.0
const pSBC = (p, c0, c1, l) => {
  let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof (c1) == 'string'
  if (typeof (p) != 'number' || p < -1 || p > 1 || typeof (c0) != 'string' || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null
  if (!this.pSBCr) this.pSBCr = (d) => {
    let n = d.length, x = {}
    if (n > 9) {
      [r, g, b, a] = d = d.split(','), n = d.length
      if (n < 3 || n > 4) return null
      x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
    } else {
      if (n == 8 || n == 6 || n < 4) return null
      if (n < 6) d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '')
      d = i(d.slice(1), 16)
      if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000
      else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
    } return x
  }
  h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == 'c' ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != 'c' ? this.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p
  if (!f || !t) return null
  if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b)
  else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5)
  a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0
  if (h) return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')'
  else return '#' + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
}
var cardsColors

function _styleItDark () {
  document.documentElement.style.backgroundColor = '#111'
  map.setOptions({ styles: _styles.night })
  __id('copyright_google').src = './copyright/powered_by_google_on_non_white_hdpi.png'
  if (!cardsColors) {
    cardsColors = Array.from(__class('card')).map(card => { return card.style.backgroundColor })
    cardsColors = [...cardsColors]
  }

  Array.from(__class('card')).forEach(card => {
    card.style.backgroundColor = pSBC(-0.2, card.style.backgroundColor)
  })

  __id('logo').src = './img/weather_venue_856-8_on_black.png'
}

function _styleItWhite () {
  document.documentElement.style.backgroundColor = '#eee'
  map.setOptions({ styles: _styles.hide })
  __id('copyright_google').src = './copyright/powered_by_google_on_white_hdpi.png'
  if (cardsColors) {
    Array.from(__class('card')).forEach(function (card, idx) {
      card.style.backgroundColor = cardsColors[idx]
    })
  }
  __id('logo').src = './img/weather_venue_856-8.png'
}

function _showLoading () {
  __id('spinner-back').classList.add('show')
  __id('spinner-front').classList.add('show')
}

function _hideLoading () {
  __id('spinner-back').classList.remove('show')
  __id('spinner-front').classList.remove('show')
}

function _setWithExpiry (key, value) {
  const now = new Date()
  const day = { day: now.getDay(), month: now.getMonth(), year: now.getFullYear() }

  // `item` is an object which contains the original value
  // as well as today's date
  const item = {
    value: value,
    expiry: day
  }
  _myStorage.setItem(key, JSON.stringify(item))
}

function _getWithExpiry (key) {
  const itemStr = _myStorage.getItem(key)
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  const now = new Date()

  // compare the expiry time of the item with the current time
  if (now.getDay() !== item.expiry.day || now.getMonth() !== item.expiry.month || now.getFullYear() !== item.expiry.year) {
    // If the item generated today, delete the item from storage
    // and return null
    _myStorage.removeItem(key)
    return null
  }
  return item.value
}

const _autocompleteOptions = {
  types: ['(cities)']
  // componentRestrictions: {country: "us"}
}

function _generateDummyCards () {
  const weekdayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const dummyDailies = JSON.parse('[{\"dt\":1613390400,\"sunrise\":1613372331,\"sunset\":1613409052,\"temp\":{\"day\":3,\"min\":-1.78,\"max\":4.03,\"night\":1.7,\"eve\":2.11,\"morn\":-1.78},\"feels_like\":{\"day\":-3.81,\"night\":-5.13,\"eve\":-4.54,\"morn\":-8.32},\"pressure\":1024,\"humidity\":66,\"dew_point\":-9.78,\"wind_speed\":6.37,\"wind_deg\":110,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"clouds\":6,\"pop\":0,\"uvi\":2},{\"dt\":1613304000,\"sunrise\":1613286034,\"sunset\":1613322553,\"temp\":{\"day\":1.9,\"min\":-2.92,\"max\":2.79,\"night\":-0.83,\"eve\":0.18,\"morn\":-2.63},\"feels_like\":{\"day\":-6.01,\"night\":-7.09,\"eve\":-6.16,\"morn\":-10.66},\"pressure\":1028,\"humidity\":63,\"dew_point\":-14.74,\"wind_speed\":7.67,\"wind_deg\":96,\"weather\":[{\"id\":804,\"main\":\"Clouds\",\"description\":\"overcast clouds\",\"icon\":\"04d\"}],\"clouds\":100,\"pop\":0,\"uvi\":2},{\"dt\":1613217600,\"sunrise\":1613199737,\"sunset\":1613236054,\"temp\":{\"day\":-0.03,\"min\":-3.34,\"max\":0.35,\"night\":-3.11,\"eve\":-2.1,\"morn\":-3.34},\"feels_like\":{\"day\":-7.28,\"night\":-10.75,\"eve\":-9.83,\"morn\":-10.38},\"pressure\":1032,\"humidity\":73,\"dew_point\":-14.61,\"wind_speed\":6.74,\"wind_deg\":91,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"clouds\":0,\"pop\":0,\"uvi\":2},{\"dt\":1613131200,\"sunrise\":1613113437,\"sunset\":1613149554,\"temp\":{\"day\":1.03,\"min\":-2.08,\"max\":1.03,\"night\":-1.78,\"eve\":-0.68,\"morn\":-2.08},\"feels_like\":{\"day\":-6.05,\"night\":-8.36,\"eve\":-7.1,\"morn\":-8.99},\"pressure\":1027,\"humidity\":69,\"dew_point\":-13.94,\"wind_speed\":6.54,\"wind_deg\":87,\"weather\":[{\"id\":803,\"main\":\"Clouds\",\"description\":\"broken clouds\",\"icon\":\"04d\"}],\"clouds\":81,\"pop\":0,\"uvi\":1.14},{\"dt\":1613044800,\"sunrise\":1613027137,\"sunset\":1613063054,\"temp\":{\"day\":-0.05,\"min\":-3.07,\"max\":0.68,\"night\":-1.31,\"eve\":-0.84,\"morn\":-3.07},\"feels_like\":{\"day\":-5.91,\"night\":-8.18,\"eve\":-6.92,\"morn\":-8.31},\"pressure\":1028,\"humidity\":80,\"dew_point\":-10.83,\"wind_speed\":4.95,\"wind_deg\":88,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"clouds\":10,\"pop\":0,\"uvi\":1.5},{\"dt\":1612958400,\"sunrise\":1612940834,\"sunset\":1612976555,\"temp\":{\"day\":-1.18,\"min\":-4.66,\"max\":0.01,\"night\":-2.45,\"eve\":-1.62,\"morn\":-4.34},\"feels_like\":{\"day\":-8.06,\"night\":-7.01,\"eve\":-6.79,\"morn\":-10.94},\"pressure\":1012,\"humidity\":78,\"dew_point\":-12.58,\"wind_speed\":6.17,\"wind_deg\":27,\"weather\":[{\"id\":600,\"main\":\"Snow\",\"description\":\"light snow\",\"icon\":\"13d\"}],\"clouds\":53,\"pop\":0.52,\"snow\":0.15,\"uvi\":1.33},{\"dt\":1612872000,\"sunrise\":1612854531,\"sunset\":1612890055,\"temp\":{\"day\":-1.67,\"min\":-3.98,\"max\":-0.91,\"night\":-2.78,\"eve\":-2.22,\"morn\":-3.84},\"feels_like\":{\"day\":-5.7,\"night\":-8.87,\"eve\":-7.43,\"morn\":-8.63},\"pressure\":1003,\"humidity\":85,\"dew_point\":-9.49,\"wind_speed\":2.21,\"wind_deg\":40,\"weather\":[{\"id\":804,\"main\":\"Clouds\",\"description\":\"overcast clouds\",\"icon\":\"04d\"}],\"clouds\":93,\"pop\":0.12,\"uvi\":1.33},{\"dt\":1612785600,\"sunrise\":1612768225,\"sunset\":1612803555,\"temp\":{\"day\":1.45,\"min\":-1.19,\"max\":1.59,\"night\":-0.53,\"eve\":0.76,\"morn\":-1.13},\"feels_like\":{\"day\":-1.77,\"night\":-4.84,\"eve\":-3.37,\"morn\":-4.58},\"pressure\":998,\"humidity\":81,\"dew_point\":-5.67,\"wind_speed\":1.47,\"wind_deg\":4,\"weather\":[{\"id\":804,\"main\":\"Clouds\",\"description\":\"overcast clouds\",\"icon\":\"04d\"}],\"clouds\":88,\"pop\":0.14,\"uvi\":1.29}]')
  __id('forecast-items').innerHTML = ''
  document.body.style.backgroundImage = `url(http://openweathermap.org/img/wn/${dummyDailies[dummyDailies.length - 1].weather[0].icon || 'na'}.png), linear-gradient(to bottom, #82addb 0%,#ebb2b1 100%)`
  document.documentElement.style.backgroundImage = `url(http://openweathermap.org/img/wn/${dummyDailies[dummyDailies.length - 1].weather[0].icon || 'na'}.png), linear-gradient(rgb(235, 178, 177) 0%, rgb(130, 173, 219) 100%)`
  const maxTemp = Math.max(...dummyDailies.map((item) => { return item.temp.max }))
  dummyDailies.forEach(function (period) {
    const d = new Date(0)
    d.setUTCSeconds(period.dt)
    const ISODate = d.toISOString().slice(0, 10)
    const dayName = weekdayNames[d.getDay()] // new Date(period.dateTimeISO).getDay()
    const iconSrc = `http://openweathermap.org/img/wn/${period.weather[0].icon || 'na'}@4x.png`
    const maxTempF = period.temp.max || 'N/A'
    const minTempF = period.temp.min || 'N/A'
    const weather = period.weather[0].description || 'N/A'
    const hue = (1.0 - (maxTempF / maxTemp)) * 240
    let hueColor = `hsl( ${hue} , 90%, 80%)`

    hueColor = '; background-color: ' + hueColor
    const template = (`
            <div class="col-md-3">
              <div class="card" style="width: 100%${hueColor}">
                  <div class="card-body">
                      <h4 class="card-title text-center">${dayName}</h4>
                      <h5 class="card-title text-center">${ISODate}</h5>
                      <p><img class="card-img mx-auto d-block" style="max-width: 100px;" src="${iconSrc}"></p>
                      <h6 class="card-title text-center">${weather}</h6>
                      <p class="card-text text-center">High: ${maxTempF} <br />Low: ${minTempF}</p>
                  </div>
              </div>
            </div>
        `)
    __id('forecast-items').insertAdjacentHTML('afterbegin', template)
  })
}

// Comparision
function allowDrop(ev) {
  ev.preventDefault()
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id)
}

function drop(ev) {
  ev.preventDefault()
  var data = ev.dataTransfer.getData('text')
  let toBe = __id(data).cloneNode(true)
  const title = `<h3>${ data.split('-').slice(1,-1).map(a => {return a.charAt(0).toUpperCase() + a.slice(1) }).join('-') }</h3>`
  toBe.setAttribute('id', data + '_clone')
  toBe.setAttribute('draggable', false)
  toBe.childNodes[1].firstElementChild.setAttribute('href', '')
  toBe.insertAdjacentHTML('afterbegin', title)
  ev.target.appendChild(toBe)
}

function emptyIt() {
  const elements = document.querySelectorAll('[id*="_clone"]')
  Array.prototype.forEach.call(elements, function(node) {
    node.parentNode.removeChild(node)
  })
}