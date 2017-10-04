var express = require('express');
var route = express.Router();
var ctrl = require('../controller/labelCtrl');

route.post('/setLabel', ctrl.addLabel);
module.exports = route;
