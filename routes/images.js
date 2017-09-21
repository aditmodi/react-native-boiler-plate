var express = require('express');
var route = express.Router();
var ctrl = require('../controller/imageCtrl');
const ImageDB = require('../models/images');
const fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// route.post('/addPhoto', function (req, res){ctrl.addImage});
  route.post('/addPhoto', upload.fields([{ name: 'photo', maxCount: 1 }]), ctrl.addImages);
  route.get('/getPhoto', ctrl.getImages);
module.exports = route;
