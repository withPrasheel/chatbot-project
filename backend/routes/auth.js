const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const router = express.Router();
const html = `
      <h1>Welcome to our Care Chat</h1>
      <h2>Verify your email</h2>
      <p>Click <a href="http://localhost:3000/confirmation//token">here</a> to verify your email</p>
    `;
const transporter = nodeMailer.createTransport({
  service: 'gmail',
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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

    const info = await transporter.sendMail({
      from: {
        name: 'Care Chat',
        address: process.env.EMAIL
      },
      to: email,
      subject: 'Email verification',
      text: 'Please verify your email',
      html: html
    });
    console.log('Message sent: %s', info.messageId);
    res.status(201).json({ message: 'Email verification sent', user });
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
    if (!isVerified) return res.status(400).json({ message: 'Please verify your email' });

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
