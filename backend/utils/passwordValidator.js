const passwordValidator = require('password-validator');
const validator = require('validator');

const schema = new passwordValidator();

schema
  .is().min(8)
  .has().uppercase() 
  .has().lowercase() 
  .has().digits(1)
 

const validateStrongPassword = function(password) {
  const isValidPassword = schema.validate(password);
  console.log(isValidPassword)
  if (!isValidPassword) {
    return false;
  }

  if (validator.contains(password, '123')) {
    return false;
  }

  return true;
};

module.exports = validateStrongPassword;
