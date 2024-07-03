const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors')

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json({ limit: '10mb' })); // To handle large base64 strings
app.use(cors())

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: 'pictureofevent360@gmail.com', // Your email address
    pass: 'sswiwutvdpzincka',  // Your email password or app-specific password
  },
});

// Endpoint to send email with attachment
app.post('/send-email', (req, res) => {
  const { to, base64Image } = req.body;

  if (!to || !base64Image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create a buffer from the base64 string
  const imageBuffer = Buffer.from(base64Image, 'base64');

  // Define the mail options
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: to,
    subject: "Your AI Avatar",
    text: "Hi, please find the attachement below",
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
