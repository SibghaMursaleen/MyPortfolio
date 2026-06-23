import React, { useState } from 'react';
import { Heart, Calendar, MapPin, ChevronRight, ChevronDown } from 'lucide-react';
import './Volunteering.css';

export default function Volunteering() {
  const volunteering = [
    {
      role: "Head of Testing Team & Backend Team Member",
      organisation: "VitaNova International Alliance for Sciences",
      duration: "Jun 2026 - Present",
      location: "Daharki, Pakistan (Remote)",
      description: [
        "Leading the website testing team by planning and executing quality assurance activities, identifying bugs, and ensuring a seamless user experience.",
        "Contributing to backend development by implementing server-side functionality, managing databases, developing APIs, and supporting core website features.",
        "Collaborating with developers and stakeholders to ensure the website is reliable, secure, and performs efficiently."
      ],
      skills: ["Back-End Web Development", "Website Testing", "API Development", "Team Collaboration"]
    },
    {
      role: "Digital Platforms Coordinator",
      organisation: "VitaNova International Alliance for Sciences",
      duration: "Feb 2026 - Present",
      location: "Remote",
      description: [
        "Coordinated and managed web-based projects and digital platforms, ensuring seamless operations, platform reliability, and an enhanced digital experience for users across organisational systems.",
        "Collaborated with cross-functional teams to optimise digital workflows, support platform improvements, and drive operational efficiency through effective technology and project coordination."
      ],
      skills: ["Digital Workflows", "Project Coordination", "Web Platforms", "Systems Management"]
    },
    {
      role: "Outreach Partner",
      organisation: "Skills4U & Pakistan Career Fair",
      duration: "Sep 2025 - Oct 2025",
      location: "Hybrid",
      description: [
        "Promoted the conference, engaged the AI community, coordinated between organisers and participants, and contributed to discussions on emerging AI trends and societal impact."
      ],
      skills: ["Community Engagement", "Public Relations", "AI Coordination"]
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section id="volunteering" className="volunteering-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Giving Back</span>
          <h2 className="section-title">Volunteering</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="vol-timeline-container">
          <div className="vol-timeline-line"></div>

          {volunteering.map((vol, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={index}
                className={`vol-timeline-item ${isExpanded ? 'vol-active-item' : ''}`}
              >
                {/* Timeline dot */}
                <div className="vol-dot-wrapper">
                  <div className="vol-dot">
                    <Heart size={14} />
                  </div>
                </div>

                {/* Card */}
                <div
                  className="vol-card glass-panel blueprint-grid"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="vol-card-header">
                    <div className="vol-role-org">
                      <h4 className="vol-role">{vol.role}</h4>
                      <span className="vol-organisation">{vol.organisation}</span>
                    </div>

                    <div className="vol-meta">
                      <span className="vol-duration">
                        <Calendar size={12} /> {vol.duration}
                      </span>
                      <span className="vol-location">
                        <MapPin size={12} /> {vol.location}
                      </span>
                    </div>

                    <div className="vol-expand-indicator">
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <div className={`vol-card-body ${isExpanded ? 'expanded' : 'collapsed'}`}>
                    <ul className="description-list">
                      {vol.description.map((desc, idx) => (
                        <li key={idx} className="description-item">{desc}</li>
                      ))}
                    </ul>

                    <div className="exp-skills-container">
                      {vol.skills.map((skill, idx) => (
                        <span key={idx} className="badge badge-vol">{skill}</span>
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
