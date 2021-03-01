# WeatherVenue

WeatherVenue is a weather website using Google Maps and Openweathermap data to let people find best places to visit in their entourage; For warmer winter weather vacation or cool summer escapes. 

It is a NodeJs & Express web app with other dependencies (axios, redis, reverse-geocode, nearby-cities, openweather-apis...).


# Deployment

- Replace with your keys (use wisely. Do not stuck in a loop and do not publicly push on GITHUB x))
- Accept origins like (localhost:3001) in Google developers console map API.
- Install and run Redis server.
- Configure .env file with the followings:
```
    - NODE_ENV=dev
    - PORT=3000
    - REDIS_PORT=####
    - OPENWEATHERMAP_API_KEY=####
    - GOOGLE_MAPS_API_KEY=GOOGLE_MAPS_API_KEY
    - HONEYPOT_KEY=####
```

Replace GOOGLE_MAPS_API_KEY also in client end in `views/head.ejs `

`<script src="https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_API_KEY&callback=initMap&libraries=places,visualization&v=weekly"`

Then run:

`npm install` which installs dependencies.

`npm start` which starts at port 3000 normally.

# A Glimpse of UI


when deployed after research it should be like: 

![capture](CONTRIBUTING/Capture.PNG)

![capture2](CONTRIBUTING/Capture2.PNG)

# Contribution


Please see open issues for a specific issue, and do not hesitate to open any new issue (like better code, readability, modularity and best practice, performance, better UI or even functionality enhancements...).



Current priority: 

https://github.com/bacloud14/WeatherVenue/issues/1

Please know that I am not a keen NodeJS developer, but I successfully made this weather application. It is in its early stage and not proper for final service yet.

If you contribute, please consider that I can merge and publish a new release under one channel or another. It will be 100% free although I can add ads to generate some coffee expenses :)

If you want to maintain the project with me; You can alwayse ask.

Please keep it fair if you want to deploy anywhere; Ask for permission.

Sweet coding !


# License

WeatherVenue is released under a [CC BY-NC-SA License](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode).
