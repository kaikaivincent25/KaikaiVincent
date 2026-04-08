import { useApi } from '../hooks/useApi'
import { useState, useEffect } from 'react'
import './Hero.css'

// ─── FALLBACK DATA ────────────────────────────────────────────────────────────
// Shown when backend API is not yet connected.
// Replace with your real details. When backend is live these are ignored.
const FALLBACK = {
  name:                'Vincent Kaikai',
  bio:                `Junior software developer with a strong foundation in full-stack web and mobile development 
and a keen interest in cybersecurity. I specialise in building robust, scalable 
applications using modern technologies such as Django REST Framework, React, React Native, and 
PostgreSQL, with a focus on clean architecture and secure system design.`,
  github:              'https://github.com/kaikaivincent25',
  linkedin:            'null',
  email:               'kaikaivincent24@gmail.com',
  cv_url:              null,   // e.g. '/media/cv/vincent_cv.pdf' once backend is live
  profile_picture_url: '../assets/pc.jpg',   // e.g. '/media/profile/vincent.jpg' once backend is live
}
// ─────────────────────────────────────────────────────────────────────────────

const ROLES = [
  'Software Developer',
//  'Cybersecurity Specialist',
//  'Full Stack Engineer',
  'API Architect',
]

export default function Hero() {
  const { data } = useApi('/about/')
  const [roleIdx,   setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing,    setTyping]    = useState(true)

  // Use API data if available, otherwise fall back to hardcoded content
  const profile = data || FALLBACK

  // Typewriter effect
  useEffect(() => {
    const target = ROLES[roleIdx]
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2200)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
        return () => clearTimeout(t)
      } else {
        setRoleIdx(i => (i + 1) % ROLES.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIdx])

  const SOCIALS = [
    { label: 'GitHub',   url: profile.github },
    { label: 'LinkedIn', url: profile.linkedin },
    { label: 'Email',    url: profile.email ? `mailto:${profile.email}` : null },
  ].filter(s => s.url)

  return (
    <section id="hero" className="hero">
      <div className="hero__bg-glow" />
      <div className="hero__bg-grid" />

      <div className="container">
        <div className="hero__inner">

          {/* ── LEFT: Text ── */}
          <div>
            <div className="hero__eyebrow fade-up">
              <span className="hero__eyebrow-line" />
              <span className="hero__eyebrow-text">
                Tech · Innovation · Growth
              </span>
            </div>

            <h1 className="hero__name fade-up-1">
              Vincent<br />
              <span className="hero__name-accent">Kaikai</span>
            </h1>

            <div className="hero__typewriter fade-up-2">
              {displayed}
              <span className="hero__cursor" />
            </div>

            {/* Bio — always shows from fallback if API is offline */}
            <p className="hero__bio fade-up-3">
              {profile.bio.slice(0, 200)}
              {profile.bio.length > 200 ? '…' : ''}
            </p>

            {/* CTA Buttons */}
            <div className="hero__ctas fade-up-4">
              <a href="#projects" className="hero__btn-primary">
                <span>View My Work</span>
                <span>→</span>
              </a>
              {profile.cv_url && (
                <a
                  href={profile.cv_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hero__btn-ghost"
                >
                  <span>Download CV</span>
                  <span>↓</span>
                </a>
              )}
              {/* Show Contact Me button when CV is not yet available */}
              {!profile.cv_url && (
                <a href="#contact" className="hero__btn-ghost">
                  <span>Contact Me</span>
                  <span>→</span>
                </a>
              )}
            </div>

            {/* Social Links — always visible */}
            <div className="hero__socials fade-up-5">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.label !== 'Email' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="hero__social-link"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Profile Photo ── */}
          <div className="hero__photo-wrapper fade-up-3">
            <div className="hero__photo-frame-offset" />

            <div className="hero__photo-box">
              {profile.profile_picture_url ? (
                <>
                  <img
                    src={profile.profile_picture_url}
                    alt="../assets/pc.jpg"
                    className="hero__photo-img"
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.nextElementSibling.style.display = 'flex'
                    }}
                  />
                  {/* Fallback if image URL breaks */}
                  <div className="hero__photo-placeholder" style={{ display: 'none' }}>
                    <div className="hero__photo-placeholder-avatar">VK</div>
                    <p className="hero__photo-placeholder-text">
                      Vincent Kaikai
                    </p>
                  </div>
                </>
              ) : (
                // No photo yet — show initials placeholder
                <div className="hero__photo-placeholder">
                  <div className="hero__photo-placeholder-avatar">VK</div>
                  <p className="hero__photo-placeholder-text">
                    Vincent Kaikai<br />
                    <span style={{ fontSize: '0.6rem', opacity: 0.5 }}>
                      Photo coming soon
                    </span>
                  </p>
                </div>
              )}
              <div className="hero__photo-strip" />
            </div>

            <div className="hero__badge">
              <div className="hero__badge-title">CUK</div>
              <div className="hero__badge-sub">BBIT · Nairobi</div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  )
}