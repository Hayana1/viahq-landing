import { useState } from 'react'

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
   BOOKING PAGE (standalone, no navbar)
───────────────────────────────────────── */
export function BookingPage({ onNav }) {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

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
              <p className="booking-image-quote">"Via gave us in two hours what we'd been trying to calculate for weeks in Excel."</p>
              <p className="booking-image-author">— Sales Director, Lefebvre Distribution</p>
            </div>
          </div>
        </div>

        {/* ── Left: Form (second in DOM → below image on mobile) ── */}
        <div className="booking-form-col">
          <button className="booking-back" onClick={() => onNav(null)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back
          </button>

          {status === 'success' ? (
            <div className="booking-success">
              <div className="booking-success-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3DAA3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 className="booking-success-title">Request received!</h3>
              <p className="booking-success-sub">We'll get back to you within 24 hours to schedule your demo.</p>
              <button className="booking-success-btn" onClick={() => onNav(null)}>Back to site</button>
            </div>
          ) : (
            <div className="booking-form-wrap">
              <span className="booking-chip">No commitment · 30 min</span>
              <h2 className="booking-title">Book a demo</h2>
              <p className="booking-sub">See Via live on your own data. 30 minutes, no slides — just your ERP exports and real decisions.</p>

              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="booking-row">
                  <div className="booking-field">
                    <label>First name</label>
                    <input type="text" name="first_name" placeholder="Marc" required />
                  </div>
                  <div className="booking-field">
                    <label>Last name</label>
                    <input type="text" name="last_name" placeholder="Lefebvre" required />
                  </div>
                </div>
                <div className="booking-field">
                  <label>Work email</label>
                  <input type="email" name="email" placeholder="marc@company.com" required />
                </div>
                <div className="booking-field">
                  <label>Company name</label>
                  <input type="text" name="company" placeholder="Lefebvre Distribution" required />
                </div>
                <div className="booking-row">
                  <div className="booking-field">
                    <label>Role</label>
                    <select name="role" required defaultValue="">
                      <option value="" disabled>Select your role</option>
                      <option>Sales Director</option>
                      <option>Purchasing Manager</option>
                      <option>Managing Director</option>
                      <option>CFO / Finance</option>
                      <option>Operations Manager</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="booking-field">
                    <label>Team size</label>
                    <select name="team_size" required defaultValue="">
                      <option value="" disabled>Select size</option>
                      <option>1–10</option>
                      <option>10–50</option>
                      <option>50–200</option>
                      <option>200+</option>
                    </select>
                  </div>
                </div>
                <div className="booking-field">
                  <label>What's your main challenge? <span className="booking-optional">(optional)</span></label>
                  <textarea name="message" placeholder="e.g. We can't see which products are destroying our margins..." rows={2} />
                </div>

                {status === 'error' && (
                  <p className="booking-error">Something went wrong. Please try again or email us directly.</p>
                )}

                <button type="submit" className="booking-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Book my demo →'}
                </button>
                <p className="booking-footer-note">No credit card required. We'll reply within 24h.</p>
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
  return (
    <div className="inner-page">
      <button className="inner-back" onClick={() => onNav(null)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to home
      </button>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────
   PAGE: SOLUTIONS
───────────────────────────────────────── */
const SOLUTIONS = [
  {
    tag: 'Via Margin',
    color: '#FFF8E6',
    border: '#EDE0B0',
    accent: '#E05A00',
    title: 'Stop margin erosion before it costs you.',
    body: 'Via Margin cross-references your sales file with your purchasing costs to instantly highlight every product, customer, or category that is destroying your gross margin — with no formula writing.',
    points: ['Identify negative-margin references in seconds', 'Compare margin by customer, category, or period', 'Spot pricing pressure vs. cost increase'],
    image: '/margin-illu1.png',
    Icon: null,
  },
  {
    tag: 'Via Stock',
    color: '#EFF6FF',
    border: '#BFDBFE',
    accent: '#1A6BBF',
    title: 'Unlock the cash sleeping in your warehouse.',
    body: 'Via Stock maps your inventory rotation and flags every dormant SKU. Know exactly how much capital is tied up, which references to destock, and what to reorder before you run out.',
    points: ['Dormant stock detection by age & value', 'Stockout risk identification', 'Overstock and reorder priority list'],
    image: '/stock-illu2.png',
    Icon: null,
  },
  {
    tag: 'Via Clients',
    color: '#F0FDF4',
    border: '#BBF7D0',
    accent: '#3DAA3D',
    title: 'See which accounts are silently leaving.',
    body: 'Via Clients segments your customer base automatically — growing, stable, declining, churning. Know who to call before they reduce orders or leave entirely.',
    points: ['Automatic customer segmentation', 'Declining account alerts', 'Re-engagement priority list'],
    image: null,
    Icon: IcUsers,
  },
  {
    tag: 'Via Categories',
    color: '#F5F0FF',
    border: '#D8C9FB',
    accent: '#6C5CF5',
    title: 'Benchmark every product family.',
    body: 'Via Categories ranks your product families by margin, rotation, and growth. Know which categories to push, which to reprice, and which to phase out.',
    points: ['Category performance ranking', 'Cross-family margin comparison', 'Growth vs. decline detection'],
    image: null,
    Icon: IcLayers,
  },
  {
    tag: 'Via Alerts',
    color: '#FFF0F0',
    border: '#FECACA',
    accent: '#D03000',
    title: 'Your next 5 actions, already prioritized.',
    body: 'Via Alerts reads across all your data and surfaces the highest-priority actions for your team — pricing fixes, reorder alerts, accounts to call — ranked by financial impact.',
    points: ['Cross-module priority scoring', 'Sales & purchasing action items', 'Daily or weekly digest mode'],
    image: null,
    Icon: IcBell,
  },
  {
    tag: 'Via Trends',
    color: '#F6F5F3',
    border: '#E8E6E2',
    accent: '#111111',
    title: 'Track margin over time, not just today.',
    body: 'Via Trends overlays multiple years of your ERP exports to show margin evolution, seasonal patterns, and long-term drift — without any BI tool or data team.',
    points: ['Multi-year margin trend lines', 'Seasonal pattern detection', 'Year-over-year comparison by reference'],
    image: null,
    Icon: IcTrendUp,
  },
]

export function SolutionsPage({ onNav, onBooking }) {
  return (
    <PageShell onNav={onNav}>
      <div className="ip-hero" style={{ background: 'linear-gradient(135deg, #1C1045 0%, #2D1B6B 100%)' }}>
        <div className="container">
          <p className="ip-tag" style={{ color: '#9B7FF5' }}>Solutions</p>
          <h1 className="ip-title" style={{ color: '#fff' }}>Six modules.<br />One decision layer.</h1>
          <p className="ip-sub" style={{ color: 'rgba(255,255,255,0.7)' }}>Import your ERP export once. Via splits the work across six analysis modules — each focused on a specific decision your team needs to make.</p>
        </div>
      </div>

      <div className="container ip-body">
        <div className="ip-cards-grid">
          {SOLUTIONS.map((s) => (
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
          <h2 className="ip-cta-title">Ready to see all six modules on your data?</h2>
          <button className="ip-cta-btn" onClick={onBooking}>Book a free demo →</button>
        </div>
      </div>
    </PageShell>
  )
}

/* ─────────────────────────────────────────
   PAGE: USE CASES
───────────────────────────────────────── */
const USE_CASES = [
  {
    Icon: IcTrendDown,
    iconBg: '#FFF8E6',
    iconColor: '#E05A00',
    title: 'Analyze margins product by product',
    challenge: 'You know your global margin, but not which products are dragging it down. Every month you suspect a few references — but Excel cross-referencing takes two days.',
    solution: 'Upload your sales and purchasing files. Via Margin flags every negative-margin reference, ranked by financial impact. You see the problem in minutes.',
    result: '+2.4 pts average margin recovery in the first quarter.',
  },
  {
    Icon: IcWarehouse,
    iconBg: '#EFF6FF',
    iconColor: '#1A6BBF',
    title: 'Identify dormant stock and free up cash',
    challenge: "$300K sitting in the warehouse, rotating every 18 months. You don't know which references, and your ERP report takes an hour to run.",
    solution: 'Via Stock maps rotation by SKU and highlights the capital locked in slow-moving inventory — by category, supplier, and age.',
    result: 'Average €180K recovered in the first destocking campaign.',
  },
  {
    Icon: IcUsers,
    iconBg: '#F0FDF4',
    iconColor: '#3DAA3D',
    title: 'Prioritize accounts before quarterly review',
    challenge: 'You have 200 customers. Which ones are growing? Which ones silently reduced orders? Which ones are about to churn?',
    solution: 'Via Clients segments your entire customer base automatically from your order file — no CRM required. Declining accounts get flagged before they leave.',
    result: '7 at-risk accounts identified and re-engaged per cycle on average.',
  },
  {
    Icon: IcPackage,
    iconBg: '#F5F0FF',
    iconColor: '#6C5CF5',
    title: 'Optimize purchasing before supplier orders',
    challenge: 'Ordering too much means dead stock. Too little means stockouts. Cross-referencing sales velocity with current stock in Excel takes all morning.',
    solution: 'Via cross-references your inventory and sales files to give you a ranked reorder list — with estimated runout dates per reference.',
    result: '23% reduction in emergency restocking orders.',
  },
  {
    Icon: IcBarChart,
    iconBg: '#FFF0F0',
    iconColor: '#D03000',
    title: 'Prepare your monthly sales review',
    challenge: 'Your monthly review takes 2 days to prepare. Sales by rep, by customer, by category — three different Excel files, manual formulas, copy-paste.',
    solution: 'Import once. Via generates every view you need — by rep, by customer, by product family — in minutes, ready to present.',
    result: 'Preparation time cut from 2 days to 20 minutes.',
  },
  {
    Icon: IcCalendar,
    iconBg: '#F6F5F3',
    iconColor: '#555',
    title: 'Spot margin erosion over multiple years',
    challenge: "Margin was 24% three years ago. Now it's 21%. Where did the 3 points go? You need multi-year data but your BI tool requires your data team.",
    solution: 'Upload 2–3 years of ERP exports. Via Trends layers them automatically and shows exactly which categories, customers, and references lost margin — and when.',
    result: 'Root cause of margin erosion identified in one session.',
  },
]

export function UseCasesPage({ onNav, onBooking }) {
  return (
    <PageShell onNav={onNav}>
      <div className="ip-hero" style={{ background: '#F6F5F3' }}>
        <div className="container">
          <p className="ip-tag" style={{ color: '#6C5CF5' }}>Use cases</p>
          <h1 className="ip-title">Real decisions.<br />Real results.</h1>
          <p className="ip-sub">How sales and purchasing teams in B2B distribution use Via every day.</p>
        </div>
      </div>

      <div className="container ip-body">
        <div className="ip-usecases-list">
          {USE_CASES.map((uc, i) => (
            <div key={i} className="ip-usecase-item">
              <div className="ip-usecase-icon-wrap" style={{ background: uc.iconBg, color: uc.iconColor }}>
                <uc.Icon size={28} />
              </div>
              <div className="ip-usecase-content">
                <h3 className="ip-usecase-title">{uc.title}</h3>
                <div className="ip-usecase-cols">
                  <div>
                    <p className="ip-usecase-label">The challenge</p>
                    <p className="ip-usecase-text">{uc.challenge}</p>
                  </div>
                  <div>
                    <p className="ip-usecase-label">Via's approach</p>
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
          <h2 className="ip-cta-title">Your use case isn't listed? Let's talk.</h2>
          <button className="ip-cta-btn" onClick={onBooking}>Book a free demo →</button>
        </div>
      </div>
    </PageShell>
  )
}

/* ─────────────────────────────────────────
   PAGE: WHO WE SERVE
───────────────────────────────────────── */
const PROFILES = [
  {
    role: 'Sales Director',
    color: '#FFF8E6',
    border: '#EDE0B0',
    accent: '#E05A00',
    Icon: IcTarget,
    challenge: 'You manage a team, a territory, and a number. You need to know which accounts to prioritize, which products to push, and where your margin is leaking — without spending two days in Excel.',
    modules: ['Via Clients', 'Via Margin', 'Via Alerts'],
    quote: '"Via gave us in two hours what we\'d been trying to calculate for weeks." — Marc, Sales Director',
  },
  {
    role: 'Purchasing Manager',
    color: '#EFF6FF',
    border: '#BFDBFE',
    accent: '#1A6BBF',
    Icon: IcPackage,
    challenge: 'You order too much of some things, not enough of others. You know the dormant stock is a problem but you can\'t see it clearly. You need priorities before every supplier negotiation.',
    modules: ['Via Stock', 'Via Trends', 'Via Alerts'],
    quote: '"We used to spend two days a month on this. Now it\'s 20 minutes." — Sophie, Purchasing Manager',
  },
  {
    role: 'Managing Director',
    color: '#F0FDF4',
    border: '#BBF7D0',
    accent: '#3DAA3D',
    Icon: IcTrendUp,
    challenge: 'You want the big picture. Is margin improving or eroding? Which part of the business is growing? Where is cash tied up? You need answers before the board meeting — not a BI project.',
    modules: ['Via Trends', 'Via Margin', 'Via Categories'],
    quote: '"Via identified €180K in dormant stock we weren\'t seeing." — Thomas, Managing Director',
  },
  {
    role: 'CFO / Finance',
    color: '#F5F0FF',
    border: '#D8C9FB',
    accent: '#6C5CF5',
    Icon: IcBriefcase,
    challenge: 'You monitor the P&L but the detail is in the ERP. Gross margin by product, working capital tied in inventory, customer credit risk — you need this monthly, fast.',
    modules: ['Via Margin', 'Via Stock', 'Via Trends'],
    quote: '"For the first time we had a clear view of margin by customer segment." — Isabelle, CFO',
  },
]

const SECTORS = [
  { name: 'Industrial distribution', desc: 'Tools, consumables, MRO, safety equipment' },
  { name: 'Food & beverage distribution', desc: 'Perishables, rotation-sensitive SKUs' },
  { name: 'Electrical & technical', desc: 'High-SKU-count, margin-sensitive categories' },
  { name: 'Office & facilities', desc: 'High client count, stable order patterns' },
  { name: 'Medical & pharma distribution', desc: 'Compliance-sensitive, margin tracking' },
  { name: 'Construction materials', desc: 'Project-driven demand, supplier cost volatility' },
]

export function WhoWeServePage({ onNav, onBooking }) {
  return (
    <PageShell onNav={onNav}>
      <div className="ip-hero" style={{ background: 'linear-gradient(135deg, #0E0C1A 0%, #1C1045 100%)' }}>
        <div className="container">
          <p className="ip-tag" style={{ color: '#9B7FF5' }}>Who we serve</p>
          <h1 className="ip-title" style={{ color: '#fff' }}>Built for the people<br />closest to the numbers.</h1>
          <p className="ip-sub" style={{ color: 'rgba(255,255,255,0.7)' }}>Via is designed for B2B distribution teams — sales, purchasing, and management — who need decisions, not dashboards.</p>
        </div>
      </div>

      <div className="container ip-body">
        <h2 className="ip-section-title">By role</h2>
        <div className="ip-profiles-grid">
          {PROFILES.map((p) => (
            <div key={p.role} className="ip-profile-card" style={{ background: p.color, borderColor: p.border }}>
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

        <h2 className="ip-section-title" style={{ marginTop: 64 }}>By sector</h2>
        <div className="ip-sectors-grid">
          {SECTORS.map((s) => (
            <div key={s.name} className="ip-sector-item">
              <div className="ip-sector-dot" />
              <div>
                <p className="ip-sector-name">{s.name}</p>
                <p className="ip-sector-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ip-cta-block">
          <h2 className="ip-cta-title">Is Via right for your team?</h2>
          <button className="ip-cta-btn" onClick={onBooking}>Let's find out — book a demo →</button>
        </div>
      </div>
    </PageShell>
  )
}

/* ─────────────────────────────────────────
   PAGE: RESOURCES
───────────────────────────────────────── */
const RESOURCES = [
  {
    type: 'Guide',
    color: '#FFF8E6',
    border: '#EDE0B0',
    title: 'The complete guide to margin analysis in B2B distribution',
    desc: 'A step-by-step walkthrough of how to identify margin erosion in your product catalog — from ERP export to action plan.',
    readTime: '8 min read',
  },
  {
    type: 'Guide',
    color: '#EFF6FF',
    border: '#BFDBFE',
    title: 'How to calculate stock rotation and identify dormant inventory',
    desc: 'The formulas, methods, and thresholds used by distribution teams to classify slow-moving vs. dormant stock.',
    readTime: '6 min read',
  },
  {
    type: 'Case study',
    color: '#F0FDF4',
    border: '#BBF7D0',
    title: 'How Lefebvre Distribution recovered €180K in dormant stock',
    desc: 'From initial ERP export to destocking campaign — a real case study of a 45-person industrial distributor.',
    readTime: '5 min read',
  },
  {
    type: 'Checklist',
    color: '#F5F0FF',
    border: '#D8C9FB',
    title: 'Monthly sales review checklist for distribution teams',
    desc: '12 questions to answer before your monthly review, and where in Via to find each answer.',
    readTime: '3 min read',
  },
  {
    type: 'Guide',
    color: '#FFF0F0',
    border: '#FECACA',
    title: 'Customer segmentation without a CRM',
    desc: 'How to classify your accounts into growing, stable, declining, and churning — using only your order history file.',
    readTime: '7 min read',
  },
  {
    type: 'Webinar',
    color: '#F6F5F3',
    border: '#E8E6E2',
    title: 'Live demo: From ERP export to margin analysis in 20 minutes',
    desc: 'Watch a complete Via session — file upload, margin scan, stock rotation, client segmentation — on a real dataset.',
    readTime: '22 min watch',
  },
]

export function ResourcesPage({ onNav, onBooking }) {
  return (
    <PageShell onNav={onNav}>
      <div className="ip-hero" style={{ background: '#F6F5F3' }}>
        <div className="container">
          <p className="ip-tag" style={{ color: '#6C5CF5' }}>Resources</p>
          <h1 className="ip-title">Learn. Decide. Act.</h1>
          <p className="ip-sub">Guides, case studies, and checklists for B2B distribution teams who want to get more from their ERP data.</p>
        </div>
      </div>

      <div className="container ip-body">
        <div className="ip-resources-grid">
          {RESOURCES.map((r, i) => (
            <div key={i} className="ip-resource-card" style={{ background: r.color, borderColor: r.border }}>
              <span className="ip-resource-type">{r.type}</span>
              <h3 className="ip-resource-title">{r.title}</h3>
              <p className="ip-resource-desc">{r.desc}</p>
              <div className="ip-resource-footer">
                <span className="ip-resource-read">{r.readTime}</span>
                <button className="ip-resource-btn" onClick={onBooking}>Read →</button>
              </div>
            </div>
          ))}
        </div>

        <div className="ip-cta-block">
          <h2 className="ip-cta-title">Want a live walkthrough with your own data?</h2>
          <button className="ip-cta-btn" onClick={onBooking}>Book a free demo →</button>
        </div>
      </div>
    </PageShell>
  )
}

