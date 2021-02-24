function _weekdaysLangs(language) {
  switch (language) {
    case 'en':
      return [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
    case 'ar':
      return [
        'الأحد',
        'الإثنين',
        'الثلثاء',
        'الأربعاء',
        'الخميس',
        'الجمعة',
        'السبت'
      ]
    default:
      throw new Error('Language mapping error in _weekdayNames with language=', language)
  }
}

function _aqiLangs(language) {
  switch (language) {
    case 'en':
      return {
        1: 'Air Quality: Good',
        2: 'Air Quality: Fair',
        3: 'Air Quality: Moderate',
        4: 'Air Quality: Poor',
        5: 'Air Quality: Very Poor'
      }
    case 'ar':
      return {
        1: 'جودة الهواء: جيدة',
        2: 'جودة الهواء: مقبولة',
        3: 'جودة الهواء: متوسطة',
        4: 'جودة الهواء: ضعيفة',
        5: 'جودة الهواء: ضعيفة جدا'
      }
    default:
      throw new Error('Language mapping error in _aqiInterpretation with language=', language)
  }
}

function _picturesLangs(language) {
  let success, fail
  switch (language) {
    case 'en':
      success = (place) => `Local pictures of ${place}`
      fail = (place) => `There are no pictures found for ${place}`
      return [success, fail]
    case 'ar':
      success = (place) => `صور منطقة ${place}`
      fail = (place) => `لا توجد صور لمنطقة ${place}`
      return [success, fail]
    default:
      throw new Error('Language mapping error in _picturesLangs with language=', language)
  }
}
