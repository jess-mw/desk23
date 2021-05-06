// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
// Utility function used to parse json files
const bodyParser = require('body-parser');



// Setup database
const db = require('./db');
//get access to dbController functions
const dbController = require('./dbController');
// Get our API routes (this folder will store all our API handlers - response methods)
const api = require('./server/routes/api');
//get database routes
const literacyRatesRoutes = require('./server/routes/literacyRates.js');
const coordinatesRoutes = require('./server/routes/coordinates.js');
const countriesRoutes = require('./server/routes/countries.js');
//initialise express
const app = express();
//app.use(...);

// Parsers for POST data
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
// Point static path to dist (folder where build files are located)
app.use(express.static(path.join(__dirname, 'dist/LiteracyRates')));
// Set our api routes
app.use('/api', api);
//set our database routes
app.use('/literacyRates', literacyRatesRoutes);
app.use('/coordinates', coordinatesRoutes);
app.use('/countries', countriesRoutes);

// Catch all other routes and return the index file (sits within distribution folder)
// Index is our SPA - programatically serving the files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/LiteracyRates/index.html'));
});

var LiteracyModel = require('./models/literacyRates');
var CoordinatesModel = require('./models/coordinates');
var CountryModel = require('./models/countryData');
dbController.findByEntity(CoordinatesModel, 'Afghanistan');
dbController.findByEntity(LiteracyModel, 'Afghanistan');
dbController.findByEntity(CountryModel, 'Afghanistan');
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

console.log("hello");