import './App.css'
import { createElement, useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import {
  UsersThree, Eye, Flask, TrendUp, Stack,
  ChartBar, Globe, Monitor, TreeStructure, Database,
  ShieldCheck, Funnel, ShareNetwork, Star, DotsThree,
  CaretDown, Check, ArrowRight, Lock, ListChecks, Fingerprint,
} from '@phosphor-icons/react'
import { ROUTES } from './pages.jsx'

/* ─── Hash router ─── */
function useRoute() {
  const parse = () => {
    const m = (window.location.hash || '').match(/^#\/(.+)$/)
    return m ? m[1].replace(/\/$/, '') : 'home'
  }
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const on = () => {
      setRoute(parse())
      // Only jump to top for real page routes (#/…); leave in-page anchors (#how) to the browser.
      if ((window.location.hash || '').startsWith('#/')) window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

const FOOTER_HREF = {
  'Dead Stock': '#/inventory', 'Replenishment': '#/inventory', 'Inventory & Overstock': '#/inventory',
  'Margin Erosion': '#/margin', 'Margin Analysis': '#/margin',
  'Sales YoY': '#/sales', 'Cross-Analysis': '#/sales', 'Substitutes': '#/sales', 'Sales Analysis': '#/sales',
  'Client Performance': '#/customers', 'Customer Performance': '#/customers',
  'How it works': '#how',
  'Security': '#/security/on-prem', 'Air-gapped architecture': '#/security/on-prem',
  'What we verified': '#/security/on-prem', 'Component inventory': '#/security/on-prem',
  'Audit & sandbox': '#/security/on-prem', 'Data ownership': '#/security/on-prem',
  'Deployment': '#/security/on-prem', 'Desktop app': '#/security/on-prem', 'Internal server': '#/security/on-prem',
  'Portable version': '#/security/on-prem', 'Installation': '#/security/on-prem', 'Hyper-care': '#/security/on-prem',
  'Roadmap to SAP': '#/security/on-prem',
  'Pricing': '#/pricing', 'One-time licence': '#/pricing',
  'Contact': '#/contact', 'Book a demo': '#/contact', 'Security dossier': '#/contact', 'About VIA': '#/contact',
}
const footerHref = (label) => FOOTER_HREF[label] || null

/* ─── Data ─── */
const navItems = [
  { label: 'Product',  href: '#/sales',             menu: 'product'  },
  { label: 'Security', href: '#/security/on-prem',  menu: 'security' },
  { label: 'Pricing',  href: '#/pricing' },
]

const productTiles = [
  { Icon: Stack,      label: 'Surface dead stock',       sub: 'Capital tied up in slow-movers', color: '#ef4444', bg: 'rgba(239,68,68,0.10)'   },
  { Icon: TrendUp,    label: 'Catch margin erosion',     sub: 'SKU-level drift with euro impact',  color: '#f59e0b', bg: 'rgba(245,158,11,0.10)'  },
  { Icon: Eye,        label: 'Time your reorders',       sub: 'High-margin lines running low',  color: '#3b82f6', bg: 'rgba(59,130,246,0.10)'  },
  { Icon: UsersThree, label: 'Track client performance', sub: 'Growth, decline & margin by account', color: '#10b981', bg: 'rgba(16,185,129,0.10)'  },
  { Icon: Flask,      label: 'Compare substitutes',      sub: 'Did the switch help or hurt?',   color: '#8b5cf6', bg: 'rgba(139,92,246,0.10)'  },
]

const logos = [
  'Auto parts', 'HVAC', 'Industrial supply', 'Wholesale',
  'Spare parts', 'Building materials', 'Multi-site networks',
]

const capabilities = [
  [ChartBar,      '#ff7e67', 'Dead Stock',
   'Spot the references quietly tying up your capital. VIA scores every SKU by capital at risk and margin, so you know what to liquidate, push or freeze — in seconds, not spreadsheets.',
   'See dead-stock scoring', '#/inventory'],
  [Globe,         '#5ab4ff', 'Replenishment Opportunities',
   'Catch your winners before they run out. VIA flags high-margin products running low on cover, ranked by urgency, so you reorder in time instead of losing the sale.',
   'See replenishment alerts', '#/inventory'],
  [Monitor,       '#4ecab8', 'Margin Erosion',
   'Revenue can hold while profit quietly bleeds. VIA compares margin SKU by SKU, year over year, and surfaces every drift with its estimated euro impact.',
   'See margin analysis', '#/margin'],
  [Flask,         '#c4a8ff', 'Year-over-Year Sales',
   "See what's growing and what's fading — by product and by family, with monthly trendlines — before a decline turns into dead stock.",
   'See sales comparison', '#/sales'],
  [TreeStructure, '#f5c842', 'Client Performance',
   'Read your portfolio by account: growth, decline, margin and category mix. Catch a key account slipping before you lose it.',
   'See client analysis', '#/customers'],
  [Database,      '#ff85c2', 'Substitutes & Cross-Analysis',
   'When one reference replaces another, VIA links them and measures whether the switch helped or hurt your margin — plus a four-quadrant view of your whole catalog.',
   'See the full picture', '#/sales'],
]

const aiTools = ['◎', '✳', '◆', '✦', 'N']

const reasons = [
  ['Answers in seconds',
   'Load one Excel file and explore dead stock, margins, reorders and client trends instantly — no data team, no BI project.'],
  ['Yours, outright',
   'Buy it once, install it on your own machines, own it for good. No subscription, no cloud, no vendor lock-in.'],
  ['Runs fully offline',
   'Air-gapped by design: no API, no network calls, no telemetry. Your data never leaves your network.'],
  ['Built around your rules',
   'Thresholds, scoring and analyses are tailored to your business and adjust as needs change — including a smooth path to SAP exports.'],
]

const securityItems = [
  ['No way out',           'No API, no outbound network calls, no telemetry. The software simply has no channel to send your data anywhere.'],
  ['You own it',           'Bought once, installed on your machines, fully yours. No cloud, no remote access — not even from us.'],
  ['Verified in the code', 'Zero API keys, all file reads local, no analytics libraries. Confirmed line by line — and auditable by your own IT.'],
  ['Your perimeter',       'VIA fits inside your existing security perimeter without widening it. Nothing new is exposed to the network.'],
]

const supportCards = [
  ['A year of hyper-care',   'After go-live, around twelve months of close support: fixes, adjustments and changes included while you settle in.', 'See how support works',  'purple'],
  ['You report, we fix',     'Because nothing phones home, there are no automatic logs. Flag an issue by email or phone and we patch it directly.', 'Talk to us',             'blue'],
  ['Tailored to your rules', 'Thresholds, scoring and even a future move to SAP exports — the software bends to your business, not the other way round.', 'See deployment options', 'coral'],
]

const footerCols = [
  ['ANALYSES',     ['Dead Stock','Replenishment','Margin Erosion','Sales YoY','Client Performance','Substitutes','Cross-Analysis']],
  ['PRODUCT',      ['How it works','Security','Deployment','One-time licence','Roadmap to SAP']],
  ["WHO IT'S FOR", ['Distributors','Industrial SMEs','Auto parts','HVAC','Wholesale','Purchasing teams','Finance teams']],
  ['SECURITY',     ['Air-gapped architecture','What we verified','Component inventory','Audit & sandbox','Data ownership']],
  ['DEPLOYMENT',   ['Desktop app','Internal server','Portable version','Installation','Hyper-care']],
  ['COMPANY',      ['About VIA','Contact','Book a demo','Security dossier']],
]

/* ─── Product mega-menu data ─── */
const platformAnalytics = [
  { Icon: TrendUp,    color: '#3b82f6', bg: 'rgba(59,130,246,.12)',  title: 'Sales Analysis',        sub: 'Growth, decline & the 4-quadrant view', href: '#/sales' },
  { Icon: ChartBar,   color: '#ff7e67', bg: 'rgba(255,126,103,.12)', title: 'Margin Analysis',       sub: 'Catch erosion with euro impact',        href: '#/margin' },
  { Icon: Stack,      color: '#7856ff', bg: 'rgba(120,86,255,.12)',  title: 'Inventory & Overstock', sub: 'Find the cash trapped in stock',        href: '#/inventory' },
  { Icon: UsersThree, color: '#10b981', bg: 'rgba(16,185,129,.12)',  title: 'Customer Performance',  sub: 'Spot accounts before they slip',        href: '#/customers' },
]

const platformReasons = [
  { Icon: Globe,    color: '#f59e0b', bg: 'rgba(245,158,11,.12)', title: 'Built for distributors', sub: 'Made for industrial SMEs & distribution', href: '#/sales' },
  { Icon: Database, color: '#3b82f6', bg: 'rgba(59,130,246,.12)', title: 'From one ERP export',    sub: 'Works from a standard Excel export',      href: '#/inventory' },
  { Icon: Eye,      color: '#ff7557', bg: 'rgba(255,117,87,.12)', title: 'Answers in seconds',     sub: 'No data team, no BI project',             href: '#/margin' },
  { Icon: Monitor,  color: '#4ecab8', bg: 'rgba(78,202,184,.12)', title: 'Tailored to your rules', sub: 'Thresholds adapt to your business',       href: '#/customers' },
]

/* ─── Security mega-menu data ─── */
const securityModels = [
  { Icon: Lock,        color: '#7856ff', bg: 'rgba(120,86,255,.12)', title: 'On-premise · Air-gapped', sub: 'Installed at your site. No way out.',        href: '#/security/on-prem' },
  { Icon: Globe,       color: '#3b82f6', bg: 'rgba(59,130,246,.12)', title: 'SaaS · Managed',          sub: 'We host it, encrypted & access-controlled.', href: '#/security/saas' },
]

const securityAssurance = [
  { Icon: ShieldCheck, color: '#7856ff', bg: 'rgba(120,86,255,.12)', title: 'Air-gapped architecture', sub: 'No API, no outbound traffic', href: '#/security/on-prem' },
  { Icon: ListChecks,  color: '#10b981', bg: 'rgba(16,185,129,.12)', title: 'What we verify',          sub: 'Confirmed in the source code', href: '#/security/on-prem' },
  { Icon: Fingerprint, color: '#ff7557', bg: 'rgba(255,117,87,.12)', title: 'Verify it yourself',      sub: 'Audit, sandbox, pen-test',     href: '#/security/on-prem' },
  { Icon: Database,    color: '#3b82f6', bg: 'rgba(59,130,246,.12)', title: 'Data ownership',          sub: 'Your data, your machines',     href: '#/security/on-prem' },
]

const platformCardPills = [
  { Icon: TrendUp,    color: '#ff7e67', label: 'Sales' },
  { Icon: ChartBar,   color: '#10b981', label: 'Margins' },
  { Icon: Stack,      color: '#3b82f6', label: 'Inventory' },
  { Icon: UsersThree, color: '#8b5cf6', label: 'Customers' },
]

/* ─── Mega-menu column helper ─── */
function MegaColumn({ label, items }) {
  return (
    <div className="pmm-col">
      <span className="pmm-col-label">{label}</span>
      {items.map(({ Icon, color, bg, title, sub, href }) => (
        <a href={href} key={title} className="pmm-item">
          <span className="pmm-icon" style={{ color, background: bg }}>
            {createElement(Icon, { size: 18, weight: 'duotone' })}
          </span>
          <span className="pmm-item-body">
            <span className="pmm-item-title">{title}</span>
            {sub && <span className="pmm-item-sub">{sub}</span>}
          </span>
        </a>
      ))}
    </div>
  )
}

/* ─── Product mega-menu ─── */
function ProductMegaMenu({ onMouseEnter, onMouseLeave }) {
  return (
    <div className="platform-mega-menu" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <MegaColumn label="Analyses" items={platformAnalytics} />
      <div className="pmm-divider" />
      <MegaColumn label="Why VIA?" items={platformReasons} />
      <a href="#/sales" className="pmm-card">
        <div className="pmm-card-visual">
          <img src="/plateform-nav-image.png" alt="" />
        </div>
        <div className="pmm-card-body">
          <span className="pmm-card-title">VIA Intelligence</span>
          <p className="pmm-card-desc">Turn your ERP data into profitable decisions.</p>
          <div className="pmm-card-pills">
            {platformCardPills.map(({ Icon, color, label }) => (
              <span key={label} className="pmm-card-pill">
                {createElement(Icon, { size: 13, weight: 'duotone', color })}
                {label}
              </span>
            ))}
          </div>
        </div>
      </a>
    </div>
  )
}

/* ─── Security mega-menu ─── */
function SecurityMegaMenu({ onMouseEnter, onMouseLeave }) {
  return (
    <div className="platform-mega-menu" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <MegaColumn label="Deployment models" items={securityModels} />
      <div className="pmm-divider" />
      <MegaColumn label="Why it's safe" items={securityAssurance} />
      <a href="#/contact" className="pmm-card pmm-card-sec">
        <div className="pmm-card-icon"><ShieldCheck size={30} weight="fill" /></div>
        <div className="pmm-card-body">
          <span className="pmm-card-title">Security dossier</span>
          <p className="pmm-card-desc">Get the full air-gap dossier for your IT team.</p>
          <span className="pmm-card-link">Request it <ArrowRight size={13} /></span>
        </div>
      </a>
    </div>
  )
}

/* ─── Animation presets ─── */
const ease = [0.21, 0.47, 0.32, 0.98]
const vp   = { once: true, margin: '-60px' }
const Motion = motion

const fadeUp  = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   vp,
  transition: { duration: 0.55, ease, delay },
})

const fadeIn  = (delay = 0) => ({
  initial:    { opacity: 0 },
  whileInView:{ opacity: 1 },
  viewport:   vp,
  transition: { duration: 0.5, ease: 'easeOut', delay },
})

const slideLeft = (delay = 0) => ({
  initial:    { opacity: 0, x: -32 },
  whileInView:{ opacity: 1, x: 0 },
  viewport:   vp,
  transition: { duration: 0.6, ease, delay },
})

const slideRight = (delay = 0) => ({
  initial:    { opacity: 0, x: 32 },
  whileInView:{ opacity: 1, x: 0 },
  viewport:   vp,
  transition: { duration: 0.6, ease, delay },
})

/* On-load (no scroll trigger) */
const heroLoad = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
})

/* ─── Announcement Bar ─── */
function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <span className="ann-badge">Air-gapped</span>
      <span className="ann-text">ViteLink is now VIA.</span>
    </div>
  )
}

/* ─── Header ─── */
function Header({ route }) {
  const [openMenu, setOpenMenu] = useState(null)
  const closeTimer = useRef(null)

  const open  = (menu) => { clearTimeout(closeTimer.current); setOpenMenu(menu) }
  const close = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 150) }

  const isActive = (menu) => {
    if (menu === 'product')  return ['sales', 'margin', 'inventory', 'customers'].includes(route)
    if (menu === 'security') return route.startsWith('security/')
    return route === 'pricing'
  }

  return (
    <header className="site-header" onMouseLeave={close}>
      <a className="brand" href="#/" aria-label="VIA home">
        <img className="brand-logo" src="/VIA-4.png" alt="VIA" />
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map(({ label, href, menu }) => (
          <a
            href={href} key={label}
            className={isActive(menu || label.toLowerCase()) ? 'active' : ''}
            onMouseEnter={() => (menu ? open(menu) : close())}
          >
            {label}
            {menu && (
              <CaretDown size={12} weight="bold" className={`chevron${openMenu === menu ? ' open' : ''}`} />
            )}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <a className="login" href="#/pricing">Pricing</a>
        <a className="pill subtle" href="#/contact">Contact <ArrowRight size={13} /></a>
        <a className="pill dark" href="#/contact">Book a Demo <ArrowRight size={13} /></a>
      </div>
      {openMenu === 'product'  && <ProductMegaMenu  onMouseEnter={() => open('product')}  onMouseLeave={close} />}
      {openMenu === 'security' && <SecurityMegaMenu onMouseEnter={() => open('security')} onMouseLeave={close} />}
    </header>
  )
}

/* ─── Hero Visual (Dashboard) ─── */
const funnelSteps = [
  { label: 'All SKUs',    val: '962', pct: 100 },
  { label: 'In stock',   val: '811', pct: 84  },
  { label: 'Slow movers',val: '433', pct: 45  },
  { label: 'Dead stock', val: '211', pct: 22  },
  { label: 'Neg. margin',val: '41',  pct: 12  },
]

const cohortData = [
  { label: 'Compr.',  vals: [100, 74, 61, 48, 42, 38] },
  { label: 'Filters', vals: [100, 70, 56, 44, 37, 32] },
  { label: 'Belts',   vals: [100, 77, 63, 51, 44, 39] },
  { label: 'Valves',  vals: [100, 66, 52, 40, 33]     },
  { label: 'Motors',  vals: [100, 71, 58, 45]          },
]

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="VIA ERP analysis dashboard preview">
      <div className="agent-window">
        <div className="agent-head">
          <span className="agent-brand">
            <img src="/VIA-4-Officiel.png" alt="VIA" />
            Action center
          </span>
          <span className="agent-controls"><span /><span /></span>
        </div>
        <p className="agent-msg">
          47 references are tying up $312k in capital with margins under 10%. Here's what to liquidate first.
        </p>
        <div className="agent-cta-row">
          <button className="agent-cta-btn">Show dead-stock list</button>
        </div>
        <p className="agent-result-label">Top references by capital at risk:</p>
        <ul className="agent-results">
          {['Compressor CX-200 · $48k','Filter kit FK-12 · $31k','Drive belt B-440 · $27k','Coolant R-32 · $22k','Fan motor FM-9 · $19k'].map(r => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <div className="agent-footer">
          <span className="agent-input-mock">Filter by family, margin, months of stock…</span>
          <span className="agent-hint">↵</span>
        </div>
      </div>

      <div className="dashboard-window">
        <div className="dash-toolbar">
          <span className="toolbar-item"><Funnel size={13} weight="fill" /> Filter</span>
          <span className="toolbar-item"><ShareNetwork size={13} /> Export</span>
          <span className="toolbar-item"><Star size={13} /></span>
          <span className="toolbar-item"><DotsThree size={15} weight="bold" /></span>
          <span className="toolbar-ai-pill">● Runs offline</span>
        </div>
        <div className="dash-content">
          <div className="dash-tabs">
            {['Dashboard','Analyses','Export'].map((t, i) => (
              <button key={t} className={`dash-tab${i === 0 ? ' active' : ''}`}>{t}</button>
            ))}
          </div>
          <div className="dash-grid">
            <div className="chart-card funnel-card">
              <div className="card-header">
                <span className="card-dot coral" />
                <div>
                  <strong>Stock health</strong>
                  <small>962 SKUs · last 12 months · 13% dead stock</small>
                </div>
              </div>
              <div className="funnel-v">
                {funnelSteps.map(({ label, val, pct }, i) => (
                  <div key={label} className="fv-col">
                    <div className="fv-bar-area">
                      <span className="fv-count">{val}</span>
                      <div className="fv-bar" style={{ '--pct': `${pct}%` }} />
                    </div>
                    <span className="fv-label">{label}</span>
                    {i > 0 && <span className="fv-conv">{pct}%</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card retention-card">
              <strong>Sell-through by family</strong>
              <div className="ret-heatmap">
                <div className="ret-hm-header">
                  <span className="ret-side-lbl" />
                  {['Jul','Aug','Sep','Oct','Nov','Dec'].map(w => (
                    <span key={w} className="ret-hm-th">{w}</span>
                  ))}
                </div>
                {cohortData.map(({ label, vals }) => (
                  <div key={label} className="ret-hm-row">
                    <span className="ret-side-lbl">{label}</span>
                    {vals.map((v, i) => (
                      <span key={i} className="ret-hm-cell" style={{ '--v': v / 100, '--vi': (100 - v) / 100 }}>
                        {v}%
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card area-card">
              <div className="area-header">
                <div>
                  <strong>Margin trend</strong>
                  <small>This year vs. last</small>
                </div>
                <div className="area-legend">
                  <span className="legend-dot purple" /><span>This year</span>
                  <span className="legend-dot coral"  /><span>Last year</span>
                </div>
              </div>
              <div className="area-chart">
                <svg viewBox="0 0 300 72" preserveAspectRatio="none" className="area-svg">
                  <defs>
                    <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff7557" stopOpacity="0.55"/>
                      <stop offset="100%" stopColor="#ff7557" stopOpacity="0.04"/>
                    </linearGradient>
                    <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7856ff" stopOpacity="0.50"/>
                      <stop offset="100%" stopColor="#7856ff" stopOpacity="0.04"/>
                    </linearGradient>
                  </defs>
                  <path d="M0 60 C25 54 50 44 75 48 C100 52 125 30 150 34 C175 38 200 18 225 24 C250 30 275 16 300 12 L300 72 L0 72 Z" fill="url(#ag1)"/>
                  <path d="M0 60 C25 54 50 44 75 48 C100 52 125 30 150 34 C175 38 200 18 225 24 C250 30 275 16 300 12" fill="none" stroke="#ff7557" strokeWidth="1.5"/>
                  <path d="M0 68 C25 62 50 56 75 58 C100 60 125 44 150 48 C175 52 200 38 225 42 C250 46 275 34 300 30 L300 72 L0 72 Z" fill="url(#ag2)"/>
                  <path d="M0 68 C25 62 50 56 75 58 C100 60 125 44 150 48 C175 52 200 38 225 42 C250 46 275 34 300 30" fill="none" stroke="#7856ff" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>

            <div className="chart-card small-card">
              <strong>Capital at risk</strong>
              <small>By category</small>
              <div className="small-bars">
                {[
                  { h: 75, c: '#7856ff' }, { h: 55, c: '#a080ff' },
                  { h: 90, c: '#7856ff' }, { h: 45, c: '#c4b0ff' },
                  { h: 85, c: '#7856ff' }, { h: 60, c: '#a080ff' },
                  { h: 70, c: '#7856ff' },
                ].map((bar, i) => (
                  <div key={i} className="small-bar" style={{ '--h': `${bar.h}%`, '--c': bar.c }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="float-panel">
        <div className="float-grid-bg">
          <div className="checkout-modal">
            <strong>You own this copy</strong>
            <span className="checkout-tag">One-time licence</span>
            <div className="checkout-field">Deployment</div>
            <div className="checkout-field">On your machines</div>
            <button className="checkout-btn">Air-gapped ✓</button>
          </div>
        </div>
        <div className="ai-summary-pill">● 100% local</div>
      </div>
    </div>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="hero-shell" id="top">

      {/* Floating gradient bars — animate y independently from the rest */}
      <Motion.div
        className="hero-bars"
        animate={{ y: [0, -55, -20, 0], x: [0, 12, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', times: [0, 0.44, 0.72, 1] }}
        aria-hidden="true"
      />

      <div className="hero-copy">
        <Motion.h1 {...heroLoad(0)}>
          Turn boring Data<br />into decisions
        </Motion.h1>
        <Motion.p {...heroLoad(0.18)}>
          VIA reads one Excel export from your ERP and turns it into dead-stock, margin, reorder and client analysis — running entirely on your own machine, owned outright by you.
        </Motion.p>
      </div>

      <Motion.div className="tile-row" role="list" {...heroLoad(0.32)}>
        {productTiles.map(({ Icon, label, sub, color, bg }) => (
          <button className="product-tile" role="listitem" key={label}>
            <div className="tile-icon-wrap" style={{ background: bg, color }}>
              {createElement(Icon, { size: 16, weight: 'duotone' })}
            </div>
            <div className="tile-body">
              <span className="tile-label">{label}</span>
              <span className="tile-sub">{sub}</span>
            </div>
            <span className="tile-arrow" aria-hidden="true">
              <ArrowRight size={13} />
            </span>
          </button>
        ))}
      </Motion.div>

      <Motion.div className="hero-actions" {...heroLoad(0.46)}>
        <a className="pill dark large" href="#/contact">Book a Demo <ArrowRight size={15} /></a>
        <a className="pill subtle large" href="#how">See how it works <ArrowRight size={15} /></a>
      </Motion.div>

      <Motion.div {...heroLoad(0.58)}>
        <HeroVisual />
      </Motion.div>
    </section>
  )
}

/* ─── Capabilities ─── */
function CapabilitySection() {
  return (
    <section className="capability-band" id="platform">
      <div className="logo-strip" aria-label="Built for distribution and industrial SMEs">
        {logos.map((logo, i) => (
          <Motion.span className="logo-item" key={logo} {...fadeIn(i * 0.06)}>
            {logo}
          </Motion.span>
        ))}
      </div>
      <div className="capability-grid">
        {capabilities.map(([Icon, color, title, text, cta, href], i) => (
          <Motion.article
            className="capability-card" key={title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5, ease, delay: i * 0.07 }}
          >
            <div className="cap-card-title">
              <span className="cap-icon" style={{ color, background: `${color}22` }}>
                {createElement(Icon, { size: 17, weight: 'duotone' })}
              </span>
              <h3>{title}</h3>
            </div>
            <p>{text}</p>
            <a href={href}>{cta} <ArrowRight size={13} /></a>
          </Motion.article>
        ))}
      </div>
    </section>
  )
}

/* ─── How it works ─── */
function HowSection() {
  const iconCenters = [60,152,244,336,428].map(x => [x+39, 39])
  const hubCenter   = [430, 295]

  return (
    <section className="ai-card" id="how">
      <Motion.div className="ai-copy" {...slideLeft(0)}>
        <span className="ai-badge">How it works</span>
        <h2>One ERP export in.<br />Seven analyses out.</h2>
        <Motion.p {...fadeUp(0.15)}>
          Drop in an Excel export from your ERP. VIA reads it on the spot — no setup, no integration, nothing leaving your machine — and turns it into dead-stock, margin, reorder, sales, client and substitute analyses you can act on the same morning.
        </Motion.p>
        <Motion.a className="pill light" href="#platform" {...fadeUp(0.25)}>
          Explore the analyses <ArrowRight size={13} />
        </Motion.a>
      </Motion.div>

      <Motion.div className="ai-visual" aria-hidden="true" {...slideRight(0.1)}>
        <svg className="ai-lines-svg" viewBox="0 0 560 360" preserveAspectRatio="xMidYMid meet">
          <defs>
            {iconCenters.map(([x,y],i) => (
              <linearGradient key={i} id={`lg${i}`} x1={x} y1={y} x2={hubCenter[0]} y2={hubCenter[1]} gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="rgba(255,255,255,0.40)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
              </linearGradient>
            ))}
          </defs>
          {iconCenters.map(([x,y],i) => (
            <line key={i} x1={x} y1={y} x2={hubCenter[0]} y2={hubCenter[1]}
              stroke={`url(#lg${i})`} strokeWidth="1.4" strokeDasharray="6 5"
              className={`ai-line ai-line-${i}`} />
          ))}
          {iconCenters.map(([x,y],i) => (
            <circle key={`dot-${i}`} cx={x} cy={y} r="3"
              fill="rgba(255,255,255,0.55)" className={`ai-dot ai-dot-${i}`} />
          ))}
        </svg>
        <div className="ai-tools-row">
          {aiTools.map((tool, i) => (
            <Motion.div className="ai-tool-icon" key={tool}
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.06 }}
            >
              {tool}
            </Motion.div>
          ))}
        </div>
        <div className="ai-hub">
          <div className="ai-hub-inner">
            <img src="/VIA-4-Officiel.png" alt="VIA" />
          </div>
        </div>
      </Motion.div>
    </section>
  )
}

/* ─── Why Section ─── */
function WhySection() {
  return (
    <section className="why-section">
      <div className="why-header">
        <Motion.h2 {...fadeUp(0)}>Why distributors choose VIA</Motion.h2>
        <Motion.div className="why-header-right" {...fadeUp(0.1)}>
          <p>We give operations, purchasing and finance teams the confidence to stop guessing and act on what their ERP already knows.</p>
          <a className="pill dark" href="#/contact">Book a Demo <ArrowRight size={13} /></a>
        </Motion.div>
      </div>

      <div className="why-panel">
        <Motion.div className="table-card" {...slideLeft(0.05)}>
          <div className="table-head">
            <div className="table-head-top">
              <span className="table-icon"><TrendUp size={14} weight="fill" color="#7856ff" /></span>
              <strong>Margin &amp; sales by family</strong>
            </div>
            <small>This year compared to the previous one</small>
          </div>
          <table>
            <thead>
              <tr>
                <th>Family</th><th>Revenue ($)</th><th>YoY</th>
                <th>Margin %</th><th>Margin Δ</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Compressors', '1,245k','+8%', '31%','-2%'],
                ['Air filters', '980k',  '+12%','27%','+1%'],
                ['Refrigerant', '870k',  '-4%', '22%','-5%'],
                ['Fan motors',  '760k',  '+6%', '34%','+2%'],
                ['Thermostats', '690k',  '-9%', '19%','-3%'],
                ['Valves',      '610k',  '+3%', '29%','-1%'],
                ['Ducting',     '540k',  '+15%','24%','+4%'],
                ['Overall',     '6,420k','+5%', '27%','-1%'],
              ].map(([fam,rev,yoy,margin,mDelta]) => (
                <tr key={fam}>
                  <td>{fam}</td><td>{rev}</td>
                  <td><span className={yoy.startsWith('+') ? 'badge good':'badge bad'}>{yoy}</span></td>
                  <td>{margin}</td>
                  <td><span className={mDelta.startsWith('-') ? 'badge bad':'badge good'}>{mDelta}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Motion.div>

        <div className="reason-list">
          {reasons.map(([title,text],i) => (
            <Motion.article
              className={`reason-item${i===2?' active':''}`} key={title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.5, ease, delay: i * 0.09 }}
            >
              <span className="reason-check"><Check size={14} weight="bold" /></span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Security + Partner ─── */
function SecurityPartnerBlock() {
  return (
    <section className="ec-block" id="security">
      <div className="ec-enterprise">
        <div className="ec-enterprise-glow" aria-hidden="true" />
        <Motion.div className="enterprise-copy" {...fadeUp(0)}>
          <h2>Sealed shut by design.<br />Air-gapped by default.</h2>
          <p>VIA answers the one question every IT team asks about third-party software — can it leak our data? — with an architecture that simply has no way out.</p>
          <a className="pill light" href="#/security/on-prem">Read the security dossier <ArrowRight size={13} /></a>
        </Motion.div>
        <div className="enterprise-grid">
          {securityItems.map(([title, text], i) => (
            <Motion.article
              key={title} className="enterprise-item"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.08 }}
            >
              <span className="ent-check"><ShieldCheck size={16} weight="fill" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Motion.article>
          ))}
        </div>
      </div>

      <div className="ec-case">
        <div className="ec-case-glow" aria-hidden="true" />
        <Motion.div className="case-logo-col" {...slideLeft(0)}>
          <div className="case-logo-card">
            <img src="/logo-autodistribution.png" alt="AutoDistribution" />
          </div>
        </Motion.div>
        <Motion.div className="case-copy" {...fadeUp(0.12)}>
          <blockquote>
            VIA works with AutoDistribution France to turn their ERP exports into client-portfolio analysis — tracking account growth, decline and margin across the network, entirely on their own infrastructure.
          </blockquote>
          <p className="case-author"><strong>AutoDistribution France</strong> · Auto parts distribution</p>
          <div className="case-stats">
            {[['7','analyses in one click'],['1','Excel export to start'],['0','data leaving the network']].map(([n, label], i) => (
              <Motion.div
                className="case-stat" key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.45, ease, delay: 0.2 + i * 0.08 }}
              >
                <strong>{n}</strong>
                <span>{label}</span>
              </Motion.div>
            ))}
          </div>
          <a className="pill light" href="#/contact">Talk to us <ArrowRight size={13} /></a>
        </Motion.div>
      </div>
    </section>
  )
}

/* ─── Support ─── */
function SupportSection() {
  return (
    <section className="support-section">
      <Motion.div className="section-head" {...fadeUp(0)}>
        <h2>Support, the way an<br />offline product needs it</h2>
        <p>Because nothing phones home, support is hands-on and direct. Here's how it works once VIA is yours.</p>
      </Motion.div>
      <div className="support-grid">
        {supportCards.map(([title,text,cta,color], i) => (
          <Motion.article
            className="support-card" key={title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5, ease, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className={`support-visual color-${color}`} aria-hidden="true">
              <div className="support-visual-inner" />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
            <a href="#/contact">{cta} <ArrowRight size={13} /></a>
          </Motion.article>
        ))}
      </div>
    </section>
  )
}

/* ─── Footer CTA + Mega Footer ─── */
function FooterCta() {
  return (
    <section className="footer-cta-section" id="demo">
      <div className="footer-cta-copy">
        <Motion.h2
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease }}
        >
          Your ERP already knows.<br />VIA shows you.
        </Motion.h2>
        <Motion.div className="footer-cta-actions" {...fadeUp(0.18)}>
          <a className="pill dark large" href="#/contact">Book a Demo <ArrowRight size={15} /></a>
          <a className="pill subtle large" href="#/security/on-prem">See the security model <ArrowRight size={15} /></a>
        </Motion.div>
      </div>
      <footer className="mega-footer">
        <div className="footer-grid">
          {footerCols.map(([heading,links], i) => (
            <Motion.div
              className="footer-col" key={heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, ease, delay: i * 0.06 }}
            >
              <h3>{heading}</h3>
              <ul>
                {links.map(link => {
                  const h = footerHref(link)
                  return (
                    <li key={link}>
                      {h ? <a href={h}>{link}</a> : <span className="footer-static">{link}</span>}
                    </li>
                  )
                })}
              </ul>
            </Motion.div>
          ))}
        </div>
        <div className="footer-bottom">
          <img className="footer-brand" src="/VIA-4-Officiel.png" alt="VIA" />
          <span className="footer-legal">© 2026 VIA · Software you own, running on your machines</span>
        </div>
      </footer>
    </section>
  )
}

/* ─── Contact Bubble ─── */
function AssistantBubble() {
  return (
    <a className="assistant-bubble" href="#/contact" aria-label="Book a VIA demo">
      <span className="assistant-avatar">
        <img src="/VIA-4-Officiel.png" alt="" aria-hidden="true" />
      </span>
      Book a demo
    </a>
  )
}

/* ─── Home page ─── */
function HomePage() {
  return (
    <main>
      <Hero />
      <CapabilitySection />
      <HowSection />
      <WhySection />
      <SecurityPartnerBlock />
      <SupportSection />
      <FooterCta />
    </main>
  )
}

/* ─── App ─── */
export default function App() {
  const route = useRoute()
  const Page = ROUTES[route]
  return (
    <>
      <div className="top-chrome">
        <AnnouncementBar />
        <Header route={route} />
      </div>
      {Page ? (
        <main key={route}>
          <Page />
          <FooterCta />
        </main>
      ) : (
        <HomePage />
      )}
      <AssistantBubble />
    </>
  )
}
