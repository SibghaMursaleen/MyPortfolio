import React from 'react';
import { Sparkles, BrainCircuit } from 'lucide-react';
import './Skills.css';

export default function Skills() {
  const skillCategories = [
    {
      title: "Full-Stack Web & 3D Development",
      icon: <Sparkles size={22} />,
      colorClass: "skills-se",
      description: "Crafting interactive 3D interfaces, high-performance APIs, robust databases, and responsive web applications.",
      skills: [
        { name: "React.js & JavaScript", level: 90 },
        { name: "Three.js & React Three Fiber", level: 85 },
        { name: "WebGL & GSAP Animations", level: 86 },
        { name: "HTML5, CSS3 & Tailwind", level: 92 },
        { name: "Node.js & Express.js", level: 85 },
        { name: "ASP.NET Core & C#", level: 80 },
        { name: "REST APIs & JWT Auth", level: 90 },
        { name: "SQL & NoSQL Databases", level: 87 },
        { name: "Flutter & Mobile Dev", level: 75 },
        { name: "Git & Version Control", level: 90 }
      ]
    },
    {
      title: "Data Science & AI",
      icon: <BrainCircuit size={22} />,
      colorClass: "skills-ds",
      description: "Building deep learning architectures, dataset pipelines, computer vision systems, and Generative AI workflows.",
      skills: [
        { name: "Python, NumPy & Pandas", level: 92 },
        { name: "Scikit-Learn & ML Modeling", level: 88 },
        { name: "PyTorch & Deep Learning", level: 80 },
        { name: "OpenCV & Computer Vision", level: 85 },
        { name: "Generative AI & Agentic Flows", level: 82 },
        { name: "Data Preprocessing & Analytics", level: 90 },
        { name: "Feature Engineering", level: 85 }
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
