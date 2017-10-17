"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var alphaNumeric = exports.alphaNumeric = function alphaNumeric(value) {
  var reg1 = /^[a-z0-9]+$/i;
  var reg2 = /^[0-9]+$/i;
  if (reg1.test(value) && value.length != 0) {
    if (reg2.test(value)) {
      return false;
    }
    return true;
  } else {
    return false;
  }
};

var onlyNumber = exports.onlyNumber = function onlyNumber(value) {
  var reg = /^[0-9]+$/;
  if (reg.test(value) && value.length != 0) {
    return true;
  } else {
    return false;
  }
};

var email = exports.email = function email(value) {
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(value) && value.length != 0) {
    return true;
  } else {
    return false;
  }
};

var passMatch = exports.passMatch = function passMatch(value1, value2) {
  if (value1 === value2 && value1.length !== 0) {
    return true;
  } else {
    return false;
  }
};