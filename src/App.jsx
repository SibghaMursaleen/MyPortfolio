import React, { useState, useEffect } from 'react';
import CaseStudy from './components/CaseStudy';

// Case Studies Data
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
        introduction = soup.find('p').text
        # Transactional SQLite serialization details...`,
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
    title: 'Unified Task API with Swappable Storage',
    category: 'Backend Architecture',
    role: 'Backend API Engineer',
    date: 'July 2026',
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker Compose', 'Supabase Auth', 'SQLite'],
    githubLink: 'https://github.com/SibghaMursaleen/Backend-AI-Internship-FlyRank/tree/main/week%204/Unified-Auth-Todo-API',
    overview: 'A robust Task CRUD API designed with the Repository Pattern. The server supports seamless database engine swapping (In-Memory, SQLite, or PostgreSQL) with Redis telemetry checking and Supabase OAuth/JWT path protections.',
    problem: 'Local prototyping runs best with low-overhead sqlite3 files, while high-concurrency production requires robust clusters (Postgres + Redis). Tightly coupling routing logic to specific database drivers leads to major refactoring efforts down the road.',
    solution: 'Built an abstract Repository layer defining standard CRUD method templates. Implemented separate database persistence layers as concrete classes implementing the base repository interfaces. A simple environment variable switches the persistence database at application startup. Added Supabase SDK verification to lock down private tasks behind JWT Bearer token authorization checks.',
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
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage, selectedCaseId]);

  const handleCaseClick = (id) => {
    setSelectedCaseId(id);
    setCurrentPage('case-study');
  };

  const handleNavClick = (pageId, sectionId = null) => {
    if (pageId === 'home') {
      setCurrentPage('home');
      setSelectedCaseId(null);
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else if (pageId === 'contact') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setSelectedCaseId(null);
        setTimeout(() => {
          const element = document.getElementById('contact');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
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
        <div className="logo" onClick={() => handleNavClick('home')}>
          <span>{'{'}</span>S<span>{'}'}</span>
        </div>
        <div className="nav-links">
          <span 
            className={`nav-item ${currentPage === 'home' && !selectedCaseId ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </span>
          <span 
            className="nav-item"
            onClick={() => handleNavClick('home', 'cases')}
          >
            Case Studies
          </span>
          <span 
            className="nav-item"
            onClick={() => handleNavClick('contact')}
          >
            Contact
          </span>
          <button 
            className="cta-button" 
            onClick={() => handleNavClick('contact')}
          >
            Message Me
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {currentPage === 'home' ? (
          <div>
            {/* Hero Section */}
            <section className="hero-section">
              <span className="role-badge">Backend AI Engineer</span>
              <h1 className="hero-title">Building Reliable Systems</h1>
              <p className="hero-subtitle">
                I develop backend APIs and AI solutions that transform complex problems into reliable, production-ready systems.
              </p>
              <div className="hero-actions">
                <button 
                  className="cta-button accent" 
                  onClick={() => {
                    const el = document.getElementById('cases');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore Case Studies
                </button>
                <button 
                  className="cta-button"
                  style={{ background: 'transparent', color: 'var(--navy)', border: '1px solid var(--border)' }}
                  onClick={() => handleNavClick('contact')}
                >
                  Get in Touch
                </button>
              </div>
            </section>

            {/* Proof Section */}
            <section className="proof-section">
              <div className="section-label">Core Competencies</div>
              <div className="proof-grid">
                <div className="proof-card">
                  <div className="proof-icon">API</div>
                  <h3>Scalable Architecture</h3>
                  <p>Implementing clean, decoupled backend architectures using the Repository Pattern, database toggling, and Redis caches.</p>
                </div>
                <div className="proof-card">
                  <div className="proof-icon">BOT</div>
                  <h3>Compliant Extraction</h3>
                  <p>Building rate-limited, compliant data pipelines respecting robots.txt configurations to populate structured RAG indexes.</p>
                </div>
                <div className="proof-card">
                  <div className="proof-icon">AI</div>
                  <h3>Agent & Automation</h3>
                  <p>Orchestrating workflows using LLM prompt engineering, n8n visual flow scripting, and automated newsletters.</p>
                </div>
              </div>
            </section>

            {/* Case Studies Grid Section */}
            <section id="cases" className="cases-section">
              <div className="section-label">Case Studies</div>
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

            {/* Contact Section */}
            <section id="contact" className="contact-section">
              <div className="section-label">Get in Touch</div>
              <div className="contact-container">
                <div className="contact-info">
                  <h2>Let's build something reliable together</h2>
                  <p>
                    I help startups and developers establish solid API backends, automate operations pipelines, and set up custom RAG extraction setups.
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
            onBack={() => handleNavClick('home')}
            onContactClick={() => handleNavClick('contact')}
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
