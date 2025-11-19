// test-email-node.js
const nodemailer = require('nodemailer');

// Use your SMTP credentials
let transporter = nodemailer.createTransport({
    host: "smtp.emailjs.com",       // EmailJS SMTP host
    port: 587,
    secure: false,
    auth: {
        user: "YOUR_SMTP_USER",    // EmailJS SMTP username
        pass: "YOUR_SMTP_PASS"     // EmailJS SMTP password
    }
});

let mailOptions = {
    from: '"Reality Chrisme" <chrismereality@gmail.com>',
    to: "support@qrubbank.com",
    subject: "QRUB Node Email Test",
    text: "Hello! This is a test from Termux Node using Nodemailer."
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.error("❌ Failed to send email:", error);
    }
    console.log("✅ Email sent successfully!", info.response);
});
