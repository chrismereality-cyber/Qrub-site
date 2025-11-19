// test-email-gmail.js
const nodemailer = require("nodemailer");

// ✅ Configure Gmail transporter with App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "chrismereality@gmail.com",
    pass: "iquinugocebksqds" // your 16-character Gmail App Password
  }
});

// ✅ Define the email details
const mailOptions = {
  from: "chrismereality@gmail.com",
  to: "recipient@example.com", // change this to your actual recipient
  subject: "Test Email from Termux via Gmail",
  text: "Hello! This is a test email sent securely from Termux using Nodemailer and Gmail App Password."
};

// ✅ Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error("❌ Failed to send:", error);
  }
  console.log("✅ Email sent successfully:", info.response);
});
