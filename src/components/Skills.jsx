import { useEffect, useRef, useState } from 'react'
import './Skills.css' // Added CSS import

// ─── Static data (no backend needed) ─────────────────────────────────────────
const SKILL_DATA = {
  grouped: {
    'Backend Development': [
      { id: 1, name: 'Python / Django',         proficiency: 70 },
      { id: 2, name: 'Django REST Framework',   proficiency: 70 },
      { id: 3, name: 'JWT Authentication',      proficiency: 70 },
      { id: 4, name: 'RESTful API Design',      proficiency: 70 },
    ],
    'Frontend Development': [
      { id: 5, name: 'React / Vite',            proficiency: 70 },
      { id: 6, name: 'JavaScript (ES6+)',       proficiency: 70 },
      { id: 7, name: 'HTML5 & CSS3',            proficiency: 70 },
      { id: 8, name: 'React Native / Expo',     proficiency: 70 },
    ],
    'Database': [
      { id: 9,  name: 'PostgreSQL',             proficiency: 70 },
      { id: 10, name: 'SQL & Query Design',     proficiency: 70 },
      { id: 11, name: 'Django ORM',             proficiency: 70 },
    ],
    
  },
}

const GITHUB_URL   = 'https://github.com/kaikaivincent25/'
const DRIVE_URL    = 'https://drive.google.com/drive/folders/1TkMwS4MYf_397mBefe69ihsgW13kSVsO?usp=drive_link'

const CATEGORY_META = {
  'Backend Development':  { icon: '⚙',  accent: '#C9A84C' },
  'Frontend Development': { icon: '🖥',  accent: '#C9A84C' },
  'Database':             { icon: '🗄',  accent: '#C9A84C' },
 // 'Cybersecurity':        { icon: '🔒',  accent: '#C9A84C' },
}

const STATS = [
  { num: null, label: 'Technical Skills'    },
  { num: '3+', label: 'Years Studying'      },
  { num: '3+', label: 'Projects Completed'  },
  { num: '2',  label: 'Core Specialisations'},
]

// ─── Animated skill bar ───────────────────────────────────────────────────────
function SkillBar({ skill, delay = 0 }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setAnimated(true), delay) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} className="sk-skill">
      <div className="sk-skill-meta">
        <span className="sk-skill-name">{skill.name}</span>
        <span className="sk-skill-pct">{skill.proficiency}%</span>
      </div>
      <div className="sk-bar-track">
        <div className="sk-bar-fill" style={{ width: animated ? `${skill.proficiency}%` : '0%' }} />
      </div>
    </div>
  )
}

// ─── Category card ────────────────────────────────────────────────────────────
function CategoryCard({ category, skills, index }) {
  const meta = CATEGORY_META[category] || { icon: '◆', accent: '#C9A84C' }
  return (
    <div className="sk-card" style={{ '--card-index': index }}>
      <div className="sk-card-header">
        <span className="sk-card-num">0{index + 1}</span>
        <span className="sk-card-icon">{meta.icon}</span>
        <h3 className="sk-card-title">{category}</h3>
      </div>
      <div className="sk-card-body">
        {skills.map((skill, i) => (
          <SkillBar key={skill.id} skill={skill} delay={i * 80} />
        ))}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Skills() {
  const totalSkills = Object.values(SKILL_DATA.grouped).flat().length

  return (
    <section id="skills" className="sk-section">
      {/* Background texture */}
      <div className="sk-bg-grid" aria-hidden="true" />

      <div className="sk-container">

        {/* Header block */}
        <div className="sk-header">
          <div className="sk-header-left">
            <p className="sk-eyebrow">Technical Proficiency</p>
            <h2 className="sk-heading">
              Skills &amp;<br />
              <span className="sk-heading-gold">Expertise</span>
            </h2>
          </div>
          <div className="sk-header-right">
            <p className="sk-header-desc">
              A curated snapshot of my technical stack — from full-stack web
              development to information systems auditing, built through
              coursework and real projects.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sk-github-btn"
            >
              <svg className="sk-github-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303
                  3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
                  0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
                  C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729
                  1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305
                  3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
                  0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176
                  0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405
                  1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23
                  3.285-1.23.645 1.653.24 2.873.12 3.176.765.84
                  1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92
                  .42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015
                  3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592
                  24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              View My GitHub
              <span className="sk-github-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* Divider line */}
        <div className="sk-rule" />

        {/* Skills grid */}
        <div className="sk-grid">
          {Object.entries(SKILL_DATA.grouped).map(([category, skills], i) => (
            <CategoryCard key={category} category={category} skills={skills} index={i} />
          ))}
        </div>

        {/* Stats bar */}
        <div className="sk-stats">
          {STATS.map(({ num, label }) => (
            <div key={label} className="sk-stat">
              <div className="sk-stat-num">{num ?? totalSkills}</div>
              <div className="sk-stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="sk-footer-cta">
          <span className="sk-footer-text">Want the full picture?</span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sk-footer-link"
          >
            Explore repositories on GitHub ↗
          </a>
        </div>

      </div>
    </section>
  )
}