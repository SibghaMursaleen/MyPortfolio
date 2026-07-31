import React from 'react';

function CaseStudy({ caseData, onBack, onContactClick }) {
  if (!caseData) return null;

  return (
    <div className="case-detail-page">
      <div className="back-nav" onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back to Portfolio</span>
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
        </div>
      </header>

      <div className="case-content">
        <main className="case-main">
          <section className="case-section-block">
            <h2>Overview</h2>
            <p>{caseData.overview}</p>
          </section>

          <section className="case-section-block">
            <h2>The Challenge</h2>
            <p>{caseData.problem}</p>
          </section>

          <section className="case-section-block">
            <h2>The Solution & Architecture</h2>
            <p>{caseData.solution}</p>
            {caseData.codeSnippet && (
              <pre>
                <code>{caseData.codeSnippet}</code>
              </pre>
            )}
          </section>

          <section className="case-section-block">
            <h2>Key Technical Decisions</h2>
            <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1rem' }}>
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
            <h2 style={{ border: 'none', padding: 0, marginBottom: '0.5rem' }}>Interested in this solution?</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              I can adapt similar backend configurations, authentication logic, or rate-limited scraping pipelines to match your product's requirements.
            </p>
            <button className="cta-button accent" onClick={onContactClick}>
              Message Me
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default CaseStudy;
