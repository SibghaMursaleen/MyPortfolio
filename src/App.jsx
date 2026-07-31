import React, { useState, useEffect } from 'react';
import CaseStudy from './components/CaseStudy';

// Projects Data (including all required fields)
const caseStudies = [
  {
    id: 'todo-api',
    title: 'Task Manager API (CRUD + SQLite + Auth)',
    category: 'Backend Architecture',
    role: 'Backend API Engineer',
    date: 'July 2026',
    stack: ['FastAPI', 'SQLite', 'Supabase Auth', 'PostgreSQL', 'Redis', 'Docker Compose'],
    githubLink: 'https://github.com/SibghaMursaleen/Backend-AI-Internship-FlyRank/tree/main/week%204/Unified-Auth-Todo-API',
    liveLink: '', // If available, else blank
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
    id: 'scraper',
    title: 'Polite Web Scraper & RAG Corpus Builder',
    category: 'AI & Data Engineering',
    role: 'Backend Developer',
    date: 'July 2026',
    stack: ['Python', 'BeautifulSoup', 'SQLite', 'urllib.robotparser'],
    githubLink: 'https://github.com/SibghaMursaleen/Backend-AI-Internship-FlyRank/tree/main/week%205/Polite%20Web%20Scraper',
    liveLink: '',
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
    id: 'orchard-bliss',
    title: 'Orchard Bliss e-Commerce Platform',
    category: 'Frontend Engineering',
    role: 'Frontend Developer',
    date: 'June 2026',
    stack: ['React', 'Vanilla CSS', 'State Hooks', 'LocalStorage'],
    githubLink: 'https://github.com/SibghaMursaleen/OrchardBliss',
    liveLink: 'https://orchard-bliss.vercel.app',
    overview: 'A premium direct-to-consumer (D2C) organic juice storefront featuring grid layouts, product customization, card filters, and a synchronized shopping cart flow.',
    problem: 'Traditional e-commerce templates are often bloated and slow, leading to high abandonment rates. Creating a fluid, lightweight frontend store requires highly responsive designs, fast state updates, and persistent state management without reliance on heavy databases.',
    solution: 'Designed and built a clean React application utilizing optimized vanilla CSS flex and grid systems. Implemented item filtering, state-driven cart counts, dynamic billing totals, and synchronized cart storage via browser LocalStorage to maintain selections between refreshes.',
    learnings: 'Deepened skills in responsive styling systems, React state synchronization, and storage hooks. Understood the user conversion funnel, translating clean designs into measurable visual paths.',
    codeSnippet: `// LocalStorage Cart Synchronization Hook
import { useState, useEffect } from 'react';

export function usePersistedCart(key, initialValue = []) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cart));
  }, [key, cart]);

  return [cart, setCart];
}`,
    decisions: [
      {
        title: 'Persistent Client Carts',
        detail: 'Structured a custom storage synchronization hook using local storage APIs to preserve selected catalog items across browser sessions.'
      },
      {
        title: 'Highly Responsive Flex Grids',
        detail: 'Replaced frameworks with custom media query templates, creating fluid card wrappers that adapt gracefully across mobile, tablet, and wide desktop screens.'
      }
    ]
  },
  {
    id: 'mobilityx',
    title: 'Mobilityx transit Dashboard',
    category: 'Frontend Engineering',
    role: 'Frontend Developer',
    date: 'May 2026',
    stack: ['React', 'REST APIs', 'Chart.js', 'Vanilla CSS'],
    githubLink: 'https://github.com/SibghaMursaleen/Mobilityx',
    liveLink: 'https://mobilityx-dashboard.vercel.app',
    overview: 'An interactive fleet management and analytics dashboard designed to visualize EV route optimization, active transit metrics, and driver battery statuses.',
    problem: 'Fleet managers need to evaluate heavy telemetry data streams instantly. Overloading the client with messy raw tables makes it hard to coordinate delivery routing, leading to operational inefficiencies.',
    solution: 'Created a modular metrics dashboard with React. Hooked analytics data into dynamic Chart.js dashboards, letting managers toggle views between fleet active hours, battery statuses, and transit paths. Integrated search filter sheets for driver listings.',
    learnings: 'Mastered integrating graphing libraries with React component cycles, fetching JSON data endpoints, and presenting analytical indicators clearly to users.',
    codeSnippet: `// ChartJS Component Wrapper in React
import { Line } from 'react-chartjs-2';

function RouteMetricsChart({ data }) {
  const chartData = {
    labels: data.map(d => d.timestamp),
    datasets: [{
      label: 'EV Charge Level (%)',
      data: data.map(d => d.battery),
      borderColor: 'var(--amber)',
      backgroundColor: 'var(--amber-light)',
      tension: 0.4
    }]
  };
  return <Line data={chartData} options={{ responsive: true }} />;
}`,
    decisions: [
      {
        title: 'State-Driven Graphing Data',
        detail: 'Bound fleet data filters directly to ChartJS options, triggering smooth animations when routes or dates are updated.'
      },
      {
        title: 'Telemetry Filter Interfaces',
        detail: 'Built index-based search parameters letting fleet managers filter active vehicles by driver, location, or alarm flags.'
      }
    ]
  }
];

function App() {
  // Hash Routing Logic to enable reachable, independent URLs
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/case-study/')) {
      return 'case-study';
    }
    return hash.replace('#/', '') || 'home';
  });

  const [selectedCaseId, setSelectedCaseId] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/case-study/')) {
      return hash.replace('#/case-study/', '');
    }
    return null;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/case-study/')) {
        setCurrentRoute('case-study');
        setSelectedCaseId(hash.replace('#/case-study/', ''));
      } else {
        setCurrentRoute(hash.replace('#/', '') || 'home');
        setSelectedCaseId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentRoute, selectedCaseId]);

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
        <a href="#/home" className="logo" style={{ textDecoration: 'none' }}>
          <span>{'{'}</span>S<span>{'}'}</span>
        </a>
        <div className="nav-links">
          <a 
            href="#/home" 
            className={`nav-item ${currentRoute === 'home' ? 'active' : ''}`}
          >
            Home
          </a>
          <a 
            href="#/about" 
            className={`nav-item ${currentRoute === 'about' ? 'active' : ''}`}
          >
            About
          </a>
          <a 
            href="#/projects" 
            className={`nav-item ${currentRoute === 'projects' || currentRoute === 'case-study' ? 'active' : ''}`}
          >
            Projects
          </a>
          <a 
            href="#/skills" 
            className={`nav-item ${currentRoute === 'skills' ? 'active' : ''}`}
          >
            Skills
          </a>
          <a 
            href="#/contact" 
            className={`nav-item ${currentRoute === 'contact' ? 'active' : ''}`}
          >
            Contact
          </a>
          <a 
            href="#/contact" 
            className="cta-button"
            style={{ textDecoration: 'none' }}
          >
            Message Me
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {currentRoute === 'home' && (
          <section className="hero-section">
            <span className="role-badge">Backend AI Engineer</span>
            <h1 className="hero-title">Building Reliable Systems</h1>
            <p className="hero-subtitle">
              I develop backend APIs and AI solutions that transform complex problems into reliable, production-ready systems.
            </p>
            <div className="hero-actions">
              <a href="#/projects" className="cta-button accent" style={{ textDecoration: 'none' }}>
                View My Projects
              </a>
              <a 
                href="#/about" 
                className="cta-button"
                style={{ textDecoration: 'none', background: 'transparent', color: 'var(--navy)', border: '1px solid var(--border)' }}
              >
                About Me
              </a>
            </div>
          </section>
        )}

        {currentRoute === 'about' && (
          <section className="contact-section" style={{ borderTop: 'none', paddingTop: 0 }}>
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
        )}

        {currentRoute === 'projects' && (
          <section className="cases-section" style={{ borderTop: 'none', paddingTop: 0 }}>
            <div className="section-label">Projects</div>
            <div className="cases-grid">
              {caseStudies.map((item) => (
                <a key={item.id} href={`#/case-study/${item.id}`} className="case-card" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                </a>
              ))}
            </div>
          </section>
        )}

        {currentRoute === 'skills' && (
          <section className="proof-section" style={{ borderTop: 'none', paddingTop: 0 }}>
            <div className="section-label">Skills</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem' }}>
              {[
                'Python',
                'JavaScript',
                'FastAPI / Express',
                'SQLite',
                'Docker',
                'Git & GitHub',
                'REST APIs',
                'Machine Learning',
                'Supabase'
              ].map((skill, idx) => (
                <div key={idx} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--navy)' }}>{skill}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {currentRoute === 'contact' && (
          <section className="contact-section" style={{ borderTop: 'none', paddingTop: 0 }}>
            <div className="section-label">Contact & Resume</div>
            
            {/* CV Download / Request Card */}
            <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem', boxShadow: 'var(--shadow-sm)' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Download Resume CV</h3>
                <p style={{ color: 'var(--charcoal-light)', fontSize: '0.85rem' }}>Access my full academic qualifications and project development history.</p>
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
                Download CV
              </a>
            </div>

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
        )}

        {currentRoute === 'case-study' && (
          <CaseStudy 
            caseData={currentCaseData} 
            onBack={() => { window.location.hash = '#/projects'; }}
            onContactClick={() => { window.location.hash = '#/contact'; }}
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
