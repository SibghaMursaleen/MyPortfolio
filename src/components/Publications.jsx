import React from 'react';
import { ExternalLink, Award } from 'lucide-react';
import iCometLogo from '../assets/icomet logo.png';
import './Publications.css';

export default function Publications() {
  const paper = {
    title: "Evaluating Deep Learning Models for Prohibited Item Detection in Airport X-ray Image",
    authors: [
      { name: "Sibgha Mursaleen", linkedin: "https://www.linkedin.com/in/sibgha-mursaleen-4567aa253/" },
      { name: "Muhammad Usman Sarwar", linkedin: "https://www.linkedin.com/in/muhammad-usman-sarwar-018535253/" },
      { name: "Muhammad Ahsan Kareem", linkedin: "https://www.linkedin.com/in/muhammad-ahsan-kareem-mughal-94aa59302/" },
      { name: "Soyam Kapoor", linkedin: "https://www.linkedin.com/in/soyamkapoor/" },
      { name: "et al.", linkedin: null }
    ],
    venue: "iCoMET 2026 - International Conference on Computing, Mathematics and Engineering Technologies",
    date: "February 2026",
    abstract: "This research addresses security screening challenges by systematically evaluating advanced deep learning architectures for object detection on complex X-ray luggage scans. The study focuses on model comparison under varying occlusion levels, class imbalances, and preprocessing techniques to identify optimal setups for real-world automated airport security checkpoints.",
    contribution: "Implemented and compared deep learning object detection models; analyzed performance metrics like mAP, precision-recall curves, and inference speed under tight hardware constraints; evaluated preprocessing filters to enhance low-contrast prohibited item details in multi-energy X-ray images.",
    link: null // Will be updated when published
  };

  return (
    <section id="publications" className="publications-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Academic Contributions</span>
          <h2 className="section-title">Publications & Research</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="publication-card-wrapper">
          <div className="publication-card glass-panel blueprint-grid">

            <div className="paper-icon-side">
              <div className="paper-doc-icon">
                <img src={iCometLogo} alt="iCoMET 2026 Conference Logo" className="paper-conf-logo" />
              </div>
            </div>

            <div className="paper-info-side">
              <div className="paper-card-top">
                <span className="paper-venue">{paper.venue}</span>
                <div className="paper-status-badge">
                  <Award size={14} className="award-icon" />
                  <span>Published & Presented</span>
                </div>
              </div>
              <h3 className="paper-title">{paper.title}</h3>
              <div className="paper-authors-list">
                <span className="paper-authors-label">Authors: </span>
                {paper.authors.map((author, idx) => (
                  <span key={idx}>
                    {author.linkedin ? (
                      <a
                        href={author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="paper-author-link"
                        title={`View ${author.name}'s LinkedIn Profile`}
                      >
                        {author.name}
                      </a>
                    ) : (
                      <span className="paper-author-plain">{author.name}</span>
                    )}
                    {idx < paper.authors.length - 1 && <span className="paper-author-sep">, </span>}
                  </span>
                ))}
              </div>

              <div className="paper-section">
                <h4 className="paper-section-title">Abstract</h4>
                <p className="paper-text">{paper.abstract}</p>
              </div>

              <div className="paper-section">
                <h4 className="paper-section-title">Key Contributions</h4>
                <p className="paper-text">{paper.contribution}</p>
              </div>

              <div className="paper-actions">
                <button
                  className="btn btn-primary btn-sm-paper disabled-btn"
                  disabled
                  title="Publication link will be available soon"
                >
                  Link Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
