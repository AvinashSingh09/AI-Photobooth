require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');
const Person = require('./models/Email'); // Import the model

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json({ limit: '100mb' })); // To handle large base64 strings
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

app.get("/", (req, res) => {
  res.send("This is running");
});

// Endpoint to collect and save name and email
app.post('/save-person', async (req, res) => {
  const { name, email,number,company } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    // Save data to MongoDB
    const personData = new Person({ name, email,number,company });
    await personData.save();
    return res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      return res.status(409).json({ message: 'Email already exists' });
    }
    return res.status(500).json({ message: 'Error saving data', error });
  }
});

// Endpoint to send email with attachment
app.post('/send-email', (req, res) => {
  const { to, image } = req.body;

  if (!to || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create a buffer from the base64 string
  const imageBuffer = Buffer.from(image, 'base64');

  // Define the mail options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Your AI Avatar",
    text: "Hi, please find the attachment below",
    attachments: [
      {
        filename: 'image.png',
        content: imageBuffer,
        encoding: 'base64',
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email', error });
    } else {
      return res.status(200).json({ message: 'Email sent', info });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
