var express = require('express');
var route = express.Router();
var ctrl = require('../controller/imageCtrl');

route.post('/addPhoto', function(req,res){ctrl.addImage});
module.exports = route;
