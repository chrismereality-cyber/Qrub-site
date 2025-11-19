require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: "recipient@example.com", // 👉 replace this with your target email
  subject: "Secure Email Test from Termux",
  text: "This email was sent using Nodemailer with hidden Gmail credentials via .env!"
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) return console.error("❌ Failed to send:", error);
  console.log("✅ Sent successfully:", info.response);
});
