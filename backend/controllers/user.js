const User = require("../models/user");
const mongoose = require('mongoose');

//handler function for the signup
const handleSignup = async (req, res) => {
  const { name, email, number, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ mssg: "User with that email already registered" });
    }

    const newUser = new User({
      name: name,
      email: email,
      number: number,
      password: password,
    });

    const result = await newUser.save();
    res.json({ message: "Document saved successfully", result });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Error occurred while saving the document" });
  }
};

//handler function for login
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("here")
  console.log(email,password)
  try {
    const token =await User.matchPassword(email, password);
    if(!token) res.status(400).json({mssg:"invalid credentials"})
    else res.json({ token:token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ mssg: "erro occured while signing in" });
  }
};






const handleGetUserDetails = async (req, res) => {
  try {
    const { user_id } = req.body;


    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      name: user.name 
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Server error' });
  }
};



module.exports = { handleSignup, handleLogin, handleGetUserDetails };
