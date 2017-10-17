'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DummyUser = {
  register: {
    validUser: {
      firstName: 'abc',
      lastName: 'xyz',
      email: 'abc@xyz.com',
      password: '123456',
      gender: 'male',
      phone: 9876543210
    },
    invalidUser: {
      firstName: 'xyz..',
      lastName: 'abc..',
      email: 'abcxyzcom',
      password: '654321',
      gender: 'female',
      phone: 'abc'
    },
    existingUser: {
      firstName: 'xyz',
      lastName: 'abc',
      email: 'abc@xyz.com',
      password: '654321',
      gender: 'female',
      phone: 1234567890
    },
    nullUser: {}
  },

  login: {
    validUser: {
      username: 'abc@xyz.com',
      password: '123456'
    },
    nonExistUser: {
      username: '123@abc.com',
      password: '123456'
    },
    nullUser: {}
  }
};

exports.default = DummyUser;