require("dotenv").config();
const nodemailer = require("nodemailer");

// ✅ Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// ✅ Define email details
const mailOptions = {
  from: `"Quantum Resistant Unlimited Bank" <${process.env.GMAIL_USER}>`,
  to: "recipient@example.com", // 👉 replace this
  subject: "🔒 Welcome to Quantum Resistant Unlimited Bank",
  html: `
    <div style="font-family: Arial, sans-serif; background: #f5f8fa; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #0078ff, #00c3ff); padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Bank_icon.svg" width="80" alt="Bank Logo" />
          <h1 style="color: white; margin-top: 10px;">Quantum Resistant Unlimited Bank</h1>
        </div>

        <div style="padding: 25px; color: #333;">
          <p>Dear Valued Client,</p>
          <p>Welcome to <strong>Quantum Resistant Unlimited Bank (QRUB)</strong> — your gateway to the future of secure, quantum-proof financial transactions.</p>
          
          <p>We’re honored to have you with us. With QRUB, your data and assets are protected by next-generation encryption, ensuring complete safety and transparency.</p>

          <div style="margin: 20px 0; text-align: center;">
            <a href="https://qrub.com/login" style="background: #0078ff; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Access Your Dashboard
            </a>
          </div>

          <p>If you did not initiate this registration, please ignore this message or contact support.</p>

          <p style="margin-top: 30px;">With gratitude,<br><strong>Team QRUB</strong><br><em>The Future of Secure Banking</em></p>
        </div>

        <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777; border-radius: 0 0 12px 12px;">
          © 2025 Quantum Resistant Unlimited Bank. All rights reserved.<br>
          <a href="https://qrub.com/privacy" style="color: #0078ff;">Privacy Policy</a> • <a href="https://qrub.com/support" style="color: #0078ff;">Support</a>
        </div>
      </div>
    </div>
  `
};

// ✅ Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) return console.error("❌ Failed to send:", error);
  console.log("✅ HTML email sent successfully:", info.response);
});
