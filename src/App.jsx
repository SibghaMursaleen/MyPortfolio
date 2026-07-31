import React, { useState, useEffect } from 'react';
import CaseStudy from './components/CaseStudy';

// Previous Projects Data
const caseStudies = [
  {
    id: 'scraper',
    title: 'Polite Web Scraper & RAG Corpus Builder',
    category: 'AI & Data Engineering',
    role: 'Backend Developer',
    date: 'July 2026',
    stack: ['Python', 'BeautifulSoup', 'SQLite', 'urllib.robotparser'],
    githubLink: 'https://github.com/SibghaMursaleen/Backend-AI-Internship-FlyRank/tree/main/week%205/Polite%20Web%20Scraper',
    overview: 'A production-ready data gathering program that crawls Wikipedia to compile a clean, structured corpus database of technical terms. It operates with strict respect for site crawler rules and server resources, acting as a respectful bot.',
    problem: 'Gathering a high-quality data corpus for Retrieval-Augmented Generation (RAG) models from third-party sites often leads to IP blocks or server strain if crawler etiquette is ignored. Scraping unstructured HTML also results in garbage formatting, bracketed citation numbers, and navigation elements cluttering the database.',
    solution: 'This program dynamically checks Wikipedia\'s robots.txt directives using python\'s built-in robotparser before pulling content. It features a custom user-agent with contact info, handles timeouts, respects rate limits, cleans text contents (removing footnotes like "[1]" and reference sidebars), and outputs a normalized SQLite database containing concepts and child subsections linked by foreign keys.',
    learnings: 'Developed deep expertise in standard web bot compliance guidelines, parsed robots.txt directives dynamically, wrote resilient sanitization scripts in BeautifulSoup, and transactional SQL data loaders.',
    codeSnippet: `import urllib.robotparser
from bs4 import BeautifulSoup
import requests

def scrape_wikipedia_politely(url, user_agent, crawl_delay=1.0):
    # Parse robots.txt
    rp = urllib.robotparser.RobotFileParser()
    rp.set_url("https://en.wikipedia.org/robots.txt")
    rp.read()
    
    if not rp.can_fetch(user_agent, url):
        print(f"Skipping disallowed URL: {url}")
        return None
        
    headers = {"User-Agent": user_agent}
    response = requests.get(url, headers=headers, timeout=10)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        # Filter and clean content (remove citation bracket nodes)
        for ref in soup.select('sup.reference'):
            ref.decompose()
            
        title = soup.find('h1', id='firstHeading').text
        introduction = soup.find('p').text`,
    decisions: [
      {
        title: 'Dynamic Robots.txt Engine',
        detail: 'Utilized urllib.robotparser to cache and evaluate robots.txt rules programmatically, enforcing strict user-agent checking and crawl-delay spacing.'
      },
      {
        title: 'BeautifulSoup Content Sanitization',
        detail: 'Wrote targeted selectors to decompose reference links, infobox tables, and navigation tables from page content to avoid token pollution in final RAG data.'
      },
      {
        title: 'SQLite Normalized Seeding',
        detail: 'Engineered a database schema with concepts and section-level records linked via standard relational constraints, creating a clean glossary structure for semantic search.'
      }
    ]
  },
  {
    id: 'todo-api',
    title: 'Task Manager API (CRUD + SQLite + Auth)',
    category: 'Backend Architecture',
    role: 'Backend API Engineer',
    date: 'July 2026',
    stack: ['FastAPI', 'SQLite', 'Supabase Auth', 'PostgreSQL', 'Redis', 'Docker Compose'],
    githubLink: 'https://github.com/SibghaMursaleen/Backend-AI-Internship-FlyRank/tree/main/week%204/Unified-Auth-Todo-API',
    overview: 'A robust Task CRUD API designed with the Repository Pattern. The server supports seamless database engine swapping (In-Memory, SQLite, or PostgreSQL) with Redis telemetry checking and Supabase OAuth/JWT path protections.',
    problem: 'Local prototyping runs best with low-overhead sqlite3 files, while high-concurrency production requires robust clusters (Postgres + Redis). Tightly coupling routing logic to specific database drivers leads to major refactoring efforts down the road.',
    solution: 'Built an abstract Repository layer defining standard CRUD method templates. Implemented separate database persistence layers as concrete classes implementing the base repository interfaces. A simple environment variable switches the persistence database at application startup. Added Supabase SDK verification to lock down private tasks behind JWT Bearer token authorization checks.',
    learnings: 'Mastered the Repository Design Pattern to decouple database engines from route controllers, structured local Redis cache clusters inside Docker networks, and secured endpoints using Supabase JWT verification hooks.',
    codeSnippet: `from abc import ABC, abstractmethod
from typing import List, Optional
from app.models.task import Task

class TaskRepository(ABC):
    @abstractmethod
    async def get_all(self) -> List[Task]:
        pass

    @abstractmethod
    async def get_by_id(self, task_id: int) -> Optional[Task]:
        pass

    @abstractmethod
    async def create(self, task: Task) -> Task:
        pass

# The engine is selected dynamically at application launch:
# REPOSITORY_TYPE=sqlite or REPOSITORY_TYPE=postgres`,
    decisions: [
      {
        title: 'Repository Interface Pattern',
        detail: 'Decoupled route handler files from SQL injection queries. FastAPI dependency injection provides the controller routes with the correct class engine at startup.'
      },
      {
        title: 'Supabase JWT Validation Hook',
        detail: 'Auth token validation runs in a reusable dependency check on incoming protected HTTP headers, calling Supabase profile checks and returning standard 401 statuses on invalid sessions.'
      },
      {
        title: 'Docker Compose Local Cache Clusters',
        detail: 'Orchestrated the app container along with a Postgres volume container and a Redis instance, validating query times and caching status checks via a /redis-ping telemetry route.'
      }
    ]
  },
  {
    id: 'digest-pipeline',
    title: 'Automated AI Research Digest Pipeline',
    category: 'AI Workflow Automation',
    role: 'AI Engineer',
    date: 'July 2026',
    stack: ['n8n', 'OpenAI API', 'JSON Transformations', 'Workflow Scripting'],
    githubLink: 'https://github.com/SibghaMursaleen/Backend-AI-Internship-FlyRank/tree/main/week%204/Ship%20an%20Automation%20Workflow%20v2',
    overview: 'An automated research workflow pipeline built in n8n that queries web documentation (such as the Model Context Protocol introduction), executes prompt engineering loops, structures study notes, and generates developer-oriented research digests.',
    problem: 'Staying on top of emerging technical ecosystems (e.g. MCP specifications, tooling) requires manual aggregation and filtering, taking valuable development hours out of the day.',
    solution: 'Designed an n8n workflow triggered via manual click or custom cron trigger. The pipeline issues API requests to download document pages, runs a Prompt Ladder framework step inside an OpenAI node, extracts key architecture outlines, capabilities, and code structures, and constructs a technical markdown digest ready for team consumption.',
    learnings: 'Built a visual flow automation framework in n8n, structured prompt loops yielding high accuracy specification breakdowns, and formatted automated news reports.',
    codeSnippet: `{
  "name": "Backend AI Research Digest Pipeline",
  "nodes": [
    {
      "type": "n8n-nodes-base.manualTrigger",
      "name": "When clicking 'Execute workflow'"
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://modelcontextprotocol.io/introduction"
      }
    },
    {
      "type": "n8n-nodes-base.openAi",
      "parameters": {
        "prompt": "Using Prompt Ladder, summarize this specification page..."
      }
    }
  ]
}`,
    decisions: [
      {
        title: 'Workflow Orchestration',
        detail: 'Deployed n8n visual flow automation to stitch HTTP text parsers and LLM prompt templates into a single reliable server task.'
      },
      {
        title: 'Prompt Laddering Architecture',
        detail: 'Engineered layered system prompts ensuring the LLM extracts technical specifics (communication schemas, headers) rather than shallow generic marketing highlights.'
      },
      {
        title: 'Structured Output formatting',
        detail: 'Serialized data outputs directly as clean, human-readable markdown files saved dynamically for documentation builds.'
      }
    ]
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, case-study
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage, selectedCaseId]);

  const handleCaseClick = (id) => {
    setSelectedCaseId(id);
    setCurrentPage('case-study');
  };

  const scrollToSection = (id) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setSelectedCaseId(null);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('submitting');
    
    fetch("https://formsubmit.co/ajax/sibghamursaleen722@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message
      })
    })
      .then(response => {
        if (response.ok) {
          setFormStatus('success');
          setFormData({ name: '', email: '', message: '' });
        } else {
          setFormStatus('error');
        }
      })
      .catch(error => {
        console.error("Form submission error:", error);
        setFormStatus('error');
      });
  };

  const currentCaseData = caseStudies.find(c => c.id === selectedCaseId);

  return (
    <div className="portfolio-app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => scrollToSection('home')}>
          <span>{'{'}</span>S<span>{'}'}</span>
        </div>
        <div className="nav-links">
          <span className="nav-item" onClick={() => scrollToSection('home')}>
            Home
          </span>
          <span className="nav-item" onClick={() => scrollToSection('about')}>
            About
          </span>
          <span className="nav-item" onClick={() => scrollToSection('projects')}>
            Projects
          </span>
          <span className="nav-item" onClick={() => scrollToSection('skills')}>
            Skills
          </span>
          <span className="nav-item" onClick={() => scrollToSection('contact')}>
            Contact
          </span>
          <button className="cta-button" onClick={() => scrollToSection('contact')}>
            Message Me
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {currentPage === 'home' ? (
          <div id="home">
            {/* Hero Section */}
            <section className="hero-section" style={{ padding: '6rem 0 4rem 0' }}>
              <span className="role-badge">Backend AI Engineer</span>
              <h1 className="hero-title">Building Reliable Systems</h1>
              <p className="hero-subtitle">
                I develop backend APIs and AI solutions that transform complex problems into reliable, production-ready systems.
              </p>
              <div className="hero-actions">
                <button 
                  className="cta-button accent" 
                  onClick={() => scrollToSection('projects')}
                >
                  View My Work
                </button>
                <button 
                  className="cta-button"
                  style={{ background: 'transparent', color: 'var(--navy)', border: '1px solid var(--border)' }}
                  onClick={() => scrollToSection('about')}
                >
                  Learn More
                </button>
              </div>
            </section>

            {/* About Me Section */}
            <section id="about" className="contact-section" style={{ borderTop: '1px solid var(--border)', paddingTop: '4rem', marginTop: '2rem' }}>
              <div className="section-label">About Me</div>
              <div className="contact-container">
                <div className="contact-info" style={{ maxWidth: '100%' }}>
                  <h2 style={{ fontSize: '2.25rem', marginBottom: '1.25rem' }}>Solving Backend & AI Infrastructure Challenges</h2>
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                    I am a **BS (Hons) Computer Systems Engineering** student at **Sukkur IBA University (SIBAU)**. I specialize in building robust backend APIs, database management systems, and visually scripted AI workflows. My goal is to build backend systems that are secure, highly performant, and ready to deploy on Day 1.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ padding: '1.25rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--white)', boxShadow: 'var(--shadow-sm)' }}>
                      <h3 style={{ fontSize: '1rem', color: 'var(--navy)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Education</h3>
                      <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>Sukkur IBA University (SIBAU)</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-light)' }}>BS (Hons) Computer Systems Engineering</p>
                    </div>
                    <div style={{ padding: '1.25rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--white)', boxShadow: 'var(--shadow-sm)' }}>
                      <h3 style={{ fontSize: '1rem', color: 'var(--navy)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Career Goals</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-light)' }}>
                        To architect scalable database schemas, establish protected API authentication channels, and design compliant AI agents that streamline processes.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)' }}>Core Interests:</span>
                    {['Backend Development', 'AI Engineering', 'Machine Learning', 'API Security', 'Docker Compose'].map((interest, idx) => (
                      <span key={idx} style={{ fontSize: '0.8rem', fontWeight: 500, padding: '0.25rem 0.6rem', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'var(--navy-ultra-light)', color: 'var(--navy)' }}>
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Projects Grid Section (Most Important) */}
            <section id="projects" className="cases-section" style={{ borderTop: '1px solid var(--border)', paddingTop: '4rem', marginTop: '4rem' }}>
              <div className="section-label">Projects</div>
              <div className="cases-grid">
                {caseStudies.map((item) => (
                  <div key={item.id} className="case-card" onClick={() => handleCaseClick(item.id)}>
                    <div className="case-card-body">
                      <div className="case-tags">
                        {item.stack.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="case-tag">{tag}</span>
                        ))}
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.overview}</p>
                      <div className="case-link">
                        <span>View Project Details</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="proof-section" style={{ borderTop: '1px solid var(--border)', paddingTop: '4rem', marginTop: '4rem' }}>
              <div className="section-label">Skills</div>
              <div className="skills-grid">
                {[
                  { name: 'Python', desc: 'Advanced web scraping, data parsing, and AI model scripting.' },
                  { name: 'JavaScript', desc: 'Dynamic state management, React rendering cycles, and event tracking.' },
                  { name: 'FastAPI / Express', desc: 'Building high-performance REST APIs, routers, and middleware dependencies.' },
                  { name: 'SQLite', desc: 'Local database normalization, indexes, and transactional query routines.' },
                  { name: 'Docker', desc: 'Packaging backend containers, managing volumes, and docker-compose networking.' },
                  { name: 'Git & GitHub', desc: 'VCS version control, pull requests, clean branches, and merge paths.' },
                  { name: 'REST APIs', desc: 'Configuring clean routes, validation models, request schemas, and error responses.' },
                  { name: 'Machine Learning', desc: 'System prompt layering frameworks, RAG indexing pipelines, and LLM integrations.' },
                  { name: 'Supabase', desc: 'Securing API endpoints using OAuth hooks and JSON Web Token validations.' }
                ].map((skill, idx) => (
                  <div key={idx} className="skill-card">
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-desc">{skill.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Resume Section */}
            <section className="proof-section" style={{ borderTop: '1px solid var(--border)', paddingTop: '4rem', marginTop: '4rem' }}>
              <div className="section-label">Resume</div>
              <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Looking for my full background?</h3>
                  <p style={{ color: 'var(--charcoal-light)', fontSize: '0.9rem' }}>Download my updated resume containing my complete academic studies and technical project logs.</p>
                </div>
                <a 
                  href="mailto:sibghamursaleen722@gmail.com?subject=Requesting Resume - Backend AI Engineer" 
                  className="cta-button accent"
                  style={{ textDecoration: 'none', display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Request Resume CV
                </a>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section" style={{ borderTop: '1px solid var(--border)', paddingTop: '4rem', marginTop: '4rem' }}>
              <div className="section-label">Contact</div>
              <div className="contact-container">
                <div className="contact-info">
                  <h2>Let's build something reliable together</h2>
                  <p>
                    I collaborate with teams and founders to build scalable backend architectures, automate AI operations workflows, and configure structured database systems.
                  </p>
                  
                  <div className="contact-links">
                    <div className="contact-link-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <a href="mailto:sibghamursaleen722@gmail.com">sibghamursaleen722@gmail.com</a>
                    </div>
                    <div className="contact-link-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      <a href="https://github.com/SibghaMursaleen" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
                    </div>
                    <div className="contact-link-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      <a href="https://www.linkedin.com/in/sibgha-mursaleen-4567aa253/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                    </div>
                  </div>
                </div>

                <div className="contact-form">
                  {formStatus === 'success' ? (
                    <div className="form-success">
                      <div className="form-success-icon">✓</div>
                      <h3>Message Sent!</h3>
                      <p style={{ marginTop: '0.5rem', color: 'var(--charcoal-light)' }}>
                        Thank you for reaching out. I'll get back to you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit}>
                      {formStatus === 'error' && (
                        <div style={{ color: '#d9534f', fontSize: '0.85rem', marginBottom: '1.25rem', padding: '0.75rem', backgroundColor: '#fdf7f7', border: '1px solid #ebccd1', borderRadius: 'var(--radius)', fontWeight: 500 }}>
                          Unable to deliver message. Please contact directly at: <a href="mailto:sibghamursaleen722@gmail.com">sibghamursaleen722@gmail.com</a>
                        </div>
                      )}
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea 
                          id="message" 
                          rows="4" 
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                      </div>
                      <button 
                        type="submit" 
                        className="cta-button accent" 
                        style={{ width: '100%' }}
                        disabled={formStatus === 'submitting'}
                      >
                        {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </div>
        ) : (
          <CaseStudy 
            caseData={currentCaseData} 
            onBack={() => setCurrentPage('home')}
            onContactClick={() => {
              setCurrentPage('home');
              setSelectedCaseId(null);
              setTimeout(() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">© {new Date().getFullYear()} Sibgha Mursaleen. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/SibghaMursaleen" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="https://www.linkedin.com/in/sibgha-mursaleen-4567aa253/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="mailto:sibghamursaleen722@gmail.com" className="footer-link">Email</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
