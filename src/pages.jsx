import { useState } from 'react'
import { useT } from './LangContext'

/* ─────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────── */
const IcTrendDown = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
    <polyline points="17 18 23 18 23 12"/>
  </svg>
)
const IcWarehouse = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.1a2 2 0 0 1 1.48 0l8 3.1A2 2 0 0 1 22 8.35z"/>
    <polyline points="6 18 6 12 18 12 18 18"/>
    <line x1="12" y1="12" x2="12" y2="18"/>
  </svg>
)
const IcUsers = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IcPackage = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)
const IcBarChart = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)
const IcCalendar = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const IcTarget = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
)
const IcTrendUp = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
)
const IcBriefcase = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)
const IcLayers = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
)
const IcBell = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)

/* ─────────────────────────────────────────
   STATIC STYLE ARRAYS (language-independent)
───────────────────────────────────────── */
const SOLUTION_STYLES = [
  { color: '#FFF8E6', border: '#EDE0B0', accent: '#E05A00', image: '/margin-illu1.png', Icon: null },
  { color: '#EFF6FF', border: '#BFDBFE', accent: '#1A6BBF', image: '/stock-illu2.png', Icon: null },
  { color: '#F0FDF4', border: '#BBF7D0', accent: '#3DAA3D', image: null, Icon: IcUsers },
  { color: '#F5F0FF', border: '#D8C9FB', accent: '#6C5CF5', image: null, Icon: IcLayers },
  { color: '#FFF0F0', border: '#FECACA', accent: '#D03000', image: null, Icon: IcBell },
  { color: '#F6F5F3', border: '#E8E6E2', accent: '#111111', image: null, Icon: IcTrendUp },
]

const USE_CASE_STYLES = [
  { Icon: IcTrendDown, iconBg: '#FFF8E6', iconColor: '#E05A00' },
  { Icon: IcWarehouse, iconBg: '#EFF6FF', iconColor: '#1A6BBF' },
  { Icon: IcUsers,    iconBg: '#F0FDF4', iconColor: '#3DAA3D' },
  { Icon: IcPackage,  iconBg: '#F5F0FF', iconColor: '#6C5CF5' },
  { Icon: IcBarChart, iconBg: '#FFF0F0', iconColor: '#D03000' },
  { Icon: IcCalendar, iconBg: '#F6F5F3', iconColor: '#555' },
]

const PROFILE_STYLES = [
  { color: '#FFF8E6', border: '#EDE0B0', accent: '#E05A00', Icon: IcTarget,    modules: ['Via Clients', 'Via Margin', 'Via Alerts'] },
  { color: '#EFF6FF', border: '#BFDBFE', accent: '#1A6BBF', Icon: IcPackage,   modules: ['Via Stock', 'Via Trends', 'Via Alerts'] },
  { color: '#F0FDF4', border: '#BBF7D0', accent: '#3DAA3D', Icon: IcTrendUp,   modules: ['Via Trends', 'Via Margin', 'Via Categories'] },
  { color: '#F5F0FF', border: '#D8C9FB', accent: '#6C5CF5', Icon: IcBriefcase, modules: ['Via Margin', 'Via Stock', 'Via Trends'] },
]

const RESOURCE_STYLES = [
  { color: '#FFF8E6', border: '#EDE0B0' },
  { color: '#EFF6FF', border: '#BFDBFE' },
  { color: '#F0FDF4', border: '#BBF7D0' },
  { color: '#F5F0FF', border: '#D8C9FB' },
  { color: '#FFF0F0', border: '#FECACA' },
  { color: '#F6F5F3', border: '#E8E6E2' },
]

/* ─────────────────────────────────────────
   BOOKING PAGE (standalone, no navbar)
───────────────────────────────────────── */
export function BookingPage({ onNav }) {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const t = useT()
  const f = t.booking.fields

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/mwvwnalv', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('success') } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  return (
    <div className="booking-page">
      <div className="booking-layout">

        {/* ── Right: Image (first in DOM → top on mobile) ── */}
        <div className="booking-image-col">
          <img src="/demo-image.png" alt="Via workspace" className="booking-side-img" />
          <div className="booking-image-overlay">
            <div className="booking-image-card">
              <p className="booking-image-quote">{t.booking.quote}</p>
              <p className="booking-image-author">{t.booking.quoteAuthor}</p>
            </div>
          </div>
        </div>

        {/* ── Left: Form (second in DOM → below image on mobile) ── */}
        <div className="booking-form-col">
          <button className="booking-back" onClick={() => onNav(null)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            {t.booking.back}
          </button>

          {status === 'success' ? (
            <div className="booking-success">
              <div className="booking-success-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3DAA3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 className="booking-success-title">{t.booking.successTitle}</h3>
              <p className="booking-success-sub">{t.booking.successSub}</p>
              <button className="booking-success-btn" onClick={() => onNav(null)}>{t.booking.successBtn}</button>
            </div>
          ) : (
            <div className="booking-form-wrap">
              <span className="booking-chip">{t.booking.chip}</span>
              <h2 className="booking-title">{t.booking.title}</h2>
              <p className="booking-sub">{t.booking.sub}</p>

              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="booking-row">
                  <div className="booking-field">
                    <label>{f.firstName}</label>
                    <input type="text" name="first_name" placeholder="Marc" required />
                  </div>
                  <div className="booking-field">
                    <label>{f.lastName}</label>
                    <input type="text" name="last_name" placeholder="Lefebvre" required />
                  </div>
                </div>
                <div className="booking-field">
                  <label>{f.email}</label>
                  <input type="email" name="email" placeholder="marc@company.com" required />
                </div>
                <div className="booking-field">
                  <label>{f.company}</label>
                  <input type="text" name="company" placeholder="Lefebvre Distribution" required />
                </div>
                <div className="booking-row">
                  <div className="booking-field">
                    <label>{f.role}</label>
                    <select name="role" required defaultValue="">
                      <option value="" disabled>{f.rolePlaceholder}</option>
                      {f.roles.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="booking-field">
                    <label>{f.teamSize}</label>
                    <select name="team_size" required defaultValue="">
                      <option value="" disabled>{f.teamSizePlaceholder}</option>
                      {f.teamSizes.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="booking-field">
                  <label>{f.challengeLabel} <span className="booking-optional">{f.challengeOptional}</span></label>
                  <textarea name="message" placeholder={f.challengePlaceholder} rows={2} />
                </div>

                {status === 'error' && (
                  <p className="booking-error">{f.error}</p>
                )}

                <button type="submit" className="booking-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? f.sending : f.submit}
                </button>
                <p className="booking-footer-note">{f.footerNote}</p>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

/* Legacy modal — kept for compatibility */
export function BookingModal({ onClose }) {
  return null
}

/* ─────────────────────────────────────────
   INNER PAGE SHELL
───────────────────────────────────────── */
function PageShell({ children, onNav }) {
  const t = useT()
  return (
    <div className="inner-page">
      <button className="inner-back" onClick={() => onNav(null)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        {t.pages.backHome}
      </button>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────
   PAGE: SOLUTIONS
───────────────────────────────────────── */
export function SolutionsPage({ onNav, onBooking }) {
  const t = useT()
  const ps = t.pages.solutions
  const solutions = ps.cards.map((s, i) => ({ ...SOLUTION_STYLES[i], ...s }))

  return (
    <PageShell onNav={onNav}>
      <div className="ip-hero" style={{ background: 'linear-gradient(135deg, #1C1045 0%, #2D1B6B 100%)' }}>
        <div className="container">
          <p className="ip-tag" style={{ color: '#9B7FF5' }}>{ps.tag}</p>
          <h1 className="ip-title" style={{ color: '#fff' }}>{ps.title[0]}<br />{ps.title[1]}</h1>
          <p className="ip-sub" style={{ color: 'rgba(255,255,255,0.7)' }}>{ps.sub}</p>
        </div>
      </div>

      <div className="container ip-body">
        <div className="ip-cards-grid">
          {solutions.map((s) => (
            <div key={s.tag} className="ip-solution-card" style={{ background: s.color, borderColor: s.border }}>
              <div className="ip-solution-photo-slot">
                {s.image
                  ? <img src={s.image} alt={s.tag} className="ip-solution-img" />
                  : <div className="ip-solution-icon-feature" style={{ background: s.accent + '14', color: s.accent }}>
                      <s.Icon size={52} />
                    </div>
                }
              </div>
              <span className="ip-solution-tag" style={{ color: s.accent, borderColor: s.accent + '33', background: s.accent + '10' }}>{s.tag}</span>
              <h3 className="ip-solution-title">{s.title}</h3>
              <p className="ip-solution-body">{s.body}</p>
              <ul className="ip-solution-points">
                {s.points.map(p => (
                  <li key={p}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ip-cta-block">
          <h2 className="ip-cta-title">{ps.ctaTitle}</h2>
          <button className="ip-cta-btn" onClick={onBooking}>{ps.ctaBtn}</button>
        </div>
      </div>
    </PageShell>
  )
}

/* ─────────────────────────────────────────
   PAGE: USE CASES
───────────────────────────────────────── */
export function UseCasesPage({ onNav, onBooking }) {
  const t = useT()
  const pu = t.pages.usecases
  const useCases = pu.items.map((uc, i) => ({ ...USE_CASE_STYLES[i], ...uc }))

  return (
    <PageShell onNav={onNav}>
      <div className="ip-hero" style={{ background: '#F6F5F3' }}>
        <div className="container">
          <p className="ip-tag" style={{ color: '#6C5CF5' }}>{pu.tag}</p>
          <h1 className="ip-title">{pu.title[0]}<br />{pu.title[1]}</h1>
          <p className="ip-sub">{pu.sub}</p>
        </div>
      </div>

      <div className="container ip-body">
        <div className="ip-usecases-list">
          {useCases.map((uc, i) => (
            <div key={i} className="ip-usecase-item">
              <div className="ip-usecase-icon-wrap" style={{ background: uc.iconBg, color: uc.iconColor }}>
                <uc.Icon size={28} />
              </div>
              <div className="ip-usecase-content">
                <h3 className="ip-usecase-title">{uc.title}</h3>
                <div className="ip-usecase-cols">
                  <div>
                    <p className="ip-usecase-label">{pu.challengeLabel}</p>
                    <p className="ip-usecase-text">{uc.challenge}</p>
                  </div>
                  <div>
                    <p className="ip-usecase-label">{pu.solutionLabel}</p>
                    <p className="ip-usecase-text">{uc.solution}</p>
                  </div>
                </div>
                <div className="ip-usecase-result">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3DAA3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {uc.result}
                </div>
              </div>
              <div className="ip-usecase-visual" style={{ background: uc.iconBg, color: uc.iconColor }}>
                <uc.Icon size={56} />
              </div>
            </div>
          ))}
        </div>

        <div className="ip-cta-block">
          <h2 className="ip-cta-title">{pu.ctaTitle}</h2>
          <button className="ip-cta-btn" onClick={onBooking}>{pu.ctaBtn}</button>
        </div>
      </div>
    </PageShell>
  )
}

/* ─────────────────────────────────────────
   PAGE: WHO WE SERVE
───────────────────────────────────────── */
export function WhoWeServePage({ onNav, onBooking }) {
  const t = useT()
  const pw = t.pages.whoweserve
  const profiles = pw.profiles.map((p, i) => ({ ...PROFILE_STYLES[i], ...p }))

  return (
    <PageShell onNav={onNav}>
      <div className="ip-hero" style={{ background: 'linear-gradient(135deg, #0E0C1A 0%, #1C1045 100%)' }}>
        <div className="container">
          <p className="ip-tag" style={{ color: '#9B7FF5' }}>{pw.tag}</p>
          <h1 className="ip-title" style={{ color: '#fff' }}>{pw.title[0]}<br />{pw.title[1]}</h1>
          <p className="ip-sub" style={{ color: 'rgba(255,255,255,0.7)' }}>{pw.sub}</p>
        </div>
      </div>

      <div className="container ip-body">
        <h2 className="ip-section-title">{pw.byRole}</h2>
        <div className="ip-profiles-grid">
          {profiles.map((p, i) => (
            <div key={i} className="ip-profile-card" style={{ background: p.color, borderColor: p.border }}>
              <div className="ip-profile-top">
                <span className="ip-profile-icon" style={{ background: p.accent + '18', color: p.accent }}><p.Icon size={22} /></span>
                <h3 className="ip-profile-role" style={{ color: p.accent }}>{p.role}</h3>
              </div>
              <p className="ip-profile-challenge">{p.challenge}</p>
              <div className="ip-profile-modules">
                {p.modules.map(m => (
                  <span key={m} className="ip-profile-module" style={{ borderColor: p.accent + '40', color: p.accent }}>{m}</span>
                ))}
              </div>
              <p className="ip-profile-quote">{p.quote}</p>
            </div>
          ))}
        </div>

        <h2 className="ip-section-title" style={{ marginTop: 64 }}>{pw.bySector}</h2>
        <div className="ip-sectors-grid">
          {pw.sectors.map((s, i) => (
            <div key={i} className="ip-sector-item">
              <div className="ip-sector-dot" />
              <div>
                <p className="ip-sector-name">{s.name}</p>
                <p className="ip-sector-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ip-cta-block">
          <h2 className="ip-cta-title">{pw.ctaTitle}</h2>
          <button className="ip-cta-btn" onClick={onBooking}>{pw.ctaBtn}</button>
        </div>
      </div>
    </PageShell>
  )
}

/* ─────────────────────────────────────────
   PAGE: RESOURCES
───────────────────────────────────────── */
export function ResourcesPage({ onNav, onBooking }) {
  const t = useT()
  const pr = t.pages.resources
  const resources = pr.items.map((r, i) => ({ ...RESOURCE_STYLES[i], ...r }))

  return (
    <PageShell onNav={onNav}>
      <div className="ip-hero" style={{ background: '#F6F5F3' }}>
        <div className="container">
          <p className="ip-tag" style={{ color: '#6C5CF5' }}>{pr.tag}</p>
          <h1 className="ip-title">{pr.title}</h1>
          <p className="ip-sub">{pr.sub}</p>
        </div>
      </div>

      <div className="container ip-body">
        <div className="ip-resources-grid">
          {resources.map((r, i) => (
            <div key={i} className="ip-resource-card" style={{ background: r.color, borderColor: r.border }}>
              <span className="ip-resource-type">{r.type}</span>
              <h3 className="ip-resource-title">{r.title}</h3>
              <p className="ip-resource-desc">{r.desc}</p>
              <div className="ip-resource-footer">
                <span className="ip-resource-read">{r.readTime}</span>
                <button className="ip-resource-btn" onClick={onBooking}>{pr.readBtn} →</button>
              </div>
            </div>
          ))}
        </div>

        <div className="ip-cta-block">
          <h2 className="ip-cta-title">{pr.ctaTitle}</h2>
          <button className="ip-cta-btn" onClick={onBooking}>{pr.ctaBtn}</button>
        </div>
      </div>
    </PageShell>
  )
}
