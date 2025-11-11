import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App" style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f8fb", minHeight: "100vh", color: "#0a2239" }}>
      <header style={{ backgroundColor: "#0a2239", color: "white", padding: "20px" }}>
        <h1>Quantum Resistant Unlimited Bank (QRUB)</h1>
        <p style={{ fontSize: "18px", marginTop: "8px" }}>The Future of Secure, Limitless Banking</p>
      </header>

      <main style={{ padding: "30px" }}>
        <section style={{ marginBottom: "40px" }}>
          <h2>🌐 Our Mission</h2>
          <p>
            At QRUB, we are pioneering a new era of financial security through quantum-resistant encryption. 
            Our mission is to empower individuals and organizations with a banking experience that is private, 
            global, and future-proof.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2>🔒 Quantum-Resistant Security</h2>
          <p>
            Traditional cryptography will not survive the quantum revolution — but QRUB will. 
            We use advanced post-quantum encryption to ensure that your assets, transactions, 
            and identity remain secure, even in the quantum age.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2>💸 Services</h2>
          <ul>
            <li>Secure Digital Accounts</li>
            <li>Instant International Transfers</li>
            <li>Multi-Currency Quantum Wallets</li>
            <li>Quantum Identity Verification</li>
          </ul>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2>📞 Contact Us</h2>
          <p>Email: <a href="mailto:support@qrubbank.com">support@qrubbank.com</a></p>
          <p>Website: <a href="https://qrub.vercel.app" target="_blank" rel="noreferrer">qrub.vercel.app</a></p>
        </section>
      </main>

      <footer style={{ backgroundColor: "#0a2239", color: "white", padding: "15px", marginTop: "40px" }}>
        <p>© {new Date().getFullYear()} Quantum Resistant Unlimited Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
