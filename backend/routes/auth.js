const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users'); // Ensure the path to your User model is correct
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      email,
      userName: username,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User created successfully', user });
    // Send email and verify prompt here
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const isVerified = user.isVerified;
    if(!isVerified) return res.status(400).json({ message: 'Please verify your email' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verfy email confirmation
// router.get('/confirmation/:token', async (req, res) => {
//   try {
//     const { token } = req.params;
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findByPk(decoded.id);
//     user.isVerified = true;
//     await user.save();
//     res.status(200).json({ message: 'Email confirmed, you can now sign in' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
