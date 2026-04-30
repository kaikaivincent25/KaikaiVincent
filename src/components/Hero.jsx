import { useApi } from '../hooks/useApi'
import { useState, useEffect } from 'react'
import './Hero.css'
import profilePic from '../assets/pc.jpg'

const FALLBACK = {
  name: 'Vincent Kaikai',
  bio: `Junior software developer with a strong foundation in full-stack web and mobile development 
and a keen interest in cybersecurity. I specialise in building robust, scalable 
applications using modern technologies such as Django REST Framework, React, React Native, and 
PostgreSQL.`,
  github: 'https://github.com/kaikaivincent25',
  linkedin: 'https://linkedin.com/in/yourprofile', // Replace with your actual link
  email: 'kaikaivincent24@gmail.com',
  // Your restricted Drive folder link
  drive_url: 'https://drive.google.com/drive/folders/1TkMwS4MYf_397mBefe69ihsgW13kSVsO?usp=drive_link'
}

const ROLES = ['Software Developer', 'API Architect', 'Cybersecurity Specialist']

export default function Hero() {
  const { data } = useApi('/about/')
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  const profile = data || FALLBACK

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

  return (
    <section id="hero" className="hero">
      <div className="hero__bg-glow" />
      <div className="hero__bg-grid" />

      <div className="container">
        <div className="hero__inner">
          
          <div className="hero__content">
            <div className="hero__eyebrow fade-up">
              <span className="hero__eyebrow-line" />
              <span className="hero__eyebrow-text">Tech · Innovation · Growth</span>
            </div>

            <h1 className="hero__name fade-up-1">
              Vincent<br />
              <span className="hero__name-accent">Kaikai</span>
            </h1>

            <div className="hero__typewriter fade-up-2">
              {displayed}<span className="hero__cursor" />
            </div>

            <p className="hero__bio fade-up-3">
              {profile.bio}
            </p>

            <div className="hero__ctas fade-up-4">
              <a href="#projects" className="hero__btn-primary">
                View My Work
              </a>
              {/* This link triggers Google's 'Request Access' page automatically */}
              <a 
                href={profile.drive_url} 
                target="_blank" 
                rel="noreferrer" 
                className="hero__btn-ghost"
              >
                Request Credentials ↓
              </a>
            </div>

            <div className="hero__socials fade-up-5">
              <a href={profile.github} target="_blank" rel="noreferrer" className="hero__social-link">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hero__social-link">LinkedIn</a>
              <a href={`mailto:${profile.email}`} className="hero__social-link">Email</a>
            </div>
          </div>

          <div className="hero__photo-container fade-up-3">
            <div className="hero__photo-wrapper">
              <div className="hero__photo-frame-offset" />
              <div className="hero__photo-box">
                <img src={profilePic} alt="Vincent Kaikai" className="hero__photo-img" />
                <div className="hero__photo-strip" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  )
}