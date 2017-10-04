exports.alphaNumeric = (value) => {
  const reg = /^[a-z0-9]+$/i;
  if (reg.test(value) && value.length !== 0) {
    return true;
  }
  return false;
};

exports.onlyNumber = (value) => {
  const reg = /^[0-9]+$/;
  if (reg.test(value) && value.length !== 0) {
    return true;
  }
  return false;
};

exports.email = (value) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(value) && value.length !== 0) {
    return true;
  }
  return false;
};

// export const passMatch = (value1, value2) => {
//   if(value1 === value2){
//     return true;
//   }
//   else{
//     return false;
//   }
// }
