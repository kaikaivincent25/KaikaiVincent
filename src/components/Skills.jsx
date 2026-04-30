import { useEffect, useRef, useState } from 'react'

// ─── Static data (no backend needed) ─────────────────────────────────────────
const SKILL_DATA = {
  grouped: {
    'Backend Development': [
      { id: 1, name: 'Python / Django',         proficiency: 82 },
      { id: 2, name: 'Django REST Framework',   proficiency: 78 },
      { id: 3, name: 'JWT Authentication',      proficiency: 75 },
      { id: 4, name: 'RESTful API Design',      proficiency: 80 },
    ],
    'Frontend Development': [
      { id: 5, name: 'React / Vite',            proficiency: 80 },
      { id: 6, name: 'JavaScript (ES6+)',        proficiency: 78 },
      { id: 7, name: 'HTML5 & CSS3',            proficiency: 85 },
      { id: 8, name: 'React Native / Expo',     proficiency: 68 },
    ],
    'Database': [
      { id: 9,  name: 'PostgreSQL',             proficiency: 76 },
      { id: 10, name: 'SQL & Query Design',     proficiency: 74 },
      { id: 11, name: 'Django ORM',             proficiency: 78 },
    ],
    'Cybersecurity': [
      { id: 12, name: 'IS Auditing (ISACA)',    proficiency: 72 },
      { id: 13, name: 'COBIT Framework',        proficiency: 68 },
      { id: 14, name: 'Network Security',       proficiency: 65 },
    ],
  },
}

const GITHUB_URL   = 'https://github.com/kaikaivincent25/'
const DRIVE_URL    = 'https://drive.google.com/drive/folders/1TkMwS4MYf_397mBefe69ihsgW13kSVsO?usp=drive_link'

const CATEGORY_META = {
  'Backend Development':  { icon: '⚙',  accent: '#C9A84C' },
  'Frontend Development': { icon: '🖥',  accent: '#C9A84C' },
  'Database':             { icon: '🗄',  accent: '#C9A84C' },
  'Cybersecurity':        { icon: '🔒',  accent: '#C9A84C' },
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
    <>
      <style>{CSS}</style>
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
    </>
  )
}

// ─── Scoped CSS ───────────────────────────────────────────────────────────────
const CSS = `
/* === SECTION === */
.sk-section {
  background: var(--navy, #0d1b2a);
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

/* Subtle dot-grid background */
.sk-bg-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(201,168,76,0.07) 1px, transparent 1px);
  background-size: 36px 36px;
  pointer-events: none;
}

.sk-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  position: relative;
}

/* === HEADER === */
.sk-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: end;
  margin-bottom: 40px;
}

.sk-eyebrow {
  font-family: var(--font-mono, 'Courier New', monospace);
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold, #C9A84C);
  margin: 0 0 16px;
}

.sk-heading {
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 400;
  line-height: 1.05;
  color: var(--ivory, #F7F4EF);
  margin: 0;
  letter-spacing: -0.02em;
}

.sk-heading-gold {
  color: var(--gold, #C9A84C);
  font-style: italic;
}

.sk-header-desc {
  font-size: 0.95rem;
  color: rgba(247,244,239,0.55);
  line-height: 1.75;
  margin: 0 0 28px;
  max-width: 400px;
}

/* GitHub CTA button */
.sk-github-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 24px;
  background: transparent;
  border: 1px solid rgba(201,168,76,0.5);
  color: var(--gold, #C9A84C);
  font-family: var(--font-mono, monospace);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: background 0.25s, border-color 0.25s, color 0.25s;
}

.sk-github-btn:hover {
  background: var(--gold, #C9A84C);
  border-color: var(--gold, #C9A84C);
  color: var(--navy, #0d1b2a);
}

.sk-github-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.sk-github-arrow {
  margin-left: 2px;
  font-size: 1rem;
}

/* === DIVIDER === */
.sk-rule {
  height: 1px;
  background: linear-gradient(90deg, rgba(201,168,76,0.4), rgba(201,168,76,0.05) 70%, transparent);
  margin-bottom: 40px;
}

/* === SKILLS GRID === */
.sk-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  background: rgba(201,168,76,0.08);
  margin-bottom: 2px;
}

/* === CATEGORY CARD === */
.sk-card {
  background: var(--navy, #0d1b2a);
  padding: 36px 40px;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  animation: sk-fadein 0.55s ease forwards;
  animation-delay: calc(var(--card-index, 0) * 0.1s);
}

@keyframes sk-fadein {
  to { opacity: 1; transform: translateY(0); }
}

.sk-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--gold, #C9A84C), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.sk-card:hover::before {
  opacity: 1;
}

.sk-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(201,168,76,0.15);
}

.sk-card-num {
  font-family: var(--font-mono, monospace);
  font-size: 0.6rem;
  color: rgba(201,168,76,0.35);
  letter-spacing: 0.1em;
  margin-right: 4px;
}

.sk-card-icon {
  font-size: 1rem;
}

.sk-card-title {
  font-family: var(--font-sans, sans-serif);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--ivory, #F7F4EF);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0;
}

.sk-card-body {}

/* === SKILL BARS === */
.sk-skill {
  margin-bottom: 18px;
}

.sk-skill-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  align-items: baseline;
}

.sk-skill-name {
  font-size: 0.875rem;
  color: rgba(247,244,239,0.85);
  font-weight: 400;
  letter-spacing: 0.01em;
}

.sk-skill-pct {
  font-family: var(--font-mono, monospace);
  font-size: 0.68rem;
  color: var(--gold, #C9A84C);
  letter-spacing: 0.06em;
}

.sk-bar-track {
  height: 2px;
  background: rgba(247,244,239,0.06);
  overflow: hidden;
  position: relative;
}

.sk-bar-fill {
  position: absolute;
  inset: 0;
  right: auto;
  background: linear-gradient(90deg, var(--gold, #C9A84C), #e8c76a);
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(201,168,76,0.35);
}

/* === STATS BAR === */
.sk-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: rgba(201,168,76,0.06);
  border: 1px solid rgba(201,168,76,0.12);
  margin-bottom: 32px;
}

.sk-stat {
  padding: 28px 20px;
  text-align: center;
  border-right: 1px solid rgba(201,168,76,0.12);
}

.sk-stat:last-child { border-right: none; }

.sk-stat-num {
  font-family: var(--font-serif, Georgia, serif);
  font-size: 2.6rem;
  font-weight: 400;
  color: var(--gold, #C9A84C);
  line-height: 1;
  margin-bottom: 8px;
}

.sk-stat-label {
  font-family: var(--font-mono, monospace);
  font-size: 0.62rem;
  color: rgba(247,244,239,0.35);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* === FOOTER CTA === */
.sk-footer-cta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(247,244,239,0.06);
}

.sk-footer-text {
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  color: rgba(247,244,239,0.3);
  letter-spacing: 0.06em;
}

.sk-footer-link {
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  color: var(--gold, #C9A84C);
  text-decoration: none;
  letter-spacing: 0.06em;
  border-bottom: 1px solid rgba(201,168,76,0.3);
  transition: border-color 0.2s, color 0.2s;
}

.sk-footer-link:hover {
  color: #e8c76a;
  border-color: #e8c76a;
}

/* === RESPONSIVE === */
@media (max-width: 900px) {
  .sk-header {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .sk-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .sk-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .sk-stat:nth-child(2) { border-right: none; }
  .sk-card { padding: 28px 24px; }
  .sk-footer-cta { flex-direction: column; align-items: flex-start; gap: 8px; }
}
`

export default Skills