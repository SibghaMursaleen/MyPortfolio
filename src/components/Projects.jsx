import React, { useState } from 'react';
import { ExternalLink, Code, Eye, X, Check } from 'lucide-react';
import './Projects.css';

export default function Projects() {

  const projects = [
    {
      title: "FYP - Automatic Offline Smart Wheelchair (MobilityX)",
      category: "Computer Hardware / ML",
      description: "A hardware-based smart wheelchair featuring a local Voice Processing Module and a companion mobile app for real-time offline control.",
      metric: "95%+ Accuracy | <200ms Latency",
      github: "https://github.com/SibghaMursaleen/FYP_MobilityX_MobileAPP",
      demo: "#",
      hardwareDeployment: "Sukkur IBA University",
      stack: ["Arduino IDE", "Python", "Deep Learning", "Signal Processing", "Speech Recognition", "Mobile App"],
      details: "This hardware-software co-design features an offline voice recognition engine running on local hardware, paired with a custom mobile application for control and monitoring. The system translates voice commands into directional controls with extreme latency efficiency (<200 ms) and robust noise-filtering, ensuring safety and accessibility."
    },
    {
      title: "SIBA Complaint Management System",
      category: "Software Engineering",
      description: "ASP.NET Core MVC workflow coordinator for managing departmental issues with real-time thread-based resolution feeds.",
      metric: "-25% Issue Resolution Time | 5+ Depts",
      github: "https://github.com/SibghaMursaleen/complaint-management-system-aspnet",
      demo: "#",
      stack: ["ASP.NET Core MVC", "C#", "MySQL", "Entity Framework", "Bootstrap"],
      details: "A comprehensive university workflow manager. Implements an immutable 'Resolution Proof' system to verify complaint completions, and leverages real-time thread communication to connect students with admins."
    },
    {
      title: "Full-Stack E-Commerce Platform",
      category: "Software Engineering",
      description: "Built a responsive e-commerce web application with fully customized API endpoints, cart controls, and secure user sessions.",
      metric: "10+ REST APIs | 50+ Products",
      github: "https://github.com/SibghaMursaleen/ecommerce-fullstack-design",
      demo: "#",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "JWT Auth", "CSS3"],
      details: "A complete MERN stack application featuring responsive product grids, user authentication with JSON Web Tokens, state-managed shopping cart, checkout pathways, and dashboard for product catalogs."
    },
    {
      title: "WeatherInsight AI Weather Suite",
      category: "Software Engineering",
      description: "Responsive weather reporting dashboard integrating historical rainfall trend visualizations and AI clothing advisor engines.",
      metric: "+30% Recommendation Relevance",
      github: "https://github.com/SibghaMursaleen/WeatherInsight-Modern-Weather-Dashboard-Web-App",
      demo: "#",
      stack: ["JavaScript", "OpenWeatherMap API", "Chart.js", "AI Advisor", "Responsive Layout"],
      details: "Pulls weather variables from public APIs, channels them into a rule-based AI engine to generate contextual recommendations, and uses Chart.js to map rainfall charts. Implements optimized caching."
    },
    {
      title: "Gesture-Controlled Filter App",
      category: "Data Science / ML",
      description: "Real-time computer vision utility utilizing MediaPipe hand tracking to trigger dynamic cinematic overlays.",
      metric: "98% Detection Accuracy | 6+ Effects",
      github: "https://github.com/SibghaMursaleen/Gesture_Filter_App",
      demo: "#",
      stack: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "Landmark Analysis"],
      details: "Tracks 21 hand landmarks at high FPS. Employs coordinate analysis to detect specific hand gestures and triggers interactive video overlays, like camera flash, neon glows, and photo filters, on live video streams."
    },
    {
      title: "AI-Mini Copilot ChatBot",
      category: "Data Science / ML",
      description: "Context-aware conversational LLM assistant featuring advanced prompt engineering and local context management.",
      metric: "+25% Response Relevance | 50+ Queries",
      github: "https://github.com/SibghaMursaleen/AI_Mini_Copilot",
      demo: "#",
      stack: ["Python", "Hugging Face", "LLMs", "Prompt Engineering", "NLP"],
      details: "Built a localized AI chat assistant with prompt-tuning workflows. Features custom context management that feeds system instructions and chat history to the model dynamically, resulting in high accuracy."
    }
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Selected Work</span>
          <h2 className="section-title">Projects Showcase</h2>
          <div className="section-title-underline"></div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card glass-panel"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-card-header">
                <span className="project-cat-badge">{project.category}</span>
                <span className="project-metric-badge">{project.metric.split('|')[0]}</span>
              </div>

              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-desc">{project.description}</p>

              <div className="project-card-stack">
                {project.stack.slice(0, 3).map((s, idx) => (
                  <span key={idx} className="badge badge-stack">{s}</span>
                ))}
                {project.stack.length > 3 && (
                  <span className="badge badge-stack-more">+{project.stack.length - 3} more</span>
                )}
              </div>

              <div className="project-card-footer">
                <span className="view-details-link">
                  View Case Study <Eye size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Callout */}
        <div className="more-projects-cta">
          <p className="cta-text">
            For more projects, visit my{" "}
            <a
              href="https://github.com/SibghaMursaleen"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
            >
              GitHub Account
            </a>
          </p>
        </div>

        {/* Project Case Study Modal */}
        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedProject(null)} aria-label="Close modal">
                <X size={20} />
              </button>

              <div className="modal-scroll-container">
                <div className="modal-header">
                  <span className="modal-cat-tag">{selectedProject.category}</span>
                  <h3 className="modal-project-title">{selectedProject.title}</h3>
                  <div className="modal-metric-box">
                    <Check size={14} className="metric-check-icon" />
                    <span>{selectedProject.metric}</span>
                  </div>
                </div>

                <div className="modal-body">
                  <div className="modal-description-section">
                    <h4 className="modal-subheading">Project Overview</h4>
                    <p className="modal-long-desc">{selectedProject.details}</p>
                  </div>

                  {selectedProject.hardwareDeployment && (
                    <div className="modal-hardware-callout glass-panel">
                      <span className="callout-icon">📍</span>
                      <p className="callout-text">
                        <strong>Hardware Prototype:</strong> This is a hardware project, and the physical setup can be viewed and demonstrated at <strong>{selectedProject.hardwareDeployment}</strong>.
                      </p>
                    </div>
                  )}

                  <div className="modal-stack-section">
                    <h4 className="modal-subheading">Tech Stack & Tools</h4>
                    <div className="modal-stack-tags">
                      {selectedProject.stack.map((s, idx) => (
                        <span key={idx} className="badge badge-modal-stack">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-modal-link"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> View Source Code
                  </a>
                  {selectedProject.appLink && (
                    <a
                      href={selectedProject.appLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-modal-link"
                    >
                      <ExternalLink size={18} /> View Mobile App
                    </a>
                  )}
                  {selectedProject.demo !== "#" && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-modal-link"
                    >
                      <ExternalLink size={18} /> Live Demonstration
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
