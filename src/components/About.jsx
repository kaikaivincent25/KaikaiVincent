import { useApi } from '../hooks/useApi'
import './About.css'

const FALLBACK = {
  name:     'Vincent Kaikai',
  title:    'Junior Software Developer',
  bio:      `Junior software developer with a strong foundation in full-stack web and mobile development 
and a keen interest in cybersecurity. I specialise in building robust, scalable 
applications using modern technologies such as Django REST Framework, React, React Native, and 
PostgreSQL, with a focus on clean architecture and secure system design. My 
background in Business and Information Technology gives me a unique perspective 
on bridging technical solutions with real-world business needs — enabling me to 
build software that is not only functional, but strategically aligned with 
organisational goals. I thrive in collaborative environments and am actively 
seeking opportunities to contribute to innovative, impact-driven projects.`,
  location: 'Nairobi, Kenya',
  email:    'kaikaivincent24@gmail.com',
  github:   'https://github.com/kaikaivincent25',
  linkedin: null,
  cv_url:   null,  // Set CV link once backend is live e.g. '/media/cv/vincent_cv.pdf'
}
// ─────────────────────────────────────────────────────────────────────────────

const getInfoRows = (d) => [
  { label: 'Full Name',      value: d.name },
  /*{ label: 'University',     value: 'Co-operative University of Kenya' },
  { label: 'Programme',      value: 'Bachelor of Business Information Technology' }, */
  { label: 'Specialisation', value: 'Software Development & Business Intergrations' }, 
  { label: 'Location',       value: d.location },
  { label: 'Email',          value: d.email },
  { label: 'Status',         value: 'Available for Internships & Projects' },
]

const HIGHLIGHTS = [
  { icon: '⚙', title: 'Backend',    desc: 'Django REST, PostgreSQL, Python'       },
  { icon: '🖥', title: 'Frontend',   desc: 'React, React Native, JavaScript, Modern CSS'         },
  //{ icon: '🔒', title: 'Security',   desc: 'Network security, Penetration testing' },
  { icon: '☁', title: 'Deployment', desc: 'Render, Vercel, GitHub'  },
]

export default function About() {
  const { data, loading } = useApi('/about/')

  // Use API data if available, otherwise fall back to hardcoded content
  const profile = data || FALLBACK

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about__inner">
          <p className="eyebrow">About Me</p>
          <h2 className="heading-lg">
            Bridging Technology<br />
            <span className="accent-dark">& Security Excellence</span>
          </h2>
          <div className="divider" />

          {/* Show skeleton only while actively loading */}
          {loading ? (
            <div className="about__skeleton-wrap">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="skeleton"
                  style={{ height: '20px', width: i === 3 ? '60%' : '100%' }}
                />
              ))}
            </div>
          ) : (
            <div className="about__grid">

              {/* Left — Bio + Highlights + CTAs */}
              <div>
                <p className="about__bio">{profile.bio}</p>

                <div className="about__highlights">
                  {HIGHLIGHTS.map(({ icon, title, desc }) => (
                    <div key={title} className="about__highlight-card">
                      <div className="about__highlight-icon">{icon}</div>
                      <div className="about__highlight-title">{title}</div>
                      <div className="about__highlight-desc">{desc}</div>
                    </div>
                  ))}
                </div>

                <div className="about__ctas">
                  <a href="#projects" className="about__btn-outline">
                    <span>View My Work</span>
                    <span>→</span>
                  </a>
                  {profile.cv_url && (
                    <a
                      href={profile.cv_url}
                      target="_blank"
                      rel="noreferrer"
                      className="about__btn-primary"
                    >
                      <span>Download Full CV</span>
                      <span>↓</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right — Info table + social links */}
              <div>
                <div className="about__table">
                  <div className="about__table-header">Profile Information</div>
                  {getInfoRows(profile).map(({ label, value }, i) => (
                    <div
                      key={label}
                      className={`about__table-row ${
                        i % 2 === 0
                          ? 'about__table-row--even'
                          : 'about__table-row--odd'
                      }`}
                    >
                      <span className="about__table-label">{label}</span>
                      <span
                        className={`about__table-value ${
                          label === 'Status' ? 'about__table-value--status' : ''
                        }`}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="about__socials">
                  {[
                    { label: 'GitHub',   url: profile.github   },
                    { label: 'LinkedIn', url: profile.linkedin },
                  ].filter(s => s.url).map(s => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="about__social-btn"
                    >
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </section>
  )
}