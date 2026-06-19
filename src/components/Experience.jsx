import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, ChevronDown } from 'lucide-react';
import './Experience.css';

export default function Experience() {
  const experiences = [
    {
      role: "Backend AI Engineer - Intern",
      company: "FlyRank AI",
      duration: "July 2026 - Present",
      location: "Remote",
      description: [
        "Currently interning at FlyRank AI as an AI intern, focusing on Backend AI Engineering.",
        "Contributing to backend infrastructure development, API design, and integration of AI systems."
      ],
      skills: ["Backend AI Engineering", "Python", "API Development", "System Integration"]
    },
    {
      role: "FullStack Developer Intern",
      company: "DevelopersHub",
      duration: "Feb 2026 - Mar 2026",
      location: "Remote",
      description: [
        "Developed a full-stack e-commerce web application using React, Node.js, Express, and MongoDB Atlas, managing 50+ products with dynamic frontend–backend integration.",
        "Designed and implemented 10+ REST APIs, along with user authentication (JWT) and cart functionality, delivering a fully responsive and deployed application."
      ],
      skills: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "REST APIs", "JWT Authentication"]
    },
    {
      role: "AI/ML Intern",
      company: "Elevvo Pathways",
      duration: "Aug 2025",
      location: "Remote",
      description: [
        "Completed 4 machine learning projects using Python, Pandas, Matplotlib, and Scikit-learn, covering regression, classification, clustering, and time-series forecasting on real-world datasets (Kaggle).",
        "Built and evaluated models for student score prediction (R²: 0.87), loan approval (accuracy: 92%), forest cover classification (accuracy: 88%), and sales forecasting (MAPE: 7%), focusing on data preprocessing, feature engineering, model comparison, and performance metrics.",
        "Processed and analyzed datasets with up to 50,000 rows and 30 features, implementing efficient workflows that reduced training time by ~20%."
      ],
      skills: ["Python", "MySQL", "CRUD Operations", "Microsoft Copilot", "AI Chatbots", "Technical Presentation"]
    },
    {
      role: "IT Intern",
      company: "Engro Fertilizers Limited Daharki",
      duration: "July 2025 - Aug 2025",
      location: "On-site",
      description: [
        "Developed an Inventory Management System using Python and MySQL, managing over 5,000 product entries and implementing CRUD operations with optimized queries, improving data retrieval speed by ~30%.",
        "Explored enterprise AI and automation tools by documenting 10+ Microsoft Copilot use cases, building a basic AI chatbot using open-source models that handled ~100 simultaneous queries, and delivering 3 technical presentations on networking and IT systems."
      ],
      skills: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Machine Learning", "Data Preprocessing", "Feature Engineering"]
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Career Path</span>
          <h2 className="section-title">Work Experience</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="experience-timeline-container">
          <div className="timeline-line"></div>

          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={index}
                className={`timeline-item ${isExpanded ? 'active-item' : ''}`}
              >
                {/* Timeline dot */}
                <div className="timeline-dot-wrapper">
                  <div className="timeline-dot">
                    <Briefcase size={14} />
                  </div>
                </div>

                {/* Timeline Card */}
                <div
                  className="timeline-card glass-panel"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="card-header-exp">
                    <div className="role-company">
                      <h4 className="exp-role">{exp.role}</h4>
                      <span className="exp-company">{exp.company}</span>
                    </div>

                    <div className="meta-details">
                      <span className="exp-duration">
                        <Calendar size={12} /> {exp.duration}
                      </span>
                      <span className="exp-location">
                        <MapPin size={12} /> {exp.location}
                      </span>
                    </div>

                    <div className="expand-indicator">
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <div className={`card-body-exp ${isExpanded ? 'expanded' : 'collapsed'}`}>
                    <ul className="description-list">
                      {exp.description.map((desc, idx) => (
                        <li key={idx} className="description-item">{desc}</li>
                      ))}
                    </ul>

                    <div className="exp-skills-container">
                      {exp.skills.map((skill, idx) => (
                        <span key={idx} className="badge badge-exp">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
