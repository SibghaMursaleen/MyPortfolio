import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowUpRight, Sparkles, Server } from 'lucide-react';
import profileImg from '../assets/profile.png';
import ThreeDInteractive from './ThreeDInteractive';
import './Hero.css';

export default function Hero() {
  const titles = ["Full-Stack Web Developer", "Data Scientist"];
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 1500;

  const [tiltStyle, setTiltStyle] = useState({});

  useEffect(() => {
    let timer;
    const currentFullText = titles[titleIndex];

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.substring(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Pause before deleting
        timer = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.substring(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const handleScrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const targetRect = target.getBoundingClientRect().top;
      const targetPosition = targetRect - bodyRect;
      const offsetPosition = targetPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseMoveTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = (x - centerX) / centerX; // -1 to 1
    const dy = (y - centerY) / centerY; // -1 to 1

    // Rotate max 12 degrees
    const rotateX = -dy * 12;
    const rotateY = dx * 12;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeaveTilt = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
  };

  return (
    <section id="home" className="hero-section">
      {/* Background decoration */}
      <div className="hero-bg-glow glow-1"></div>
      <div className="hero-bg-glow glow-2"></div>
      <div className="hero-grid-pattern"></div>

      <div className="container hero-container animate-slide-up">
        <div className="hero-content">
          <div className="hero-badge-container">
            <span className="hero-tag-badge">
              <Sparkles size={14} className="tag-icon" />
              Available for Opportunities
            </span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="highlight-text">Sibgha Mursaleen</span>
          </h1>

          <div className="hero-typewriter-container">
            <span className="typewriter-prefix">I am a </span>
            <span className="typewriter-text">
              {displayText}
              <span className="typewriter-cursor">|</span>
            </span>
          </div>

          <p className="hero-description">
            A Computer Systems Engineer dedicated to building responsive web architectures, crafting interactive 3D frontend layouts, and developing predictive machine learning systems. Bridging full-stack development, 3D design, and artificial intelligence to build premium web solutions.
          </p>

          <div className="hero-actions">
            <button onClick={() => handleScrollTo('#projects')} className="btn btn-primary">
              View Work <ArrowUpRight size={18} />
            </button>
            <button onClick={() => handleScrollTo('#contact')} className="btn btn-secondary">
              Let's Talk
            </button>
          </div>

          <div className="hero-socials">
            <a href="https://github.com/SibghaMursaleen" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
            <a href="https://www.linkedin.com/in/sibgha-mursaleen-4567aa253/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="mailto:sibghamursaleen722@gmail.com" className="social-icon-btn" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-3d-bg-wrapper">
            <ThreeDInteractive />
          </div>
          <div className="visual-card-wrapper animate-float">
            <div
              className="visual-card glass-panel profile-photo-panel"
              onMouseMove={handleMouseMoveTilt}
              onMouseLeave={handleMouseLeaveTilt}
              style={tiltStyle}
            >
              <div className="card-topbar">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
                <span className="window-title">profile.jpg</span>
              </div>
              <div className="profile-image-container">
                <img src={profileImg} alt="Sibgha Mursaleen" className="profile-image" />
              </div>
              <div className="card-floating-badge badge-se">
                <Sparkles size={14} /> Frontend & 3D
              </div>
              <div className="card-floating-badge badge-de">
                <Server size={14} /> Backend & DB
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
