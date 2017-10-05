'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLabel = undefined;

var _labels = require('../models/labels');

var _labels2 = _interopRequireDefault(_labels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addLabel = exports.addLabel = function addLabel(req, res) {
  var label = new _labels2.default();
  label.userId = req.body.id;
  label.label = req.body.label;
  label.coord.latitude = req.body.latitude;
  label.coord.longitude = req.body.longitude;
  label.save(function (err) {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        status: 'ok'
      });
    }
  });
};