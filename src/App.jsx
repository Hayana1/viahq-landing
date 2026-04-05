import { useState, useEffect, useRef } from 'react'
import './App.css'
import { Waves } from './components/wave-background'
import {
  BookingPage,
  SolutionsPage,
  UseCasesPage,
  WhoWeServePage,
  ResourcesPage,
  PricingPage,
} from './pages'

/* ─────────────────────────────────────────
   SVG ICON COMPONENTS
───────────────────────────────────────── */
const IconCrosshair = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
  </svg>
)

const IconBox = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)

const IconUsers = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const IconCart = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
)

const IconWrench = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
)

const IconLayers = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>
)

const IconSettings = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
)

const IconShield = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const IconZap = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

const IconGrid = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
)

const IconCalendar = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const IconBarChart = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)

const IconBell = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)

const IconAlertTriangle = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

/* ─────────────────────────────────────────
   CTA PIXEL BUTTON
───────────────────────────────────────── */
function CtaPixelButton({ label = "Let's go", onClick }) {
  return (
    <button className="cta-pixel-btn" onClick={onClick} type="button">
      <span className="cta-pixel-text">{label}</span>
      <span className="cta-pixel-icon">
        <svg width={16} height={19} viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="1.61321" cy="1.61321" r="1.5" fill="black" />
          <circle cx="5.73583" cy="1.61321" r="1.5" fill="black" />
          <circle cx="5.73583" cy="5.5566"  r="1.5" fill="black" />
          <circle cx="9.85851" cy="5.5566"  r="1.5" fill="black" />
          <circle cx="9.85851" cy="9.5"     r="1.5" fill="black" />
          <circle cx="13.9811" cy="9.5"     r="1.5" fill="black" />
          <circle cx="5.73583" cy="13.4434" r="1.5" fill="black" />
          <circle cx="9.85851" cy="13.4434" r="1.5" fill="black" />
          <circle cx="1.61321" cy="17.3868" r="1.5" fill="black" />
          <circle cx="5.73583" cy="17.3868" r="1.5" fill="black" />
        </svg>
      </span>
    </button>
  )
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
const NAV_PAGES = ['Solutions', 'Use cases', 'Who we serve', 'Resources', 'Pricing']

function Navbar({ onNav, onBooking }) {
  const [open, setOpen] = useState(false)

  function handleNav(item) {
    onNav(item)
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <button className="nav-logo" onClick={() => onNav(null)}>via.</button>

        <ul className="nav-links">
          {NAV_PAGES.map(item => (
            <li key={item}>
              <button onClick={() => handleNav(item)}>
                {item}
                {item !== 'Pricing' && (
                  <svg className="nav-chevron" viewBox="0 0 14 14" fill="none">
                    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <span className="nav-lang">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M7 1C7 1 5 4 5 7C5 10 7 13 7 13" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M7 1C7 1 9 4 9 7C9 10 7 13 7 13" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M1 7H13" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
            EN
          </span>
          <button className="nav-login" onClick={onBooking}>Log in</button>
          <button className="btn-demo" onClick={onBooking}>Request a demo</button>
        </div>

        <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="nav-mobile-menu">
          <ul className="nav-mobile-links">
            {NAV_PAGES.map(item => (
              <li key={item}><button onClick={() => handleNav(item)}>{item}</button></li>
            ))}
          </ul>
          <div className="nav-mobile-actions">
            <button className="nav-login" onClick={onBooking}>Log in</button>
            <button className="btn-demo" onClick={onBooking}>Request a demo</button>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ─────────────────────────────────────────
   HERO TESTIMONIAL AUTO-SCROLL
───────────────────────────────────────── */
const HERO_TESTIS = [
  {
    company: 'Groupe Lefebvre Distribution',
    quote: '"Via gave us in two hours what we\'d been trying to calculate for weeks in Excel."',
    author: '— Sales Director, Lefebvre Distribution',
  },
  {
    company: 'Groupe Techni-Pro',
    quote: '"We used to spend two days a month on this. Now it\'s 20 minutes, and we can actually see where to act."',
    author: '— Purchasing Manager, Groupe Techni-Pro',
  },
  {
    company: 'Delta Fournitures',
    quote: '"Via identified $180K in dormant stock we weren\'t seeing. We recovered that cash in six weeks."',
    author: '— Managing Director, Delta Fournitures',
  },
]

function HeroTestiCard() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)

  function startTimer() {
    timerRef.current = setInterval(() => {
      setIdx(i => (i + 1) % HERO_TESTIS.length)
    }, 4000)
  }

  useEffect(() => {
    if (!paused) startTimer()
    return () => clearInterval(timerRef.current)
  }, [paused])

  function goTo(i) {
    clearInterval(timerRef.current)
    setIdx(i)
    if (!paused) startTimer()
  }

  const t = HERO_TESTIS[idx]

  return (
    <div className="hero-testi-card">
      <div className="testi-card-header">
        <div className="testi-card-logo-pill">{t.company}</div>
        <button
          className="testi-pause"
          onClick={() => setPaused(p => !p)}
          title={paused ? 'Resume' : 'Pause'}
        >
          {paused ? '▶' : '⏸'}
        </button>
      </div>
      <div className="testi-stars">★★★★★</div>
      <p className="testi-quote" key={idx} style={{ animation: 'testi-fade 0.35s ease' }}>
        {t.quote}
      </p>
      <div className="testi-footer">
        <p className="testi-author">{t.author}</p>
        <div className="testi-dots">
          {HERO_TESTIS.map((_, i) => (
            <button
              key={i}
              className={`testi-dot${i === idx ? ' active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function HeroMonitor() {
  return (
    <div className="hero-monitor">
      <div className="monitor-stand-top">
        <div className="monitor-bar">
          <div className="monitor-dot" />
          <div className="monitor-dot" />
          <div className="monitor-dot" />
        </div>
        <div className="monitor-screen">
          <div className="ms-top-bar">
            <div className="ms-logo-pill">Margins — Q4 2024</div>
          </div>
          <div className="ms-rows">
            <div className="ms-row w80 accent" />
            <div className="ms-row w60" />
            <div className="ms-row w90" />
            <div className="ms-row w60" />
          </div>
          <div className="ms-grid">
            <div className="ms-card" />
            <div className="ms-card" />
            <div className="ms-card" />
            <div className="ms-card" />
          </div>
        </div>
      </div>
      <div className="monitor-chin" />
    </div>
  )
}

const HERO_SLIDES = [
  { src: '/mac-hero.png', alt: 'Mac dashboard' },
  { src: '/main-hero.png', alt: 'Mobile app' },
  { src: '/tableau-hero.png', alt: 'Performance overview' },
]

function HeroSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_SLIDES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="hero-slideshow">
      {HERO_SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`hero-right-image hero-slide${i === current ? ' hero-slide-active' : ''}`}
        />
      ))}
      <div className="hero-slide-dots">
        {HERO_SLIDES.map((_, i) => (
          <span
            key={i}
            className={`hero-slide-dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  )
}

function HeroSection({ onBooking }) {
  return (
    <div className="hero-wrapper">
      <div className="container">
        <div className="hero">
          {/* Left — dark purple */}
          <div className="hero-left">
            <Waves
              backgroundColor="#1C1045"
              strokeColor="rgba(155, 127, 245, 0.2)"
              pointerSize={0.6}
            />
            <div className="hero-left-content">
            <div className="hero-chip">
              No integration required. Import your first file now.
              <span className="hero-chip-arrow">›</span>
            </div>
            <h1 className="hero-h1">
              Your ERP exports<br />into clear<br />decisions,<br /><em>in minutes.</em>
            </h1>
            <p className="hero-sub">
              Margin, stock, and clients for B2B distributors. No ERP to replace. No IT project. Just clarity.
            </p>
            <CtaPixelButton label="Let's go" onClick={onBooking} />
            </div>
          </div>

          {/* Right — dark with slideshow + auto-scroll testimonial */}
          <div className="hero-right">
            <HeroSlideshow />
            <HeroTestiCard />
            <div className="hero-d-badge">v.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   LOGOS
───────────────────────────────────────── */
const LOGOS = [
  { name: 'Rexel',      style: { fontWeight: 800 } },
  { name: 'Würth',      style: { fontWeight: 700 } },
  { name: 'DESCOURS',   style: { fontWeight: 700, letterSpacing: '1px' } },
  { name: 'Sonepar',    style: { fontWeight: 700 } },
  { name: 'LYRECO',     style: { fontWeight: 800, letterSpacing: '1px' } },
  { name: 'Manutan',    style: { fontWeight: 700 } },
  { name: 'Raja',       style: { fontWeight: 800, fontStyle: 'italic' } },
  { name: 'Berner',     style: { fontWeight: 700 } },
  { name: 'Staples',    style: { fontWeight: 700 } },
  { name: 'HOFFMANN',   style: { fontWeight: 800, letterSpacing: '1px' } },
  { name: 'Hagemeyer',  style: { fontWeight: 700 } },
  { name: 'Unimarket',  style: { fontWeight: 700 } },
  { name: 'METRO',      style: { fontWeight: 800, letterSpacing: '2px' } },
]

function LogosSection() {
  return (
    <div className="logos-section">
      <p className="logos-label container">
        Used by sales and purchasing teams across B2B distribution
      </p>
      <div className="container">
        <div className="logos-grid">
          {LOGOS.map((l, i) => (
            <div key={i} className="logo-item" style={l.style}>{l.name}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   PRODUCT CARDS — UI Mockups
───────────────────────────────────────── */
function MarginUI() {
  const rows = [
    { ref: 'Ref. A-4421', margin: '-3.2%', dir: '↓', neg: true },
    { ref: 'Ref. B-1190', margin: '+18.4%', dir: '↑', neg: false },
    { ref: 'Ref. C-8812', margin: '-7.1%', dir: '↓', neg: true },
  ]
  return (
    <div className="card-ui">
      <div className="margin-ui">
        {rows.map((r, i) => (
          <div key={i} className="margin-row">
            <div className="margin-ref-wrap">
              <div className="margin-dot" style={{ background: r.neg ? '#D03000' : '#3DAA3D' }} />
              <span className="margin-ref">{r.ref}</span>
            </div>
            <div className="margin-badge" style={{
              background: r.neg ? '#FFF0F0' : '#F0FFF4',
              color: r.neg ? '#D03000' : '#3DAA3D',
            }}>
              {r.margin} {r.dir}
            </div>
          </div>
        ))}
        <div className="margin-cta">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          View all margins
        </div>
      </div>
    </div>
  )
}

function StockUI() {
  const heights = [35, 55, 30, 70, 85, 40, 60, 90, 45, 75, 65, 80]
  return (
    <div className="card-ui">
      <div className="stock-ui">
        <div className="stock-header">
          <div>
            <div className="stock-amount">$240K</div>
            <div className="stock-label">tied up in dormant stock</div>
          </div>
          <div className="stock-badge">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
            +90 days
          </div>
        </div>
        <div className="stock-chart">
          {heights.map((h, i) => (
            <div key={i} className={`stock-bar${i >= 8 ? ' dormant' : ''}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="stock-legend">
          <span className="stock-legend-item"><span className="stock-legend-dot active" />Active</span>
          <span className="stock-legend-item"><span className="stock-legend-dot dormant" />Dormant</span>
        </div>
      </div>
    </div>
  )
}

function ClientUI() {
  const segments = [
    { color: '#3DAA3D', bg: '#F0FFF4', label: 'Growing accounts',   count: 14, total: 59 },
    { color: '#5B9CF6', bg: '#EFF6FF', label: 'Stable accounts',    count: 38, total: 59 },
    { color: '#D03000', bg: '#FFF0F0', label: 'Declining accounts', count: 7,  total: 59 },
  ]
  return (
    <div className="card-ui">
      <div className="client-ui">
        {segments.map((r, i) => (
          <div key={i} className="client-row">
            <div className="client-row-top">
              <div className="client-dot" style={{ background: r.color }} />
              <span className="client-label">{r.label}</span>
              <span className="client-count" style={{ color: r.color }}>{r.count} clients</span>
            </div>
            <div className="client-bar-track">
              <div className="client-bar-fill" style={{ width: `${(r.count / r.total) * 100}%`, background: r.color + '33', borderRight: `2px solid ${r.color}` }} />
            </div>
          </div>
        ))}
        <div className="client-arrow">→</div>
      </div>
    </div>
  )
}

function CategoryUI() {
  const items = [
    { icon: <IconBox size={13} />,      name: 'Consumables', tag: 'Strong',    tagColor: '#3DAA3D', tagBg: '#F0FFF4' },
    { icon: <IconWrench size={13} />,   name: 'Tools',       tag: 'Dormant',   tagColor: '#888',    tagBg: '#F4F4F4' },
    { icon: <IconLayers size={13} />,   name: 'Packaging',   tag: 'Declining', tagColor: '#D03000', tagBg: '#FFF0F0' },
    { icon: <IconSettings size={13} />, name: 'Equipment',   tag: 'Growth',    tagColor: '#1A6BBF', tagBg: '#EFF6FF' },
    { icon: <IconShield size={13} />,   name: 'Safety',      tag: 'Stable',    tagColor: '#5B9CF6', tagBg: '#EFF6FF' },
    { icon: <IconZap size={13} />,      name: 'Electrical',  tag: 'Strong',    tagColor: '#3DAA3D', tagBg: '#F0FFF4' },
  ]
  return (
    <div className="card-ui">
      <div className="cat-grid">
        {items.map((b, i) => (
          <div key={i} className="cat-item">
            <div className="cat-icon" style={{ color: b.tagColor, background: b.tagBg }}>{b.icon}</div>
            <div className="cat-name">{b.name}</div>
            <div className="cat-tag" style={{ color: b.tagColor }}>{b.tag}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AlertUI() {
  const rows = [
    { label: 'Review pricing Ref. C-8812', tag: 'URGENT',   tagColor: '#D03000', tagBg: '#FFF0F0', icon: '🔴' },
    { label: 'Restock Tools category',     tag: 'PRIORITY', tagColor: '#9A4A00', tagBg: '#FFE8C8', icon: '🟠' },
  ]
  return (
    <div className="card-ui">
      <div className="alert-ui">
        <div className="alert-thead">
          <span>PRIORITY ACTION</span>
          <span>STATUS</span>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="alert-row">
            <div className="alert-row-left">
              <div className="alert-dot" style={{ background: r.tagColor }} />
              <span className="alert-label">{r.label}</span>
            </div>
            <span className="alert-tag" style={{ color: r.tagColor, background: r.tagBg }}>{r.tag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TrendUI() {
  const years = [
    { year: '2022', pct: '24.1%', val: 24.1 },
    { year: '2023', pct: '22.8%', val: 22.8 },
    { year: '2024', pct: '21.3%', val: 21.3 },
  ]
  const max = 25
  return (
    <div className="card-ui">
      <div className="trend-ui">
        <div className="trend-label">Gross margin trend</div>
        <div className="trend-bars">
          {years.map((r, i) => (
            <div key={i} className="trend-col">
              <div className="trend-pct" style={{ color: i === 0 ? 'var(--body)' : '#D03000' }}>{r.pct}</div>
              <div className="trend-bar-track">
                <div className="trend-bar-fill" style={{
                  height: `${(r.val / max) * 100}%`,
                  background: i === 0 ? '#7C5CF5' : (i === 1 ? '#E05A00' : '#D03000'),
                  opacity: 0.75 + i * 0.08,
                }} />
              </div>
              <div className="trend-year">{r.year}</div>
            </div>
          ))}
        </div>
        <div className="trend-erosion">
          <IconAlertTriangle size={11} />
          <span>Erosion detected — <strong>−2.8 pts</strong></span>
        </div>
      </div>
    </div>
  )
}

const PRODUCT_CARDS = [
  {
    title: 'Via Margin',
    sub: 'Identify the products destroying your margin.',
    UI: MarginUI,
  },
  {
    title: 'Via Stock',
    sub: 'Spot the capital tied up in dormant inventory.',
    UI: StockUI,
  },
  {
    title: 'Via Clients',
    sub: 'See which segments and accounts are slowing down.',
    UI: ClientUI,
  },
  {
    title: 'Via Categories',
    sub: 'Compare performance by product family.',
    UI: CategoryUI,
  },
  {
    title: 'Via Alerts',
    sub: 'Prioritize your next sales and purchasing actions.',
    UI: AlertUI,
  },
  {
    title: 'Via Trends',
    sub: 'Track margin evolution year over year.',
    UI: TrendUI,
  },
]

function GlobalPlatformSection({ onBooking }) {
  return (
    <section className="platform-section">
      <div className="container">
        <p className="section-label">What Via does</p>
        <h2 className="section-heading">The decision layer for B2B distribution</h2>
        <div className="cards-grid">
          {PRODUCT_CARDS.map(({ title, sub, UI }) => (
            <div key={title} className="product-card">
              <h3 className="card-title">{title}</h3>
              <p className="card-sub">{sub}</p>
              <UI />
            </div>
          ))}
        </div>

        <div className="platform-cta">
          <p className="platform-cta-text">
            Six modules. One upload.<br />
            <span>Your first analysis ready in minutes.</span>
          </p>
          <div className="platform-cta-actions">
            <CtaPixelButton label="Start for free" onClick={onBooking} />
            <button className="btn-outline-dark" onClick={onBooking}>See a live demo</button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SPEED SECTION
───────────────────────────────────────── */
const SPEED_TABS = [
  {
    id: 'margin', icon: <IconCrosshair />, label: 'Via Margin',
    cardBg: '#FFF8E6', cardBorder: '#EDE0B0',
    steps: [
      { col: 'Now',           card: 'Import your ERP sales file' },
      { col: 'A few minutes', card: 'Negative-margin products are identified' },
      { col: 'Today',         card: 'Fix pricing on 3 key references' },
    ],
  },
  {
    id: 'stock', icon: <IconBox />, label: 'Via Stock',
    cardBg: '#EFF6FF', cardBorder: '#BFDBFE',
    steps: [
      { col: 'Now',           card: 'Load your inventory export' },
      { col: 'A few minutes', card: '$240K in dormant stock highlighted' },
      { col: 'This week',     card: 'Launch a targeted destocking action' },
    ],
  },
  {
    id: 'clients', icon: <IconUsers />, label: 'Via Clients',
    cardBg: '#F0FDF4', cardBorder: '#BBF7D0',
    steps: [
      { col: 'Now',           card: 'Add your clients and orders file' },
      { col: 'A few minutes', card: '7 declining accounts detected automatically' },
      { col: 'This week',     card: 'Re-engage the right accounts at the right time' },
    ],
  },
  {
    id: 'purchasing', icon: <IconCart />, label: 'Via Purchasing',
    cardBg: '#F5F0FF', cardBorder: '#D8C9FB',
    steps: [
      { col: 'Now',           card: 'Cross-reference sales and stock in one upload' },
      { col: 'A few minutes', card: 'Stockout and overstock risks identified' },
      { col: 'Today',         card: 'Prioritize your 5 urgent supplier orders' },
    ],
  },
]

function SpeedSection() {
  const [active, setActive] = useState('stock')
  const tab = SPEED_TABS.find(t => t.id === active)

  return (
    <section className="speed-section">
      <div className="container">
        <p className="section-label">Via Speed</p>
        <h2 className="section-heading">From raw export to clear decision in minutes</h2>

        <div className="speed-tabs">
          {SPEED_TABS.map(t => (
            <button
              key={t.id}
              className={`speed-tab${active === t.id ? ' active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              <span className="speed-tab-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div className="timeline-wrap">
          <div className="timeline-track">
            <div className="timeline-node active" />
            <div className="timeline-line" />
            <div className="timeline-node active" />
            <div className="timeline-line" />
            <div className="timeline-node active" />
          </div>
          <div className="timeline-cards">
            {tab.steps.map((s, i) => (
              <div key={i} className="timeline-col">
                <p className="timeline-title">{s.col}</p>
                <div className="timeline-card" style={{ background: tab.cardBg, borderColor: tab.cardBorder }}>{s.card}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   MODERN EXPERIENCE SECTION
───────────────────────────────────────── */
const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16"/>
        <line x1="12" y1="12" x2="12" y2="21"/>
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
      </svg>
    ),
    title: <><em>Compatible with every ERP</em> on the market</>,
    body: 'Sage, SAP, Cegid, Dynamics, Divalto — simply import your CSV or Excel export. No integration, no connector.',
    link: 'Learn more',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: <><em>Automatic analysis engine</em> on your data</>,
    body: 'Via cross-references sales, stock, and clients to give you priorities, not tables. Fewer wasted hours, more actions.',
    link: 'Learn more',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: <><em>Built for field teams</em></>,
    body: 'Designed for sales directors, buyers, and managers who live in Excel and want results without an IT project.',
    link: 'Request a demo',
  },
]

function ModernExperienceSection({ onBooking }) {
  return (
    <section className="modern-section">
      <div className="modern-section-inner">
        <Waves
          backgroundColor="#111111"
          strokeColor="rgba(255, 255, 255, 0.07)"
          pointerSize={0.5}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 48, paddingBottom: 12 }}>
          <h2 className="modern-heading">
            One platform for all your distribution decisions
          </h2>
        </div>
        <div className="container">
          <div className="modern-features">
            {FEATURES.map((f, i) => (
              <div key={i} className="modern-feat">
                <div className="feat-icon">{f.icon}</div>
                <p className="feat-title">{f.title}</p>
                <p className="feat-body">{f.body}</p>
                <button className="feat-link" onClick={onBooking}>{f.link} →</button>
              </div>
            ))}
          </div>
        </div>

        <div className="container" style={{ paddingTop: 12 }}>
          <div className="modern-photo-area">
            <img src="/Bureau-moderne.png" alt="Modern workspace" className="modern-photo-img" />
          </div>
        </div>

        <div className="container" style={{ paddingTop: 0 }}>
          <div className="infra-inner">
            <div>
              <p className="infra-text">
                <em>Built for reality,</em> not for theory. Your files as they are, your data as it exists, your decisions as they need to be made.
              </p>
              <div style={{ marginTop: 28 }}>
                <CtaPixelButton label="See how it works" onClick={onBooking} />
              </div>
            </div>
            <div className="infra-screenshot-wrap">
              <img src="/interface.png" alt="Via interface" className="infra-screenshot" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfraSection() { return null }

/* ─────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────── */
const REVIEWS = [
  {
    company: 'Lefebvre Distribution',
    stars: '★★★★★',
    text: '"In two hours, Via showed us which references had been destroying our margin for 18 months. We\'d never seen it so clearly."',
    name: 'Marc Lefebvre',
    role: 'Sales Director',
    avatarBg: '#6C5CF5',
  },
  {
    company: 'Groupe Techni-Pro',
    stars: '★★★★★',
    text: '"We used to spend two days a month cross-referencing our exports in Excel. Now it\'s ready in 20 minutes, and we can actually see where to act."',
    name: 'Sophie Renard',
    role: 'Purchasing Manager',
    avatarBg: '#E05A00',
  },
  {
    company: 'Delta Fournitures',
    stars: '★★★★★',
    text: '"Via identified $180K in dormant stock we weren\'t seeing. We recovered that cash in six weeks."',
    name: 'Thomas Girard',
    role: 'Managing Director',
    avatarBg: '#3DAA3D',
  },
]

function TestimonialsSection({ onBooking }) {
  return (
    <section className="testi-header-section">
      <div className="container">
        <div className="testi-header-inner">
          <div>
            <p className="section-label">Testimonials</p>
            <h2 className="testi-heading">What our customers say</h2>
          </div>
        </div>

        <div className="testi-cards-row">
          {REVIEWS.map((r, i) => (
            <div key={i} className="testi-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="testi-card-company">{r.company}</span>
                <span className="testi-card-stars">{r.stars}</span>
              </div>
              <p className="testi-card-text">{r.text}</p>
              <div className="testi-card-person">
                <div className="testi-person-av" style={{ background: r.avatarBg }}>
                  {r.name[0]}
                </div>
                <div>
                  <div className="testi-person-name">{r.name}</div>
                  <div className="testi-person-role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function CtaBannerSection({ onBooking }) {
  return (
    <section className="cta-banner">
      <Waves
        backgroundColor="#1C1045"
        strokeColor="rgba(155, 127, 245, 0.15)"
        pointerSize={0.5}
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="cta-banner-inner">
          <div>
            <h2 className="cta-banner-heading">
              Ready to see your<br /><em>margins clearly?</em>
            </h2>
            <p className="cta-banner-sub">
              Import your first ERP export today. No integration, no IT project — just clear decisions in minutes.
            </p>
          </div>
          <div className="cta-banner-actions">
            <CtaPixelButton label="Let's go" onClick={onBooking} />
            <button className="btn-hero-outline" onClick={onBooking}>See a live demo</button>
            <p className="cta-banner-note">No commitment · Free first analysis</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   VIA BAND
───────────────────────────────────────── */
function VIABand() {
  return (
    <div className="via-band">
      <svg
        className="via-band-svg"
        viewBox="0 0 1000 170"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Dense grid — tight spacing, fast scroll */}
          <pattern id="via-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <line x1="10" y1="0" x2="10" y2="10" stroke="rgba(255,255,255,0.55)" strokeWidth="0.8"/>
            <line x1="0" y1="10" x2="10" y2="10" stroke="rgba(255,255,255,0.55)" strokeWidth="0.8"/>
            <animateTransform attributeName="patternTransform" type="rotate" from="30" to="30" dur="0.9s" repeatCount="indefinite" additive="sum"/>
            <animateTransform attributeName="patternTransform" type="translate" from="0,0" to="10,10" dur="0.9s" repeatCount="indefinite" additive="sum"/>
          </pattern>
          {/* Fast counter-diagonal — opposite direction */}
          <pattern id="via-grid-diag" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
            <line x1="10" y1="0" x2="10" y2="10" stroke="rgba(245,154,255,0.55)" strokeWidth="0.9"/>
            <animateTransform attributeName="patternTransform" type="rotate" from="-35" to="-35" dur="1.1s" repeatCount="indefinite" additive="sum"/>
            <animateTransform attributeName="patternTransform" type="translate" from="0,0" to="0,10" dur="1.1s" repeatCount="indefinite" additive="sum"/>
          </pattern>
          {/* Third layer — slow horizontal drift */}
          <pattern id="via-grid-horiz" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
            <line x1="0" y1="7" x2="14" y2="7" stroke="rgba(155,127,245,0.35)" strokeWidth="0.6"/>
            <animateTransform attributeName="patternTransform" type="translate" from="0,0" to="14,0" dur="0.7s" repeatCount="indefinite" additive="sum"/>
          </pattern>
          {/* Bright dots — dense + fast */}
          <pattern id="via-grid-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <circle cx="0"  cy="0"  r="1.6" fill="rgba(245,154,255,0.9)"/>
            <circle cx="10" cy="0"  r="1.6" fill="rgba(245,154,255,0.9)"/>
            <circle cx="0"  cy="10" r="1.6" fill="rgba(245,154,255,0.9)"/>
            <circle cx="10" cy="10" r="1.6" fill="rgba(245,154,255,0.9)"/>
            <circle cx="5"  cy="5"  r="1.0" fill="rgba(155,127,245,0.6)"/>
            <animateTransform attributeName="patternTransform" type="rotate" from="30" to="30" dur="0.9s" repeatCount="indefinite" additive="sum"/>
            <animateTransform attributeName="patternTransform" type="translate" from="0,0" to="10,10" dur="0.9s" repeatCount="indefinite" additive="sum"/>
          </pattern>
          {/* Diagonal slash lines — very fast opposite */}
          <pattern id="via-grid-slash" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(55)">
            <line x1="12" y1="0" x2="12" y2="12" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
            <animateTransform attributeName="patternTransform" type="rotate" from="55" to="55" dur="0.6s" repeatCount="indefinite" additive="sum"/>
            <animateTransform attributeName="patternTransform" type="translate" from="0,0" to="12,12" dur="0.6s" repeatCount="indefinite" additive="sum"/>
          </pattern>
        </defs>

        {/* Layer 1 — dense white grid */}
        <text x="6" y="148" fontFamily="'Syne', Arial, sans-serif" fontWeight="800" textLength="988" lengthAdjust="spacingAndGlyphs" fontSize="168" fill="url(#via-grid)">VIA</text>
        {/* Layer 2 — pink counter-diagonals */}
        <text x="6" y="148" fontFamily="'Syne', Arial, sans-serif" fontWeight="800" textLength="988" lengthAdjust="spacingAndGlyphs" fontSize="168" fill="url(#via-grid-diag)">VIA</text>
        {/* Layer 3 — horizontal drift */}
        <text x="6" y="148" fontFamily="'Syne', Arial, sans-serif" fontWeight="800" textLength="988" lengthAdjust="spacingAndGlyphs" fontSize="168" fill="url(#via-grid-horiz)">VIA</text>
        {/* Layer 4 — slash lines */}
        <text x="6" y="148" fontFamily="'Syne', Arial, sans-serif" fontWeight="800" textLength="988" lengthAdjust="spacingAndGlyphs" fontSize="168" fill="url(#via-grid-slash)">VIA</text>
        {/* Layer 5 — bright dots on top */}
        <text
          x="6" y="148"
          fontFamily="'Syne', Arial, sans-serif"
          fontWeight="800"
          textLength="988"
          lengthAdjust="spacingAndGlyphs"
          fontSize="168"
          fill="url(#via-grid-dots)"
        >VIA</text>
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
const FOOTER_COLS = [
  {
    heading: 'Products',
    links: ['Via Margin', 'Via Stock', 'Via Clients', 'Via Categories', 'Via Alerts', 'Via Trends'],
  },
  {
    heading: 'Use cases',
    links: ['Analyze margins', 'Identify dormant stock', 'Prioritize purchasing', 'Segment customers', 'Prepare sales reviews'],
  },
  {
    heading: 'Company',
    links: ['About', 'Careers', 'Press', 'Partners', 'Blog', 'Contact'],
  },
  {
    heading: 'Resources',
    links: ['Help Center', 'Documentation', 'Security', 'Compliance', 'Webinars', 'Pricing'],
  },
]

const FOOTER_PAGE_MAP = {
  'Via Margin': 'Solutions', 'Via Stock': 'Solutions', 'Via Clients': 'Solutions',
  'Via Categories': 'Solutions', 'Via Alerts': 'Solutions', 'Via Trends': 'Solutions',
  'Analyze margins': 'Use cases', 'Identify dormant stock': 'Use cases',
  'Prioritize purchasing': 'Use cases', 'Segment customers': 'Use cases',
  'Prepare sales reviews': 'Use cases',
  'Help Center': 'Resources', 'Documentation': 'Resources', 'Webinars': 'Resources',
  'Pricing': 'Pricing',
  'Contact': 'booking',
}

function Footer({ onNav, onBooking }) {
  function handleLink(link) {
    const target = FOOTER_PAGE_MAP[link]
    if (target === 'booking') { onBooking(); return }
    if (target) { onNav(target); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <button className="footer-nav-logo" onClick={() => onNav(null)}>via.</button>
            <p className="footer-brand-sub">
              Your ERP exports into clear decisions. For B2B distributors who want results without an IT project.
            </p>
          </div>
          <div className="footer-cols">
            {FOOTER_COLS.map(col => (
              <div key={col.heading} className="footer-col">
                <h4>{col.heading}</h4>
                <ul>
                  {col.links.map(link => (
                    <li key={link}>
                      <button onClick={() => handleLink(link)}>{link}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Via Technologies SAS. All rights reserved.</p>
          <ul className="footer-bottom-links">
            <li><button onClick={onBooking}>Privacy Policy</button></li>
            <li><button onClick={onBooking}>Terms of Use</button></li>
            <li><button onClick={onBooking}>Cookies</button></li>
            <li><button onClick={onBooking}>Accessibility</button></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────
   APP ROOT
───────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState(null) // null = home

  function openBooking() {
    setPage('Booking')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function renderPage() {
    if (page === 'Booking')       return <BookingPage    onNav={setPage} />
    if (page === 'Solutions')     return <SolutionsPage  onNav={setPage} onBooking={openBooking} />
    if (page === 'Use cases')     return <UseCasesPage   onNav={setPage} onBooking={openBooking} />
    if (page === 'Who we serve')  return <WhoWeServePage onNav={setPage} onBooking={openBooking} />
    if (page === 'Resources')     return <ResourcesPage  onNav={setPage} onBooking={openBooking} />
    if (page === 'Pricing')       return <PricingPage    onNav={setPage} onBooking={openBooking} />
    return null
  }

  const isHome = page === null
  const isBooking = page === 'Booking'

  return (
    <>
      {!isBooking && <Navbar onNav={setPage} onBooking={openBooking} />}
      {isHome ? (
        <>
          <HeroSection onBooking={openBooking} />
          <LogosSection />
          <GlobalPlatformSection onBooking={openBooking} />
          <SpeedSection />
          <ModernExperienceSection onBooking={openBooking} />
          <InfraSection onBooking={openBooking} />
          <TestimonialsSection onBooking={openBooking} />
          <CtaBannerSection onBooking={openBooking} />
          <VIABand />
        </>
      ) : renderPage()}
      {!isBooking && (
        <div style={{ textAlign: 'center', padding: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.75)', background: '#000000' }}>
          © 2026 Via Technologies SAS. All rights reserved.
        </div>
      )}
    </>
  )
}
