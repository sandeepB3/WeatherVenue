function _aqiCardHolder(aqiColor, aqiInterpretation, aqi, ISODate, co, no, no2) {
  let coo = 1
  return (`
    <div class="col-md-3" style="margin-top:20px;">
        <div class="card" style="${aqiColor}">
            <h4 class="card-title text-center" data-toggle="collapse" href="#collapseId20" role="button" aria-expanded="true">${aqiInterpretation[aqi]}</h4>
            <table style="width:100%">
                <tr>
                    <th style= 'background-color: #4C5273; font-size: xx-small'>${aqiInterpretation[coo++].split(':')[1].trim()}</th>
                    <th style= 'background-color: #F2E96B; font-size: xx-small'>${aqiInterpretation[coo++].split(':')[1].trim()}</th>
                    <th style= 'background-color: #F2CA50; font-size: xx-small'>${aqiInterpretation[coo++].split(':')[1].trim()}</th>
                    <th style= 'background-color: #F2A03D; font-size: xx-small'>${aqiInterpretation[coo++].split(':')[1].trim()}</th>
                    <th style= 'background-color: #A67041; font-size: xx-small'>${aqiInterpretation[coo++].split(':')[1].trim()}</th>
                </tr>
            </table>
            <div class="card-body">
                <div class="collapse show" id="collapseId20">
                    <h5 class="card-title text-center">${ISODate}</h5>
                    <p class="card-text text-center">CO: ${co} </p>
                    <p class="card-text text-center">NO: ${no} </p>
                    <p class="card-text text-center">NO2: ${no2} </p>
                </div>
            </div>
        </div>
    </div>
    `)
}

function _tempHolder(hueColor, colorScale, dayName, ISODate, iconSrc, description, maxTempF, minTempF, sunrise, sunset, humidity, pressure, windSpeed, co, currentMarkedId) {
  const heads = colorScale.map(color => { return `<th style= 'background-color: ${color}; font-size: xx-small'>.</th>` })
  console.log(heads)
  return (`
    <div class="col-md-3" id="${currentMarkedId}-${co}" style="margin-top:20px;" draggable="true" ondragstart="drag(event)">
        <div class="card" style="${hueColor}">
            <h4 class="card-title text-center" data-toggle="collapse" href="#collapseId${co}" role="button" aria-expanded="true">${dayName}\n${ISODate}</h4>
            <table style="width:100%">
                <tr> ${heads} </tr>
            </table>
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
