const lang = require('../lang/index')

function _weekdaysLangs(language) {
  switch (language) {
    case 'ar':
      return lang.ar.weekdays
    case 'en':
      return lang.en.weekdays
    case 'fr':
      return lang.fr.weekdays
    default:
      throw new Error('Language mapping error in _weekdayNames with language=', language)
  }
}

function _aqiLangs(language) {
  switch (language) {
    case 'ar':
      return lang.ar.aqi
    case 'en':
      return lang.en.aqi
    case 'fr':
      return lang.fr.aqi
    default:
      throw new Error('Language mapping error in _aqiInterpretation with language=', language)
  }
}

function _picturesLangs(language) {
  let success, fail
  switch (language) {
    case 'ar':
      success = lang.ar.pictures.success
      fail = lang.ar.pictures.fail
      return [success, fail]
    case 'en':
      success = lang.en.pictures.success
      fail = lang.en.pictures.fail
      return [success, fail]
    case 'fr':
      success = lang.fr.pictures.success
      fail = lang.fr.pictures.fail
      return [success, fail]
    default:
      throw new Error('Language mapping error in _picturesLangs with language=', language)
  }
}
