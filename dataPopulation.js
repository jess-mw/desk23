#! /usr/bin/env node

var async = require('async')
var LiteracyModel = require('./models/literacyRates')
//var csv = require('./node_modules/jquery-csv/src/jquery.csv.js');
//var jquery = require('./node_modules/jquery/src/jquery.js');
var mongoose = require('mongoose');

const {
   MONGO_USERNAME,
   MONGO_PASSWORD,
   MONGO_HOSTNAME,
   MONGO_PORT,
   MONGO_DB
} = process.env;

const options = {
   useNewUrlParser: true,
   reconnectTries: Number.MAX_VALUE,
   reconnectInterval: 500,
   connectTimeoutMS: 10000,
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url, options);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var literacyData = []

function literacyCreate(country, code, year, literacyRates, cb) {
  //literacyData = {country:country, code:code, year:year, literacyRates:literacyRates};
  var data = new LiteracyModel({country:country, code:code, year:year, literacyRates:literacyRates});
  data.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Data: ' + data);
    literacyData.push(data)
    cb(null, data)
  });
}

//populating database with data
function createLiteracyRates(cb){
   async.parallel([
      function(callback) {
         literacyCreate('Afghanistan', 'AFG', 1979, 18.15768, callback);
      },
      function(callback){
         literacyCreate('Albania', 'ALB', 2001, 98.71298, callback);
      },
      function(callback){
         literacyCreate('Algeria', 'DZA', 1987, 49.63088, callback);
      },
      function(callback){
         literacyCreate('American Samoa', 'ASM', 1980, 97.34416, callback);
      },
   ],
   //optional callback
   cb);
}

//extract data from csv file
//var dataFromFile = $.csv.toArrays(csv);

async.series([
   createLiteracyRates
],
//optional callback
function(err, results) {
   if(err){
      console.log('FINAL ERR: '+err);
   }else{
      console.log('LiteracyRates: '+literacyData);
      //console.log('data from file: '+dataFromFile);
   }
   // All done, disconnect from database
    mongoose.connection.close();
});