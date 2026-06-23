import React, { useState, useEffect } from 'react';
import { Mail, ArrowUpRight, Sparkles } from 'lucide-react';
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

  useEffect(() => {
    let timer;
    const currentFullText = titles[titleIndex];

    if (!isDeleting) {
      if (displayText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.substring(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
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

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container animate-slide-up">

        {/* Top Header Block: Avatar, Name & Monospace Tagline */}
        <div className="hero-top-block">
          <div className="hero-profile-header">
            <div className="hero-avatar-box">
              <img src={profileImg} alt="Sibgha Mursaleen" className="hero-avatar" />
            </div>
            <div className="hero-title-box">
              <div className="hero-prefix-container">
                <span className="hero-prefix-text">I'M</span>
                <span className="availability-dot-live">● available now</span>
              </div>
              <h1 className="hero-name-heading">SIBGHA<br />MURSALEEN</h1>
            </div>
          </div>
          <div className="hero-tagline-box">
            <div className="hero-typewriter-container">
              <span className="typewriter-prefix">I am a {" "}</span>
              <span className="typewriter-text">
                {displayText}
                <span className="typewriter-cursor">|</span>
              </span>
            </div>
            <p className="hero-bio-short">
              A Computer Systems Engineer (IBA Sukkur Graduate) specializing in building responsive web architectures, crafting interactive 3D frontend layouts, and developing predictive machine learning systems.
            </p>
          </div>
        </div>

        {/* Bottom Showcase Grid: 3D Sphere Panel & Stats/Actions Panel */}
        <div className="hero-grid-showcase">

          {/* Main 3D Node Sphere Blueprint Card */}
          <div className="hero-showcase-panel glass-panel blueprint-grid">
            <div className="panel-header-bar">
              <span className="panel-tag">// FEATURED VISUALIZATION</span>
              <h3 className="panel-title">3D INTERACTIVE NODE SPHERE</h3>
            </div>
            <div className="panel-3d-body">
              <ThreeDInteractive />
            </div>
          </div>

          {/* Side Info & Actions Panel */}
          <div className="hero-side-column">

            {/* Quick Stats Panel */}
            <div className="side-card glass-panel stats-panel">
              <span className="panel-tag">// METRICS</span>
              <h3 className="panel-title-sm">KEY STATS</h3>
              <div className="quick-stats-grid">
                <div className="quick-stat-item">
                  <span className="quick-stat-val">3.73</span>
                  <span className="quick-stat-lbl">CGPA</span>
                </div>
                <div className="quick-stat-item">
                  <span className="quick-stat-val">4</span>
                  <span className="quick-stat-lbl">INTERNSHIPS</span>
                </div>
                <div className="quick-stat-item">
                  <span className="quick-stat-val">10+</span>
                  <span className="quick-stat-lbl">PROJECTS</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="side-card glass-panel actions-panel">
              <span className="panel-tag">// DIRECT CALLS</span>
              <h3 className="panel-title-sm">CONTACT & WORK</h3>

              <div className="side-buttons-stack">
                <button onClick={() => handleScrollTo('#projects')} className="btn btn-primary btn-full">
                  Explore Projects <ArrowUpRight size={16} />
                </button>
                <button onClick={() => handleScrollTo('#contact')} className="btn btn-secondary btn-full">
                  Book a Call
                </button>
              </div>

              <div className="side-socials-row">
                <a href="https://github.com/SibghaMursaleen" target="_blank" rel="noopener noreferrer" className="side-social-icon" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                </a>
                <a href="https://www.linkedin.com/in/sibgha-mursaleen-4567aa253/" target="_blank" rel="noopener noreferrer" className="side-social-icon" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="mailto:sibghamursaleen722@gmail.com" className="side-social-icon" aria-label="Email">
                  <Mail size={18} />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
