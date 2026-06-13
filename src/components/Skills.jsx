import React from 'react';
import { Code, Database, BrainCircuit, Terminal } from 'lucide-react';
import './Skills.css';

export default function Skills() {
  const skillCategories = [
    {
      title: "Software Engineering",
      icon: <Code size={22} />,
      colorClass: "skills-se",
      description: "Building robust, responsive application architectures and interactive user interfaces.",
      skills: [
        { name: "React.js & JavaScript", level: 90 },
        { name: "Node.js & Express.js", level: 85 },
        { name: "ASP.NET Core MVC & C#", level: 80 },
        { name: "Flutter & Mobile Dev", level: 75 },
        { name: "Java & Java Swing", level: 85 },
        { name: "REST APIs & JWT Auth", level: 90 },
        { name: "HTML5 & CSS3 / Tailwind", level: 92 }
      ]
    },
    {
      title: "Data Engineering",
      icon: <Database size={22} />,
      colorClass: "skills-de",
      description: "Structuring schema models, pipeline operations, and optimizing query retrieval execution.",
      skills: [
        { name: "SQL & MySQL Database", level: 88 },
        { name: "MongoDB & Atlas Integration", level: 85 },
        { name: "Database Schema Design", level: 85 },
        { name: "Query Optimization", level: 80 },
        { name: "ETL & Data Ingestion", level: 78 },
        { name: "Python Scripting", level: 90 },
        { name: "CRUD API Engineering", level: 88 },
        { name: "Git & Version Control", level: 90 }
      ]
    },
    {
      title: "Data Science & ML",
      icon: <BrainCircuit size={22} />,
      colorClass: "skills-ds",
      description: "Developing models, feature engineering, computer vision tracking, and dataset analytics.",
      skills: [
        { name: "Python, NumPy & Pandas", level: 92 },
        { name: "Scikit-Learn & Modeling", level: 88 },
        { name: "PyTorch & Deep Learning", level: 80 },
        { name: "OpenCV & MediaPipe", level: 85 },
        { name: "TensorFlow & Keras", level: 75 },
        { name: "Data Preprocessing", level: 90 },
        { name: "Feature Engineering", level: 85 },
        { name: "LLM Prompt Tuning", level: 80 }
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Technical Stack</span>
          <h2 className="section-title">Core Skills</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="skills-grid-container">
          {skillCategories.map((category, index) => (
            <div key={index} className={`skills-card glass-panel ${category.colorClass}`}>
              <div className="skills-card-header">
                <div className="skills-icon-box">
                  {category.icon}
                </div>
                <h3 className="skills-cat-title">{category.title}</h3>
              </div>
              <p className="skills-cat-desc">{category.description}</p>

              <div className="skills-list">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-meta">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-progress-bg">
                      <div
                        className="skill-progress-bar"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
