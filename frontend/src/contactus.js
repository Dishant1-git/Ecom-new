import { useState } from 'react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    // Basic validation
    if (!name || !email || !mobile || !subject || !message) {
      alert("Please fill all fields properly.");
      return;
    }

    const data = { name, email, mobile, subject, message };

    try {
      const res = await fetch("https://ecom-new-2-6hu0.onrender.com/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await res.json();

      if (result.success) {
        alert("Your message has been sent successfully!");
        // Clear form fields
        setName('');
        setEmail('');
        setMobile('');
        setSubject('');
        setMessage('');
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <div className="breadcrumb-section">
        <div className="container">
          <h2>Contact Us</h2>
        </div>
      </div>

      <section className="contact-page section-b-space">
        <div className="container">
          <h3>Contact Us</h3>
          <div className="theme-card">
            <div className="theme-form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-box">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-box">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-box">
                    <label>Mobile No.</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mobile No."
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-box">
                    <label>Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-box">
                    <label>Message</label>
                    <textarea
                      className="form-control"
                      style={{ height: "120px" }}
                      placeholder="Your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <button
                    className="btn btn-solid w-auto"
                    style={{ marginTop: "20px" }}
                    onClick={handleSubmit}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
