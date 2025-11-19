// test-email-http.js — Send email via EmailJS HTTP API
// Node 18+ has built-in fetch. If you're using older Node, install node-fetch.

const SERVICE_ID = 'service_609tkso';
const TEMPLATE_ID = 'template_dasqjqw';
const PUBLIC_KEY = 'wxRymLhdUafoCTpG6';

const templateParams = {
  user_name: "Reality Chrisme",
  user_email: "chrismereality@gmail.com",
  message: "Hello! This is a test from Termux Node using EmailJS HTTP API."
};

async function sendEmail() {
  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: templateParams
      })
    });

    const text = await response.text();
    if (response.ok) {
      console.log("✅ Email sent successfully!");
    } else {
      console.error("❌ Failed:", response.status, text);
    }
  } catch (error) {
    console.error("❌ Network or fetch error:", error);
  }
}

sendEmail();
