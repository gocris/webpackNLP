const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const aylien = require('aylien_textapi');
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
  });
const mockAPIResponse = require('./mockAPI.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

console.log(`__dirname: ${__dirname}`)
//console.log(process.env)

const projectData = [];

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})
app.get('/save', function (req, res) {
  res.json(mockAPIResponse);
})

app.post('/article', function (req, res) {
    console.log('POST request recieved!');
    console.log(req.body)
    
    textapi.sentiment({
      url: req.body.text, 
      mode: 'document'
    }, function(error, response) {
      console.log(response);
      res.send(response);
      if (error === null) {
        console.log(response);
      }
    })
});

module.exports = app;

