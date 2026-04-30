import React from 'react'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  const NAV = ['About', 'Skills', 'Projects', 'Contact']

  const STACK = [
    { label: 'Backend',  value: 'Django REST Framework' },
    { label: 'Frontend', value: 'React + Vite + ReactNative(Expo)'          },
    { label: 'Database', value: 'PostgreSQL'            },
    { label: 'Deploy',   value: 'Render + Vercel'       },
  ]

  return (
    <footer className="ft">
      {/* ── Top rule with gradient ── */}
      <div className="ft__top-rule" />

      <div className="ft__container">

        {/* ── Row 1: Logo + Nav ── */}
        <div className="ft__row ft__row--main">

          {/* Wordmark */}
          <div className="ft__brand">
            <span className="ft__logo">
              K<span className="ft__logo-dash">—</span>Tech
            </span>
            <p className="ft__tagline">
              Full-Stack Developer &amp; IS Auditor<br />
              <span className="ft__location">
                <span className="ft__location-dot" />
                Nairobi, Kenya
              </span>
            </p>
          </div>

          {/* Nav links */}
          <nav className="ft__nav" aria-label="Footer navigation">
            {NAV.map((l, i) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="ft__nav-link"
                style={{ '--i': i }}
              >
                <span className="ft__nav-num">0{i + 1}</span>
                {l}
              </a>
            ))}
          </nav>

          {/* Social / external links */}
          <div className="ft__social">
            <a
              href="https://github.com/kaikaivincent25/"
              target="_blank"
              rel="noopener noreferrer"
              className="ft__social-link"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205
                  11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
                  C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729
                  1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998
                  .108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
                  0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176
                  0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405
                  1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23
                  .645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22
                  0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22
                  0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57
                  C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub
              <span className="ft__social-arrow">↗</span>
            </a>

            <a
              href="https://drive.google.com/drive/folders/1TkMwS4MYf_397mBefe69ihsgW13kSVsO?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="ft__social-link"
              aria-label="Portfolio Drive"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M4.433 22l-2.443-4.232 5.757-9.983H13.5L4.433 22zm3.624 0L13.5 11.785h6.066l-5.443 9.43
                  L13.5 22H8.057zM1.5 17.768l2.443-4.232H9.81l-2.443 4.232H1.5zm8.632-9.983L7.689 3.553
                  10.132 2h3.753l2.443 4.232-2.443 4.232h-3.753zM12 2h3.943l5.557 9.617-2.443
                  4.232L13.5 7.617 12 5.232 12 2zm3.943 0L22.5 12.385l-2.443 4.232-6.057-10.485L15.943 2z"/>
              </svg>
              Drive
              <span className="ft__social-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="ft__mid-rule" />

        {/* ── Row 2: Stack tags ── */}
        <div className="ft__stack">
          <span className="ft__stack-label">Built with</span>
          {STACK.map(({ label, value }) => (
            <div key={label} className="ft__stack-item">
              <span className="ft__stack-key">{label}</span>
              <span className="ft__stack-val">{value}</span>
            </div>
          ))}
        </div>

        {/* ── Row 3: Bottom bar ── */}
        <div className="ft__bottom">
          <span className="ft__copy">
            © {year} K-Tech · All rights reserved
          </span>
          <span className="ft__flag" role="img" aria-label="Kenya">
            🇰🇪
          </span>
          <span className="ft__copy ft__copy--right">
            Handcrafted in Nairobi
          </span>
        </div>

      </div>
    </footer>
  )
}