const mongoose = require('mongoose');
const validator = require('validator');
const validateStrongPassword = require('../utils/passwordValidator');
const {createHmac, randomBytes} = require('crypto')
const {createJwtToken} = require("../utils/jwt")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); 
      },
      message: props => `${props.value} is not a valid phone number! Please enter a 10-digit number.`
    }
  },
  salt:{
    type:String,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: validateStrongPassword,
      message: 'Password should be strong'
    }
  }
});

userSchema.static("matchPassword", async function(email,password){
    const user = await this.findOne({email})

    if (!user)  return 0
    const salt = user.salt
    const providedPassword = createHmac("sha256", salt).update(password).digest("hex")
    console.log(providedPassword, user.password)
    if(!(providedPassword===user.password)) return 0
    const token = await createJwtToken(user)
    return token
    
  })


userSchema.pre("save", function(next){
    const user = this
    if(!user.isModified("password")) return 
    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')
    this.salt = salt
    this.password= hashedPassword
    next()
  })
  
const User = mongoose.model('User', userSchema);

module.exports = User;
