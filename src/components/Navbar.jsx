import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [active,     setActive]     = useState('')
  const [menuOpen,   setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = ['about', 'skills', 'projects', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]); break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on link click
  const handleLinkClick = () => setMenuOpen(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : 'top'}`}>
        <a href="#hero" className="navbar__logo">
          K<span className="dot">-</span>Tech
        </a>

        <div className="navbar__spacer" />

        {/* Desktop links */}
        <div className="navbar__links">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '')
            return (
              
                key={label}
                href={href}
                className={`navbar__link ${active === id ? 'active' : ''}`}
              >
                {label}
                {active === id && <span className="navbar__link-indicator" />}
              </a>
            )
          })}
          <a href="#contact" className="navbar__cta">Hire Me</a>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${menuOpen ? 'open' : ''}`}>
        <div className="navbar__drawer-links">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '')
            return (
              
                key={label}
                href={href}
                className={`navbar__drawer-link ${active === id ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                {label}
              </a>
            )
          })}
          
            href="#contact"
            className="navbar__cta navbar__drawer-cta"
            onClick={handleLinkClick}
          >
            Hire Me
          </a>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className="navbar__backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}