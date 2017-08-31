export const alphaNumeric = (value) => {
  var reg = /^[a-z0-9]+$/i;
  if(reg.test(value) && value.length != 0){
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

export const email = (value) => {
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(reg.test(value) && value.length != 0){
    return true;
  }else {
    return false
  }
}

export const passMatch = (value1, value2) => {
  if(value1 === value2){
    return true;
  }
  else{
    return false;
  }
}
