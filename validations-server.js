export const alphaNumeric = (value) => {
  const reg1 = /^[a-z0-9]+$/i;
  const reg2 = /^[0-9]+$/i;
  if (reg1.test(value) && value.length !== 0) {
    if (reg2.test(value)) {
      return false;
    }
    return true;
  }
  return false;
};

export const onlyNumber = (value) => {
  const reg = /^[0-9]+$/;
  if (reg.test(value) && value.length != 0) {
    return true;
  }
  return false;
};

export const emailValidator = (value) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(value) && value.length != 0) {
    return true;
  }
  return false;
};

export const passMatch = (value1, value2) => {
  if (value1 === value2 && value1.length !== 0) {
    return true;
  }

  return false;
};
