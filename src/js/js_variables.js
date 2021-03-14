/* eslint-disable no-unused-vars */

// js_variables ==> GMap
// _myStorage, _styles, _autocompleteOptions
// _styleItDark(), _styleItWhite(), _showLoading(), _hideLoading(),
// _setWithExpiry(), _getWithExpiry(), _fireAccessFunctions(), _generateDummyCards()

function __id (id) { return document.getElementById(id) }
function __class (classs) { return document.getElementsByClassName(classs) }

const _myStorage = window.localStorage

let _isMobile = false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
  _isMobile = true
}

function _getScriptParams (params) {
  const mapScripts = document.getElementsByTagName('script')
  return params.map(param => {
    return [...mapScripts].map(ss => { return ss.getAttribute(param) }).filter(Boolean)[0]
  })
}

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

__id('themeSwitch').addEventListener('click', function () {
  const isChecked = __id('themeSwitch').checked
  const value = isChecked ? 1 : 0
  value ? localStorage.setItem('themeSwitch', 'true') : localStorage.removeItem('themeSwitch')
  if (!value) {
    document.body.style.backgroundImage = ''
    document.documentElement.style.backgroundImage = ''
  }
})

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
  document.body.style.backgroundImage = `url(https://openweathermap.org/img/wn/${dummyDailies[dummyDailies.length - 1].weather[0].icon || 'na'}.png), linear-gradient(to bottom, #82addb 0%,#ebb2b1 100%)`
  document.documentElement.style.backgroundImage = `url(https://openweathermap.org/img/wn/${dummyDailies[dummyDailies.length - 1].weather[0].icon || 'na'}.png), linear-gradient(rgb(235, 178, 177) 0%, rgb(130, 173, 219) 100%)`
  const maxTemp = Math.max(...dummyDailies.map((item) => { return item.temp.max }))
  dummyDailies.forEach(function (period) {
    const d = new Date(0)
    d.setUTCSeconds(period.dt)
    const ISODate = d.toISOString().slice(0, 10)
    const dayName = weekdayNames[d.getDay()] // new Date(period.dateTimeISO).getDay()
    const iconSrc = `https://openweathermap.org/img/wn/${period.weather[0].icon || 'na'}@4x.png`
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

function minMax() {
  let cards = Array.from(document.querySelectorAll('[id^="checkIdcity"]')).map(a=> {return a.firstElementChild}).filter(Boolean).slice(0,8)
  cards.forEach(card => {
    let style = card.style.backgroundImage
    if (style.indexOf('40%') > -1) {
      card.style.backgroundImage = style.replace('40%', '100%').replace('40%', '100%')
      return
    }
    if (style.indexOf('0.01%') > -1) {
      card.style.backgroundImage = style.replace('0.01%', '40%').replace('0.01%', '40%')
      return
    }
    if (style.indexOf('100%') > -1) {
      card.style.backgroundImage = style.replace('100%', '0.01%').replace('100%', '0.01%')
      return
    }
  });
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
  // toBe.style.cursor =''
  toBe.childNodes[1].firstElementChild.setAttribute('href', '')
  toBe.insertAdjacentHTML('afterbegin', title)
  if(_isMobile) {
    var button = document.createElement('button')
    button.innerHTML = 'Share'
    button.classList.add('btn-sm')
    button.classList.add('btn-outline-warning')
    button.onclick = function(){
      shareIt(data + '_clone')
      return false
    };
    toBe.appendChild(button)
  }
  ev.target.appendChild(toBe)
}

function autoDrag (autodrag_id) {
  __id(autodrag_id).remove()
  let data = autodrag_id.slice(0, -9)
  let toBe = __id(data).cloneNode(true)
  toBe.childNodes
  const title = `<h3>${ data.split('-').slice(1,-1).map(a => {return a.charAt(0).toUpperCase() + a.slice(1) }).join('-') }</h3>`
  toBe.setAttribute('id', data + '_clone')
  toBe.setAttribute('draggable', false)
  // toBe.style.cursor =''
  toBe.childNodes[1].firstElementChild.setAttribute('href', '')
  toBe.insertAdjacentHTML('afterbegin', title)
  if(_isMobile) {
    var button = document.createElement('button')
    button.innerHTML = 'Share'
    button.classList.add('btn-sm')
    button.classList.add('btn-outline-warning')
    button.onclick = function(){
      shareIt(data + '_clone')
      return false
    };
    toBe.appendChild(button)
  }
  toBe.childNodes[4].remove()
  __id('comparision-items').appendChild(toBe)
  window.location = '#comparision-items'
}

function emptyIt() {
  const elements = document.querySelectorAll('[id*="_clone"]')
  Array.prototype.forEach.call(elements, function(node) {
    node.parentNode.removeChild(node)
  })
}

function shareIt(card_id) {
  const dd = __id(card_id);//.cloneNode(true)
  // dd.style.backgroundColor ="white"
  const scale = 2
  // dd.childNodes[4].remove()
  domtoimage.toBlob(dd, {
      width: dd.clientWidth * scale,
      height: dd.clientHeight * scale,
      bgcolor: 'white',
      filter: function (node) { return (node.tagName !== 'BUTTON') },
      style: {
        transform: 'scale('+scale+')',
        transformOrigin: 'top left'
      }
    }).then(function (blob) {
      const file = new File([blob], 'WeatherVenue.png', { type: blob.type })
      const data = {
        title: 'WeatherVenue.com',
        text: `Weather in ${card_id.split('_')[0].split('-')[1]}`,
        files: [file],
      }
      if(navigator.canShare && navigator.canShare(data)) {
        navigator.share(data)
      } else {
        console.log('cannot share ')
      }
    })
}

/**
 * Copyright (c) Christopher Keefer, 2016.
 * https://github.com/SaneMethod/fetchCache
 *
 * Override fetch in the global context to allow us to cache the response to fetch in a Storage interface
 * implementing object (such as localStorage).
 */
 (function (fetch) {
  /* If the context doesn't support fetch, we won't attempt to patch in our
   caching using fetch, for obvious reasons. */
  if (!fetch) return;

  /**
   * Generate the cache key under which to store the local data - either the cache key supplied,
   * or one generated from the url, the Content-type header (if specified) and the body (if specified).
   *
   * @returns {string}
   */
  function genCacheKey(url, settings) {
      var {headers:{'Content-type': type}} = ('headers' in settings) ? settings : {headers: {}},
          {body} = settings;

      return settings.cacheKey || url + (type || '') + (body || '');
  }

  /**
   * Determine whether we're using localStorage or, if the user has specified something other than a boolean
   * value for options.localCache, whether the value appears to satisfy the plugin's requirements.
   * Otherwise, throw a new TypeError indicating what type of value we expect.
   *
   * @param {boolean|object} storage
   * @returns {boolean|object}
   */
  function getStorage(storage) {
      if (!storage) return false;
      if (storage === true) return self.localStorage;
      if (typeof storage === "object" && 'getItem' in storage &&
          'removeItem' in storage && 'setItem' in storage) {
          return storage;
      }
      throw new TypeError("localCache must either be a boolean value, " +
          "or an object which implements the Storage interface.");
  }

  /**
   * Remove the item specified by cacheKey and its attendant meta items from storage.
   *
   * @param {Storage|object} storage
   * @param {string} cacheKey
   */
  function removeFromStorage(storage, cacheKey) {
      storage.removeItem(cacheKey);
      storage.removeItem(cacheKey + 'cachettl');
      storage.removeItem(cacheKey + 'dataType');
  }

  /**
   * Cache the response into our storage object.
   * We clone the response so that we can drain the stream without making it
   * unavailable to future handlers.
   *
   * @param {string} cacheKey Key under which to cache the data string. Bound in
   * fetch override.
   * @param {Storage} storage Object implementing Storage interface to store cached data
   * (text or json exclusively) in. Bound in fetch override.
   * @param {Number} hourstl Number of hours this value shoud remain in the cache.
   * Bound in fetch override.
   * @param {Response} response
   */
  function cacheResponse(cacheKey, storage, hourstl, response) {
      var cres = response.clone(),
          dataType = (response.headers.get('Content-Type') || 'text/plain').toLowerCase();

      cres.text().then((text) => {
          try {
              storage.setItem(cacheKey, text);
              storage.setItem(cacheKey + 'cachettl', +new Date() + 1000 * 60 * 60 * hourstl);
              storage.setItem(cacheKey + 'dataType', dataType);
          } catch (e) {
              // Remove any incomplete data that may have been saved before the exception was caught
              removeFromStorage(storage, cacheKey);
              console.log('Cache Error: ' + e, cacheKey, text);
          }
      });

      return response;
  }

  /**
   * Create a new response containing the cached value, and return a promise
   * that resolves with this response.
   *
   * @param value
   * @param dataType
   * @returns {Promise}
   */
  function provideResponse(value, dataType) {
      var response = new Response(
          value,
          {
              status: 200,
              statusText: 'success',
              headers: {
                  'Content-Type': dataType
              }
          }
      );

      return new Promise(function (resolve, reject) {
          resolve(response);
      });
  }

  /**
   * Override fetch on the global context, so that we can intercept
   * fetch calls and respond with locally cached content, if available.
   * New parameters available on the call to fetch:
   * localCache   : true // required - either a boolean (if true, localStorage is used,
   * if false request is not cached or returned from cache), or an object implementing the
   * Storage interface, in which case that object is used instead.
   * cacheTTL     : 5, // optional, cache time in hours, default is 5. Use float numbers for
   * values less than a full hour (e.g. 0.5 for 1/2 hour).
   * cacheKey     : 'post', // optional - key under which cached string will be stored.
   * isCacheValid : function  // optional - return true for valid, false for invalid.
   */
  self.fetch = function (url, settings) {
      var storage = getStorage(settings.localCache),
          hourstl = settings.cacheTTL || 5,
          cacheKey = genCacheKey(url, settings),
          cacheValid = settings.isCacheValid,
          ttl,
          value,
          dataType;

      if (!storage) return fetch(url, settings);

      ttl = storage.getItem(cacheKey + 'cachettl');

      if (cacheValid && typeof cacheValid === 'function' && !cacheValid()) {
          removeFromStorage(storage, cacheKey);
          ttl = 0;
      }

      if (ttl && ttl < +new Date()) {
          removeFromStorage(storage, cacheKey);
      }

      value = storage.getItem(cacheKey);

      if (!value) {
          /* If not cached, we'll make the request and add a then block to the resulting promise,
           in which we'll cache the result. */
          return fetch(url, settings).then(cacheResponse.bind(null, cacheKey, storage, hourstl));
      }

      /* Value is cached, so we'll simply create and respond with a promise of our own,
       and provide a response object. */
      dataType = storage.getItem(cacheKey + 'dataType') || 'text/plain';
      return provideResponse(value, dataType);
  };
})(self.fetch);
