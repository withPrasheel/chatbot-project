// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const User = require('../models/User');
// require('dotenv').config();

// const router = express.Router();

// // Email setup
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// router.post('/signup', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ email, password: hashedPassword });

//     // Send confirmation email
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     const url = `http://localhost:3000/confirmation/${token}`;
//     await transporter.sendMail({
//       to: user.email,
//       subject: 'Confirm Email',
//       html: `<p>Please confirm your email by clicking <a href="${url}">here</a>.</p>`,
//     });

//     res.status(201).json({ message: 'User created, please check your email to confirm' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post('/signin', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

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

// module.exports = router;
