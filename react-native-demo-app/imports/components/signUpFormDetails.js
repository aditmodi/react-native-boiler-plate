export const Form = [
  {
    name : 'First Name',
    minLength : 6,
    maxLength : 15,
    errorMessage : 'Name should be alphaNumeric',
    type : 'text',
    ref : 'fname'
  },{
    name : 'Last Name',
    minLength : 6,
    maxLength : 15,
    errorMessage : 'Name should be alphaNumeric',
    type : 'text',
    ref : 'lname'
  },{
    name : 'Email',
    minLength : 6,
    maxLength : 15,
    errorMessage : 'Email should be of the form abc@abc.abc',
    type : 'email',
    ref : 'email'
  },{
    name : 'Password',
    minLength : 6,
    maxLength : 15,
    errorMessage : 'Password should contain atleast an uppercase and a number',
    type : 'password',
    ref : 'password'
  },{
    name : 'Confirm Password',
    minLength : 6,
    maxLength : 15,
    errorMessage : 'Password does not match',
    type : 'password',
    ref : 'cPassword'
  },{
    name : 'Gender',
    type : 'gender',
    ref : 'gender'
  },{
    name : 'Phone',
    type : 'number',
    errorMessage : 'only numbers allowed',
    ref : 'phone'
  }
]
