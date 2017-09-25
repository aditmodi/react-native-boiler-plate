var express = require('express');
var route = express.Router();
var ctrl = require('../controller/imageCtrl');

// route.post('/addPhoto', function (req, res){ctrl.addImage});
  route.post('/addPhoto',
  //  upload.fields([{ name: 'photo', maxCount: 1 }]),
   ctrl.addImages);
  route.get('/getPhoto/:email', ctrl.getImages);
module.exports = route;
