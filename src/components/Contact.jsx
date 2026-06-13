import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="contact-centered">
          <div className="contact-info glass-panel contact-info-full">
            <h3 className="contact-card-title">Let's build something together</h3>
            <p className="contact-card-desc">
              Whether you are looking to hire a Software Engineer, need a pipeline built for your data pipelines, or want to collaborate on predictive machine learning projects, feel free to reach out. I'm always open to discussing tech opportunities!
            </p>

            <div className="info-list info-list-row">
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={18} />
                </div>
                <div className="info-details">
                  <span className="info-label">Email Me</span>
                  <a href="mailto:sibghamursaleen722@gmail.com" className="info-value">
                    sibghamursaleen722@gmail.com
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={18} />
                </div>
                <div className="info-details">
                  <span className="info-label">Location</span>
                  <span className="info-value">Sindh, Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
