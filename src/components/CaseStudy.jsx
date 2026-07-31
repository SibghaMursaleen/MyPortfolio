import React from 'react';

// Custom CSS Browser/Terminal Mockups to avoid missing screenshots
function ProjectMockup({ id }) {
  if (id === 'todo-api') {
    return (
      <div className="browser-mock">
        <div className="browser-header">
          <div className="browser-dots"><span/><span/><span/></div>
          <div className="browser-address">api.sibgha.dev/docs (Swagger UI)</div>
        </div>
        <div className="browser-body swagger-ui">
          <div className="swagger-header">
            <h3>FastAPI Task CRUD</h3>
            <span className="swagger-version">v0.1.0</span>
          </div>
          <div className="api-section">
            <div className="api-endpoint post">
              <span className="method">POST</span> <span className="path">/auth/signup</span>
              <span className="desc">Register account</span>
            </div>
            <div className="api-endpoint post">
              <span className="method">POST</span> <span className="path">/auth/login</span>
              <span className="desc">Authenticate user & return JWT</span>
            </div>
            <div className="api-endpoint get secure">
              <span className="method">GET</span> <span className="path">/tasks</span>
              <span className="desc">Retrieve user tasks (Authenticated)</span>
              <span className="lock">🔒</span>
            </div>
            <div className="api-endpoint post secure">
              <span className="method">POST</span> <span className="path">/tasks</span>
              <span className="desc">Create task (SQLite/Postgres persist)</span>
              <span className="lock">🔒</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'scraper') {
    return (
      <div className="browser-mock terminal">
        <div className="browser-header">
          <div className="browser-dots"><span/><span/><span/></div>
          <div className="browser-address">powershell - polite_scraper</div>
        </div>
        <div className="browser-body terminal-body">
          <p className="cmd-line">&gt; python main.py --target wikipedia</p>
          <p className="log-info">[INFO] Loading robots.txt from https://en.wikipedia.org/robots.txt</p>
          <p className="log-success">[COMPLIANT] Path "/wiki/Model_Context_Protocol" is ALLOWED by user-agent.</p>
          <p className="log-info">[DELAY] Sleeping for 1.0s (enforcing robots.txt Crawl-delay)</p>
          <p className="log-info">[FETCH] GET https://en.wikipedia.org/wiki/Model_Context_Protocol</p>
          <p className="log-info">[PARSE] Found 6 headers and 24 reference sup nodes.</p>
          <p className="log-success">[CLEAN] Reference tags decomposed. Content sanitized.</p>
          <p className="log-success">[SQL] Transaction committed: inserted 1 concept and 5 subsections to wiki_glossary.db</p>
          <p className="cmd-line">&gt; _</p>
        </div>
      </div>
    );
  }

  if (id === 'orchard-bliss') {
    return (
      <div className="browser-mock">
        <div className="browser-header">
          <div className="browser-dots"><span/><span/><span/></div>
          <div className="browser-address">orchard-bliss.vercel.app</div>
        </div>
        <div className="browser-body store-mock">
          <div className="store-nav">
            <span className="store-brand">🌿 Orchard Bliss</span>
            <span className="store-cart">🛒 Cart (3 Items)</span>
          </div>
          <div className="store-grid">
            <div className="store-card">
              <div className="juice-bottle green"></div>
              <h4>Organic Celery Press</h4>
              <p>$5.99</p>
              <button disabled>In Cart</button>
            </div>
            <div className="store-card">
              <div className="juice-bottle orange"></div>
              <h4>Zesty Ginger & Amber</h4>
              <p>$6.49</p>
              <button disabled>In Cart</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'mobilityx') {
    return (
      <div className="browser-mock">
        <div className="browser-header">
          <div className="browser-dots"><span/><span/><span/></div>
          <div className="browser-address">mobilityx-dashboard.vercel.app</div>
        </div>
        <div className="browser-body dashboard-mock">
          <div className="db-top">
            <div className="db-widget"><h4>Active Fleet</h4><span className="num">24 EVs</span></div>
            <div className="db-widget"><h4>Battery Avg</h4><span className="num accent-num">87%</span></div>
            <div className="db-widget"><h4>Avg Route Latency</h4><span className="num">12.4m</span></div>
          </div>
          <div className="db-chart">
            <div className="chart-title">Route Efficiency Load</div>
            <div className="chart-lines">
              <div className="chart-bar" style={{height: '40%'}}></div>
              <div className="chart-bar" style={{height: '60%'}}></div>
              <div className="chart-bar highlight" style={{height: '85%'}}></div>
              <div className="chart-bar" style={{height: '50%'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function CaseStudy({ caseData, onBack, onContactClick }) {
  if (!caseData) return null;

  return (
    <div className="case-detail-page">
      <div className="back-nav" onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back to Projects</span>
      </div>

      <header className="case-header">
        <span className="role-badge">{caseData.category}</span>
        <h1>{caseData.title}</h1>
        
        <div className="case-meta">
          <div className="meta-item">
            <h4>Role</h4>
            <p>{caseData.role}</p>
          </div>
          <div className="meta-item">
            <h4>Project Date</h4>
            <p>{caseData.date}</p>
          </div>
          <div className="meta-item">
            <h4>Tech Stack</h4>
            <p>{caseData.stack.join(' • ')}</p>
          </div>
          {caseData.githubLink && (
            <div className="meta-item">
              <h4>Codebase</h4>
              <p>
                <a 
                  href={caseData.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, color: 'var(--amber)' }}
                >
                  GitHub Source
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </p>
            </div>
          )}
        </div>
      </header>

      <div className="case-content">
        <main className="case-main">
          {/* Visual Mockup rendering */}
          <section className="case-section-block">
            <h2>Visual Representation</h2>
            <ProjectMockup id={caseData.id} />
          </section>

          <section className="case-section-block">
            <h2>Overview</h2>
            <p>{caseData.overview}</p>
          </section>

          <section className="case-section-block">
            <h2>The Challenge & Brief</h2>
            <p>{caseData.problem}</p>
          </section>

          <section className="case-section-block">
            <h2>The Solution & Approach</h2>
            <p>{caseData.solution}</p>
            {caseData.codeSnippet && (
              <pre>
                <code>{caseData.codeSnippet}</code>
              </pre>
            )}
          </section>

          <section className="case-section-block">
            <h2>Key Decisions & Outcomes</h2>
            <p style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: '0.5rem' }}>What this project demonstrates:</p>
            <p>{caseData.learnings}</p>
            <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
              {caseData.decisions.map((decision, index) => (
                <div key={index} style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', fontFamily: 'Space Grotesk' }}>
                    {decision.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-light)', margin: 0 }}>
                    {decision.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="case-section-block" style={{ marginTop: '4rem', padding: '2rem', backgroundColor: 'var(--navy-ultra-light)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <h2 style={{ border: 'none', padding: 0, marginBottom: '0.5rem' }}>Interested in this project?</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              I can build similar API architectures, database persistences, or rate-limited web crawlers customized for your business.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="cta-button accent" onClick={onContactClick}>
                Message Me
              </button>
              {caseData.githubLink && (
                <a 
                  href={caseData.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cta-button" 
                  style={{ textDecoration: 'none', backgroundColor: 'transparent', color: 'var(--navy)', borderColor: 'var(--border)' }}
                >
                  View Code on GitHub
                </a>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default CaseStudy;
