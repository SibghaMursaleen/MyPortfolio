import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Volunteering from './components/Volunteering';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate Scroll Progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Show back-to-top button
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="app-root">
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress-bar-global" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <Navbar />
      
      <main className="main-content-layout">
        <Hero />
        <About />
        <Experience />
        <Volunteering />
        <Skills />
        <Projects />
        <Publications />
        <Contact />
      </main>

      <Footer />

      {/* Back to top button */}
      <button 
        className={`back-to-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}
