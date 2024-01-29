const express = require('express')

const userRouter = express.Router();
const {handleSignup, handleLogin, handleGetUserDetails} = require('../controllers/user.js')



userRouter.post("/signup",handleSignup)

userRouter.post("/login", handleLogin)

userRouter.post("/get-userDetails", handleGetUserDetails)

module.exports = userRouter