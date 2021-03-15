class AqiCard {
  constructor (style, aqiInterpretation, aqi, ISODate, co, no, no2) {
    const theme = {
      1: '#4C5273',
      2: '#F2E96B',
      3: '#F2CA50',
      4: '#F2A03D',
      5: '#A67041'
    }
    this.style = style + theme[aqi]
    this.aqiInterpretation = aqiInterpretation
    this.aqi = aqi
    this.ISODate = ISODate
    this.co = co
    this.no = no
    this.no2 = no2
  }

  html () {
    let coo = 1
    const showClass = _isMobile ? '' : 'show'
    return (`
        <div class="col-md-3" style="margin-top:20px;">
            <div class="card" style="${this.style}">
                <h4 class="card-title text-center" data-toggle="collapse" href="#collapseId20" role="button" aria-expanded="false">${this.aqiInterpretation[this.aqi]}</h4>
                <table style="width:100%">
                    <tr>
                        <th style= 'background-color: #4C5273; font-size: xx-small'>${this.aqiInterpretation[coo++].split(':')[1].trim()}</th>
                        <th style= 'background-color: #F2E96B; font-size: xx-small'>${this.aqiInterpretation[coo++].split(':')[1].trim()}</th>
                        <th style= 'background-color: #F2CA50; font-size: xx-small'>${this.aqiInterpretation[coo++].split(':')[1].trim()}</th>
                        <th style= 'background-color: #F2A03D; font-size: xx-small'>${this.aqiInterpretation[coo++].split(':')[1].trim()}</th>
                        <th style= 'background-color: #A67041; font-size: xx-small'>${this.aqiInterpretation[coo++].split(':')[1].trim()}</th>
                    </tr>
                </table>
                <div class="card-body">
                    <div class="collapse ${showClass}" id="collapseId20">
                        <h5 class="card-title text-center">${this.ISODate}</h5>
                        <p class="card-text text-center">CO: ${this.co} </p>
                        <p class="card-text text-center">NO: ${this.no} </p>
                        <p class="card-text text-center">NO2: ${this.no2} </p>
                    </div>
                </div>
            </div>
        </div>
    `)
  }
}

class TemperatureCard {
  constructor (language, period, maxTemp, minTemp, currentMarked, co) {
    this.period = period
    this.maxTemp = maxTemp
    this.minTemp = minTemp
    this.currentMarked = currentMarked
    const d = new Date(0)
    d.setUTCSeconds(period.dt)
    this.ISODate = d.toISOString().slice(5, 10)
    this.dayName = _weekdaysLangs(language)[d.getDay()]
    this.iconSrc = `https://openweathermap.org/img/wn/${period.weather[0].icon || 'na'}@4x.png`
    this.maxTempF = period.temp.max || 'N/A'
    this.minTempF = period.temp.min || 'N/A'
    this.description = period.weather[0].description || 'N/A'
    this.sunrise = new Date(period.sunrise * 1000).toLocaleTimeString('en-GB').slice(0, 5)
    this.sunset = new Date(period.sunset * 1000).toLocaleTimeString('en-GB').slice(0, 5)
    this.humidity = period.humidity
    this.pressure = period.pressure
    this.wind_speed = period.wind_speed
    this.co = co
  }

  getHueColors () {
    const hueMax = (1.0 - (this.maxTempF / this.maxTemp)) * 240
    const hueMin = (1.0 - (this.minTempF / this.maxTemp)) * 240
    const hueColors = `; border-radius: 5px; border: 5px solid rgb(122 122 122 / 30%); background: linear-gradient(70deg, hsl( ${hueMin} , 90%, 80%) 40%, hsl( ${hueMax} , 90%, 80%) 40%)`
    return hueColors
  }

  getCurrentMarkedId () {
    const currentMarkedId = 'city-' + this.currentMarked.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(' ', '-').toLowerCase()
    return `checkId${currentMarkedId}`
  }

  getColorScaleHeads () {
    const range = Array.range(this.minTemp, this.maxTemp, 0.5, 1)
    const stepMin = range.filter(n => { return this.minTempF > n }).length
    const stepMax = range.filter(n => { return this.maxTempF > n }).length
    const colorScale = range.map(step => { return `hsl( ${((1.0 - (step / this.maxTemp)) * 240)} , 90%, 80%)` })
    const heads = colorScale.map((color, idx) => {
      if (stepMin === idx) { return `<th style= 'background-color: ${color}; font-size: xx-small'>&nbsp;ᐁ</th>` }
      else if (stepMax === idx) { return `<th style= 'background-color: ${color}; font-size: xx-small'>&nbsp;ᐃ</th>` }
      else { return `<th style= 'background-color: ${color}; font-size: xx-small'>&nbsp;</th>` }
    }).join('')
    return heads
  }

  html () {
    const showClass = _isMobile ? '' : 'show'
    let autoDragBtn = _isMobile ? `<button class="btn-sm btn-outline-warning" id="${this.getCurrentMarkedId()}-${this.co}-autodrag" onclick="autoDrag(this.id)"> Compare </button>` : ''
    return (`
      <div class="col-md-3" id="${this.getCurrentMarkedId()}-${this.co}" style="margin-top:20px;" draggable="true" ondragstart="drag(event)">
          <div class="card" style="${this.getHueColors()}">
              <table style="width:100%">
                  <tr>${this.getColorScaleHeads()}</tr>
              </table>
              <h4 class="card-title text-center" data-toggle="collapse" href="#collapseId${this.co}" role="button" aria-expanded="false">${this.dayName}\n${this.ISODate}</h4>
              <img class="card-img mx-auto d-block" style="max-width: 30%;" src="${this.iconSrc}">
              <div class="card-body">
                  <div class="collapse ${showClass}" id="collapseId${this.co}">
                      <h6 class="card-title text-center">${this.description}</h6>
                      <p class="card-text text-center">High: ${this.maxTempF} <br />Low: ${this.minTempF}</p>
                      <div id="weatherinfo">
                      <p><img class="icon" src="./img/sunrise.svg"> ${this.sunrise}</p>
                      <p><img class="icon" src="./img/sunset.svg"> ${this.sunset}</p>
                      <p><img class="icon" src="./img/humidity.svg"> ${this.humidity}</p>
                      <p><img class="icon" src="./img/pressure.svg"> ${this.pressure}</p>
                      <p><img class="icon" src="./img/wind.svg"> ${this.wind_speed}</p>
                  </div>
                  </div>
              </div>
          </div>
          ${autoDragBtn}
      </div>
    `)
  }
}

class CardsNavBar {
  constructor (language) {
    this.language = language
  }

  html () {
    if (_isMobile) {
      const minMaxBtn = '<div class="text-center"><button type="button" class="btn btn-light" id="startover" onclick="minMax()">Min-Max</button></div>'
      return minMaxBtn
    }
    return (`<div class="col-10"><nav class="navbar navbar-expand-sm navbar-light bg-light">
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item btn btn-light" id="startover" onclick="minMax()">
                    Min-Max
                  </li>
                  <li class="nav-item btn btn-light" id="addall" onclick="addAll()">
                    Compare all
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Dropdown
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                  </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
              </div>
            </nav></div>
          `)
  }
}

function _adsHolder(company) {
  switch (company) {
    case 'Google':
      return (`
                <div class="col-md-3" style="margin-top:20px;">
                    <div class="card" style="background-color: red;">
                        <div class="card-body">
                            <p>Ads go here</p>
                        </div>
                    </div>
                </div>
                `)
      break
    default:
      break
  }
}
