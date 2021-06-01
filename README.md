# Woo W' Pups
A platform where people can rent a pup and can spend some time with pups

### Tech Stack
- React, Bootstrap, NodeJS, ExpressJS, MongoDB
- Braintree Payments for Making Payments (PayPal Integration)

### To use this project, follow the steps below
- Clone the repo and type `npm install` in frontend and backend directory to install the required dependecies
- Create a `.env` file in frontend with following parameters
  - `REACT_APP_BACKEND=http://localhost:<Port Number>/api/` (Backend Server)
- Create a `.env` file in backend with following parameters
  - `DATABASE=mongodb://localhost:27017/<your_db_name>`
  - `PORT=<port_number>`
  - `SECRET=<your_secret_key>`
  - `MERCHANT_ID=<MERCHANT_ID>`
  - `PUBLIC_KEY=<PUBLIC_KEY>`
- Type `npm start` to start the servers in both frontend and backend CLI's

### Screenshots
