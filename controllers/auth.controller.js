const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(password)
  console.log(hashedPassword);

  const user = new User({ email, password: hashedPassword });
  try {
    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(400).send("Error registering user");
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("User not found");

  const match = await bcrypt.compare(password, user.password);
  console.log(password)
  console.log(user.password);
  if (match) {
    // Send success message without the token
    res.json({ message: "Login successful" });
  } else {
    res.status(400).send("Invalid credentials");
  }
};



module.exports = { register, login };
