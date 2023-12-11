# EE547 website "Movipendent" - Frontend

This repo is the frontend part of the website "Movipendent".

## Architecture
The main files lie in the src folder, which consists of four major parts:
- [App.js](https://github.com/ngcxy/MovieDelivery_frontend/blob/main/src/App.js) and [config.js](https://github.com/ngcxy/MovieDelivery_frontend/blob/main/src/config.js) for general setup
- [pages](https://github.com/ngcxy/MovieDelivery_frontend/tree/main/src/pages) folder including the view of separate pages
- [components](https://github.com/ngcxy/MovieDelivery_frontend/tree/main/src/components) folders including independent units of components inside the pages
- [assets](https://github.com/ngcxy/MovieDelivery_frontend/tree/main/src/assets) storing some local images

## Deployment
This frontend is deployed on the cloud via Vercel. Check in this [link](https://movie-delivery-frontend-7uujm9hs5-ngcxy.vercel.app/)

To run locally, follow these steps:

1. Git clone the repository
2. Make sure the [backend](https://github.com/ngcxy/MovieDelivery_backend) is running either locally or on the cloud.
3. Run `npm install` to install essential packages
4. If the backend is running locally, in config.js choose the first url and comment out the second one.
    If you want to connect to the backend deployed on AWS, use the second url.

