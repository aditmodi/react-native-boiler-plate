const DummyUser = {
  register: {
    validUser: {
      fname: 'abc',
      lname: 'xyz',
      email: 'abc@xyz.com',
      password: '123456',
      cPassword: '123456',
      gender: 'male',
      phone: 9876543210
    },
    invalidUser: { one:{
        fname: 'xyz..',
        lname: 'abc',
        email: 'abc@xyz.com',
        password: '654321',
        cPassword: '654321',
        gender: 'female',
        phone: 123456789
      }, two: {
        fname: 'xyz',
        lname: 'abc..',
        email: 'abc@xyz.com',
        password: '654321',
        cPassword: '654321',
        gender: 'female',
        phone: 123456789
      }, three: {
        fname: 'xyz',
        lname: 'abc',
        email: 'abcxyzcom',
        password: '654321',
        cPassword: '654321',
        gender: 'female',
        phone: 123456789
      }, four: {
        fname: 'xyz',
        lname: 'abc',
        email: 'abc@xyz.com',
        password: '654321',
        cPassword: '123456',
        gender: 'female',
        phone: 123456789
      }, five: {
        fname: 'xyz',
        lname: 'abc',
        email: 'abc@xyz.com',
        password: '654321',
        cPassword: '654321',
        gender: 'other',
        phone: 123456789
      }, six: {
        fname: 'xyz',
        lname: 'abc',
        email: 'abc@xyz.com',
        password: '654321',
        cPassword: '654321',
        gender: 'female',
        phone: 'abc'
      }
    },
    existingUser: {
      fname: 'xyz',
      lname: 'abc',
      email: 'abc@xyz.com',
      password: '654321',
      cPassword: '654321',
      gender: 'female',
      phone: 1234567890
    },
    nullUser: null
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
    nullUser:null,
    emptyEmail: {
      username: null,
      password: '123456'
    },
    emptyPass: {
      username: 'abc@xyz.com',
      password: ''
    }
  }
}

export default DummyUser;
