export const alphaNumeric = (value) => {
  var reg1 = /^[a-z0-9]+$/i;
  var reg2 = /^[0-9]+$/i;
  if(reg1.test(value) && value.length !== 0){
    if (reg2.test(value)) {
      return false
    }
    return true
  }else {
    return false
  }
}

export const onlyNumber = (value) => {
  var reg = /^[0-9]+$/;
  if(reg.test(value) && value.length != 0){
    return true;
  }else {
    return false
  }
}

export const emailValidator = (value) => {
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(reg.test(value) && value.length != 0){
    return true;
  }else {
    return false
  }
}

export const passMatch = (value1, value2) => {
  if(value1 === value2 && value1.length !== 0){
    return true;
  }
  else{
    return false;
  }
}
