const path = require('path');

var LiteracyModelLink = require('./models/literacyRates');
var CoordinatesModelLink = require('./models/coordinates');
var CountryModelLink = require('./models/countryData');

//export index
exports.index = function(req, res) {
   res.sendFile(path.resolve('src/index.html'));
};

/*****
   controller functions for literacy rates collection
****/

//list contents of database, send to router ----> do we need this?
exports.listLiteracyRates = function(req, res) {
   LiteracyModelLink.find({}, function(err, literacyRates){
      if(err){
         return res.send(500, err);
      }
      res.send(literacyRates);
   });
};

/*****
   controller functions for coordinates collection ----> do we need this?
****/
//lists contents of database and sends to router
exports.listCoordinates = function(req, res) {
   CoordinatesModelLink.find({}, function(err, coordinates){
      if(err){
         return res.send(500, err);
      }
      res.send(coordinates);
   });
};

exports.listCountries = function(req, res) {
   CountryModelLink.find({}, function(err, coordinates){
      if(err){
         return res.send(500, err);
      }
      res.send(coordinates);
   });
};

/*****
   controller functions for all models
****/

//removes whole collection
exports.removeModel = function(model, cb){
   model.remove({}, function(err, result){
      if(err){
         console.log(err);
      }else{
         //will show how many items were deleted
         console.log(result);
      }
   });
};

exports.findByEntity = function(model, entity){
   model.find({Entity: new RegExp(entity, 'i')}, function(err, results){
      if(err){
         console.log(err);
      }else{
         console.log(results);
         return results;
      }
   });
};

exports.findByCode = function(model, code){
   model.find({Code: code}, function(err, results){
      if(err){
         return handleError(err);
      }else{
         console.log(results);
         return results;
      }
   });
};

exports.findByYear = function(model, year){
   model.find({Year: year}, function(err, results){
      if(err){
         return handleError(err);
      }else{
         console.log(results);
         return results;
      }
   });
};

exports.findByCodeYear = function(model, code, year){
   model.find({Code: code, Year: year}, function(err, results){
      if(err){
         console.log(err);
      }else{
         console.log(results);
         return results;
      }
   });
};

exports.findByEntityYear = function(model, entity, year){
   model.find({Entity: entity, Year: year}, function(err, results){
      if(err){
         console.log(err);
      }else{
         console.log(results);
         return results;
      }
   });
};

/*****
   controller functions for linking coordinates and literacy rates
*****/

exports.LiteracyRatesFromCoordinates = function(entity){
   CoordinatesModelLink.find(
      //find entity that matches the regex of the variable passed in
      {Entity: new RegExp(entity, 'i')},
      function(err, results1){
      if(err){
         console.log(err);
      }else{
         //get entity from coordinates query result and find literacy rates
         var entityResult = results1[0].toObject().Entity;
         LiteracyModelLink.find(
            {Entity: new RegExp(entityResult.toString(), 'i')},
            function(err, results2){
            if(err){
               console.log(err);
            }else{
               console.log(results1);
               console.log(results2);
               //returns literacy rates - to access each field do something like:
               //results1[0].toObject().Entity
               return results2;
            }
         })
      }
   })
};
