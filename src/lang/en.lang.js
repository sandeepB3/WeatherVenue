module.exports = {
  weekdays: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  aqi: {
    1: 'Air quality: Good',
    2: 'Air quality: Fair',
    3: 'Air quality: Moderate',
    4: 'Air quality: Poor',
    5: 'Air quality: Very Poor',
  },
  pictures: {
    success: (place) => `Local pictures of ${place}`,
    fail: (place) => `There are no pictures found for ${place}`,
  },
  notFoundMessages: {
    h1: 'Oops!',
    h2: 'Page is not found',
    details: 'Sorry, an error has occured or the requested page is not found.',
    actions: 'Take me home',
  },
  tour: {
    map: '"Interact with the map. You can click on markers and see each city weather cards. Right click on two markers to reveal a directions link. Also drag days control to see how tempreture will be in the next days."',
    cards:
      '"You can drag cards to the weather comparisons area. Colored cards reflect maximum and minimum temperature in one day. Click on min-max to simplify comparisions visually."',
    comparision:
      '"In comparison area You can see cards of different days and of different cities too. For Android devices and on Google Chrome only, You can also share any card with people."',
    gallery: '"A beautiful local gallery of pictures of the main city."',
  },
};
