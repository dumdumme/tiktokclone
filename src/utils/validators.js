const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = validEmail.test.bind(validEmail);

export const validateOneEmail = (value) => {
  let result = true;
  if (value === '') {
    result = {isValid: false, message: 'Enter email.'};
  } else if (value && validEmail.test(value)) {
    result = {isValid: true};
  } else {
    result = {isValid: false, message: 'Enter a valid email.'};
  }
  return result;
};
