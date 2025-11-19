import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_609tkso", "template_dasqjqw", form.current, "wxRymLhdUafoCTpG6")
      .then(
        () => {
          alert("✅ Message sent successfully!");
        },
        (error) => {
          alert("❌ Failed to send message: " + error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Contact Us</h2>
      <label>Name</label>
      <input type="text" name="user_name" required />
      <label>Email</label>
      <input type="email" name="user_email" required />
      <label>Message</label>
      <textarea name="message" rows="5" required />
      <button type="submit">Send</button>
    </form>
  );
}
