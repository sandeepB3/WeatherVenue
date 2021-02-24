# WeatherVenue

WeatherVenue is a weather website using Google Maps and Openweathermap data to let people find best places to visit in their entourage; For warmer winter weather vacation or cool summer escapes. 

It is a NodeJs & Express web app with other dependencies (axios, redis, reverse-geocode, nearby-cities, openweather-apis...).


# Deployment

- Use my keys or replace with your (use wisely, just do not stuck it in a loop x))
- Install and run Redis server.
- Configure .env file with the followings:
    - NODE_ENV=dev
    - PORT=3000
    - REDIS_PORT=####
    - OPENWEATHERMAP_API_KEY=bd28a4d61d422ddeb0a1db08ce16c1fc
    - GOOGLE_MAPS_API_KEY=AIzaSyBcL91cr-kioveamPxcvnQTT4OA9asC1TE
    - HONEYPOT_KEY=sjbpsgqlldtu

Then run:

`npm install` which installs dependencies.

`npm start` which starts at port 3000 normally.

# A Glimpse of UI

See the static pages https://bacloud14.github.io/WeatherVenue/ or https://bacloud14.github.io/WeatherVenue/index.html or https://bacloud14.github.io/WeatherVenue/index_ar.html

when deployed after research it should be like: 

![capture](Capture.PNG)

![capture2](Capture2.PNG)

# Contribution

See a static dummy version to get a tast of it :

https://bacloud14.github.io/WeatherVenue/ or https://bacloud14.github.io/WeatherVenue/index.html or https://bacloud14.github.io/WeatherVenue/index_ar.html

It can be used for fast styling propositions. 

Please see open issues for a specific issue, and do not hesitate to open any new issue (like better code, readability, modularity and best practice, performance, better UI or even functionality enhancements...).

You can join me on Slack for questions or chat
 
[<img src="https://img.shields.io/badge/slack-join%20us-blueviolet">](https://bacloud.slack.com) 

Current priority: 

https://github.com/bacloud14/WeatherVenue/issues/1

Please know that I am not a keen NodeJS developer, but I successfully made this weather application. It is in its early stage and not proper for final service yet.

If you contribute, please consider that I can merge and publish a new release under one channel or another. It will be 100% free although I can add ads to generate some coffee expenses :)

If you want to maintain the project with me; You can alwayse ask.

Please keep it fair if you want to deploy anywhere; Ask for permission.

Sweet coding !


# License

WeatherVenue is released under a [CC BY-NC-SA License](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode).
