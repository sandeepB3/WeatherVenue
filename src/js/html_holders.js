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
    return (`
        <div class="col-md-3" style="margin-top:20px;">
            <div class="card" style="${this.style}">
                <h4 class="card-title text-center" data-toggle="collapse" href="#collapseId20" role="button" aria-expanded="true">${this.aqiInterpretation[this.aqi]}</h4>
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
                    <div class="collapse show" id="collapseId20">
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
  constructor (jsObject) {
    Object.assign(this, jsObject)
  }
}
function _tempHolder(hueColor, colorScale, stepMin, stepMax, dayName, ISODate, iconSrc, description, maxTempF, minTempF, sunrise, sunset, humidity, pressure, windSpeed, co, currentMarkedId) {
  const heads = colorScale.map((color, idx) => {
    if (stepMin === idx) { return `<th style= 'background-color: ${color}; font-size: xx-small'>&nbsp;ᐁ</th>` }
    else if (stepMax === idx) { return `<th style= 'background-color: ${color}; font-size: xx-small'>&nbsp;ᐃ</th>` }
    else { return `<th style= 'background-color: ${color}; font-size: xx-small'>&nbsp;</th>` }
  }).join('')
  let autoDragBtn = _isMobile ? `<button class="btn-sm btn-outline-warning" id="${currentMarkedId}-${co}-autodrag" onclick="autoDrag(this.id)"> Compare </button>` : ''
  return (`
    <div class="col-md-3" id="${currentMarkedId}-${co}" style="margin-top:20px;" draggable="true" ondragstart="drag(event)">
        <div class="card" style="${hueColor}">
            <table style="width:100%">
                <tr>${heads}</tr>
            </table>
            <h4 class="card-title text-center" data-toggle="collapse" href="#collapseId${co}" role="button" aria-expanded="true">${dayName}\n${ISODate}</h4>
            <!--<h5 class="card-title text-center">${ISODate}</h5>-->
            <img class="card-img mx-auto d-block" style="max-width: 30%;" src="${iconSrc}">
            <div class="card-body">
                <div class="collapse show" id="collapseId${co}">
                    <h6 class="card-title text-center">${description}</h6>
                    <p class="card-text text-center">High: ${maxTempF} <br />Low: ${minTempF}</p>
                    <div id="weatherinfo">
                    <p><img class="icon" src="./img/sunrise.svg"> ${sunrise}</p>
                    <p><img class="icon" src="./img/sunset.svg"> ${sunset}</p>
                    <p><img class="icon" src="./img/humidity.svg"> ${humidity}</p>
                    <p><img class="icon" src="./img/pressure.svg"> ${pressure}</p>
                    <p><img class="icon" src="./img/wind.svg"> ${windSpeed}</p>
                </div>
                </div>
            </div>
        </div>
        ${autoDragBtn}
    </div>
    `)
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
