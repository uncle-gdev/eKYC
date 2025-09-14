<h1 align="center">
   <img src="https://res.cloudinary.com/lorransutter/image/upload/v1626387244/eKYC/eKYC_logo.svg" height=150/>
   <p>eKYC</p>
</h1>

<p align="center">
   Advanced identity verification solution using Hyperledger Indy for decentralized digital identity management, KYC compliance, and secure credential sharing. Features DID-based authentication, verifiable credentials, biometric verification support, and location-based validation with extensibility for government entity integration.
</p>

<p align="center">
   For architecture, flow diagrams and more detailed explanation, please check <a href='Project%20Documents/Architecture%20Design%20%26%20Governance%20Document%20-%20eKYC%20-%20dAPP%201.pdf'>Project Documents</a> folder.
</p>

<p align="center">
    <a href="https://github.com/Nas2020">Cherukkatil Naseer</a>&nbsp;|&nbsp;
    <a href="https://github.com/TheClockworkOrange">Henry Eriko Mwenge</a>&nbsp;|&nbsp;
    <a href="https://github.com/LorranSutter">Lorran Sutter</a>&nbsp;|&nbsp;
    <a href="https://github.com/pumpin100">Raymond Lawal</a>&nbsp;|&nbsp;
    <a href="https://github.com/mascarenhaswanja">Wanja Mascarenhas</a>&nbsp;|&nbsp;
    <a href="https://github.com/DeadPreZ-101">Zakariya Jasat</a>
</p>

<p align="center">
  
  <img src="https://res.cloudinary.com/lorransutter/image/upload/v1594527234/eKYC/eKYC-2.0_1.gif" height=400/>
  <img src="https://res.cloudinary.com/lorransutter/image/upload/v1594528007/eKYC/eKYC-2.0_2.gif" height=400/>
  
</p>

## :runner: How to run

This eKYC application now uses **Hyperledger Indy** for decentralized identity management and verification. The system provides DID-based authentication, verifiable credentials, and supports biometric and location-based validation.

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- MongoDB (for user data storage)
- Indy SDK dependencies

### Project Structure

```
📦eKYC
 ┣ 📂api
   ┣ 📂controllers
   ┣ 📂services
      ┗ 📜indyIdentityService.js
   ┣ 📂models
   ┗ 📂utils
 ┣ 📂frontend
   ┗ 📂src
      ┗ 📂service
         ┗ 📜baseURL.json
 ┣ 📂audits
 ┣ 📜.env
 ┗ 📜setUp.sh
```

### Installation

Clone the repository:

``` sh
# Clone this repo
git clone https://github.com/LorranSutter/eKYC.git

# Go to the project folder
cd eKYC
```

To run the application you will need to set your own configurations of _port_, _database_, _private key_ and _encryption key_. Create the following .env file in the indicated path and format with your customized configurations:

``` json
// ./.env

PORT_API=15500
PORT_FRONTEND=15501
PRIVATE_KEY="54AD766F231CCB0EA64156F1E5488"
ENCRYPTION_KEY="CoCKidLqlVuB8y1EYmKaye1UGoxtHmko1LmyqOHvVht="
MONGODB_URI_DEV="YOUR_DEV_MONGO_URI"
```

Now you will need two opened terminals to run the project. One for the API and another one for the frontend.

API will run on http://10.1.1.184:15500/

Frontend will run on http://10.1.1.184:15501/

``` sh

## In the first terminal ##

# Go to the API application
cd api

# Install dependencies
npm install
```

``` sh
## In the second terminal ##

# Go to the frontend application
cd frontend

# Install dependencies
npm install
```

In order to connect frontend to the API, you will have to provide the base URL of the API in the following file:

```sh
## In the second terminal ##

# Go to the baseURL.json file
cd src/service/baseURL.json

{
    "baseURL": "http://10.1.1.184:15500"
}
```

Now you can start the network and perform all necessary set up running the following magic script:

``` sh
## In the first terminal ##

# Go to the root
cd ..

# Run the set up script
./setUp.sh
```

Run the API application:

``` sh
## In the first terminal ##

# Go to the API application
cd api

# Run API application
npm run start

# Or to use nodemon
npm run dev
```

Finally run the frontend application:

``` sh
## In the second terminal ##

# Run the project
npm start
```

To stop the application, simply terminate the running processes in both terminals using Ctrl+C.

#### Login credentials

Client
* login: user01 / user02 / JonasKahnwald / MarthaNielsen / ClaudiaTiedemann / ElisabethDoppler / H.G.Tannhaus
* password: 123456

Financial Institution
* login: FI1 / FI2
* password: 123456

## :book: Resources and technologies :computer:

1. Identity Management

   - [Hyperledger Indy](https://hyperledger-indy.readthedocs.io/) - decentralized identity blockchain framework
   - [Indy SDK](https://github.com/hyperledger/indy-sdk) - SDK for building applications on Hyperledger Indy
   - [Hyperledger Indy VDR](https://www.npmjs.com/package/@hyperledger/indy-vdr) - Verifiable Data Registry for Indy
   - [Aries Framework](https://www.npmjs.com/package/@hyperledger/aries-framework-core) - framework for decentralized identity
   - [ESlint](https://eslint.org/) - pluggable JS linter

2. API

   - [Express.js](http://expressjs.com/) - web application framework
   - [MongoDB](https://www.mongodb.com/) - NoSQL database
   - [Mongoose](https://mongoosejs.com/) - object data modeling (ODM) library for MongoDB and Node.js
   - [Express validator](https://express-validator.github.io/docs/) - middleware to validate data
   - [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - library to perform cryptography
   - [JWT. IO](https://jwt.io/) - JSON Web Tokens to allow, decode, verify and generate JWT
   - [Dotenv](https://www.npmjs.com/package/dotenv) - loads environment variables from a .env file
   - [Cookie Parser](https://www.npmjs.com/package/cookie-parser) - cookie parsing middleware
   - [CORS](https://www.npmjs.com/package/cors) - cross-origin resource sharing

3. Frontend

   - [Rimble](https://rimble.consensys.design/) - design system
   - [ReactJS](https://reactjs.org/) - frontend library
   - [React router dom](https://www.npmjs.com/package/react-router-dom) - routing and navigation for react apps
   - [React-cookie](https://www.npmjs.com/package/react-cookie) - cookie interaction for React applications
   - [Axios](https://www.npmjs.com/package/axios) - HTTP requests

## :cookie: Credits

- [Encryption/Decryption code using cipher](https://github.com/zishon89us/node-cheat/blob/master/stackoverflow_answers/crypto-create-cipheriv.js#L2)
