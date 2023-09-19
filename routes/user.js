const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

if (!password) {
    return res.status(400).send('Password is required.');
}

   // hash password 
   const hashedPassword = await bcrypt.hash(password, 10);
     // Create a new user document with the hashed password


    const user = new User({ 
        username,
         password: hashedPassword,
          email ,});

          await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find the user by username

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

   // Compare the provided password with the stored hashed password

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return res.status(200).json({ message: 'Login successful' });
    }
    res.status(401).json({ error: 'Authentication failed' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
