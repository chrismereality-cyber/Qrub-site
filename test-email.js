// test-email.js
const emailjs = require('@emailjs/browser');

const SERVICE_ID = 'service_609tkso';
const TEMPLATE_ID = 'template_dasqjqw';
const PUBLIC_KEY = 'wxRymLhdUafoCTpG6';

// Example test data
const templateParams = {
    from_name: "Reality Chrisme",
    to_name: "QRUB Support",
    message: "Hello! This is a test from Termux.",
    reply_to: "chrismereality@gmail.com"
};

// Initialize EmailJS
emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
    .then((response) => {
        console.log("✅ Email sent successfully!", response.status, response.text);
    }, (err) => {
        console.error("❌ Failed to send email:", err);
    });
