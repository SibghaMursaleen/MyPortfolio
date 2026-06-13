import React from 'react';
import { GraduationCap, Award, Calendar, CheckCircle, BookOpen } from 'lucide-react';
import './About.css';

export default function About() {
  const certifications = [
    { title: "Machine Learning Specialization", issuer: "Stanford University - Coursera", details: "Supervised & Unsupervised ML, Neural Networks, Advanced Decision Trees" },
    { title: "Flutter App Development", issuer: "Flutter Sukkur", details: "Cross-platform mobile apps, state management, API integration" },
    { title: "Data Analytics", issuer: "Leverify Quest", details: "Data wrangling, SQL, data modeling, storytelling with data" },
    { title: "GenAI App Development", issuer: "PEC, PakAngels, Aspire Pakistan", details: "Large Language Models, prompt tuning, generative agent flows" }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Introduction</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="about-grid">
          <div className="about-bio glass-panel">
            <h3 className="bio-title">My Journey</h3>
            <p className="bio-text">
              I am a <strong>Computer Systems Engineer</strong> graduate from Sukkur IBA University (June 2026). My academic foundation in hardware-software co-design, coupled with a deep interest in computing systems, has shaped my passion for building high-performance applications and data architectures.
            </p>
            <p className="bio-text">
              With hands-on experience in full-stack web platforms and machine learning research, I am actively building my career around <strong>Software Engineering</strong>, <strong>Data Engineering</strong>, and <strong>Data Science</strong>. I thrive at the intersection of developing structured application systems, building robust data ingestion pipelines, and translating raw data into intelligent, predictive systems.
            </p>
            <p className="bio-text">
              I love solving complex problems, optimizing code latency, and engineering systems that remain performant and scalable under load.
            </p>

            <div className="bio-stats">
              <div className="stat-card">
                <span className="stat-value">3.73</span>
                <span className="stat-label">CGPA</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">5+</span>
                <span className="stat-label">Internships & Roles</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">7+</span>
                <span className="stat-label">Core Projects</span>
              </div>
            </div>
          </div>

          <div className="about-education-wrapper">
            <h3 className="section-subheading">
              <GraduationCap size={22} className="subheading-icon" /> Education
            </h3>

            <div className="education-timeline">
              <div className="education-card glass-panel">
                <div className="edu-header">
                  <span className="edu-duration"><Calendar size={12} /> Sep 2022 - June 2026</span>
                  <span className="edu-grade">CGPA: 3.73/4.00</span>
                </div>
                <h4 className="edu-degree">Bachelor of Engineering</h4>
                <p className="edu-major">Computer Systems Engineering</p>
                <p className="edu-school">Sukkur IBA University</p>
              </div>

              <div className="education-card glass-panel">
                <div className="edu-header">
                  <span className="edu-duration"><Calendar size={12} /> July 2020 - May 2022</span>
                  <span className="edu-grade">Grade: A1</span>
                </div>
                <h4 className="edu-degree">Intermediate</h4>
                <p className="edu-major">Pre-Engineering</p>
                <p className="edu-school">Engro College Daharki</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="certifications-container">
          <h3 className="section-subheading text-center">
            <Award size={22} className="subheading-icon" /> Professional Certifications
          </h3>

          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="cert-card glass-panel">
                <div className="cert-icon-wrapper">
                  <BookOpen size={20} className="cert-icon" />
                </div>
                <div className="cert-content">
                  <h4 className="cert-title">{cert.title}</h4>
                  <span className="cert-issuer">{cert.issuer}</span>
                  <p className="cert-details">{cert.details}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="certifications-footer">
            <p className="cert-verification-text">
              Official credentials and digital certificates are verified and documented on my{" "}
              <a
                href="https://www.linkedin.com/in/sibgha-mursaleen-4567aa253/"
                target="_blank"
                rel="noopener noreferrer"
                className="cert-linkedin-link"
              >
                LinkedIn Profile
              </a>.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
