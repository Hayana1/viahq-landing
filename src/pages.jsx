import './pages.css'
import { useState } from 'react'
import { motion } from 'motion/react'
import {
  TrendUp, ChartBar, Stack, UsersThree, ArrowRight, Check,
  Warning, Package, ArrowsLeftRight, SlidersHorizontal, FunnelSimple, FileXls,
  ShieldCheck, Lock, Globe, Database, Browser, HardDrives, Wrench, Fingerprint,
  ListChecks, Cube, Sparkle, X,
} from '@phosphor-icons/react'

/* ─── Animation presets (local, mirror App.jsx) ─── */
const ease = [0.21, 0.47, 0.32, 0.98]
const vp   = { once: true, margin: '-60px' }
const fadeUp    = (d = 0) => ({ initial: { opacity: 0, y: 26 }, whileInView: { opacity: 1, y: 0 }, viewport: vp, transition: { duration: 0.55, ease, delay: d } })
const slideLeft = (d = 0) => ({ initial: { opacity: 0, x: -28 }, whileInView: { opacity: 1, x: 0 }, viewport: vp, transition: { duration: 0.6, ease, delay: d } })
const slideRight= (d = 0) => ({ initial: { opacity: 0, x: 28 },  whileInView: { opacity: 1, x: 0 }, viewport: vp, transition: { duration: 0.6, ease, delay: d } })

/* ═══════════════════════════════════════════════════════
   CHART PRIMITIVES (home-dashboard language)
═══════════════════════════════════════════════════════ */
function DashCard({ title, sub, tag, TagIcon, className = '', children }) {
  return (
    <div className={`dash-card ${className}`}>
      <div className="dc-head">
        <span className="dc-t"><strong>{title}</strong>{sub && <small>{sub}</small>}</span>
        {tag && <span className="dc-tag">{TagIcon && <TagIcon size={12} weight="bold" />}{tag}</span>}
      </div>
      {children}
    </div>
  )
}

function BarsV({ data }) {
  return (
    <div className="barsv">
      {data.map((d, i) => (
        <div className="bv-col" key={i}>
          <div className="bv-bar-area">
            <span className="bv-val">{d.val}</span>
            <div className="bv-bar" style={{ '--h': `${d.h}%`, '--c': d.c }} />
          </div>
          <span className="bv-lbl">{d.label}</span>
          {d.sub && <span className="bv-sub">{d.sub}</span>}
        </div>
      ))}
    </div>
  )
}

function RankBars({ rows }) {
  return (
    <div className="rank">
      {rows.map((r, i) => (
        <div className="rk-row" key={i}>
          <span className="rk-lbl">{r.label}</span>
          <span className="rk-track"><span className="rk-fill" style={{ '--w': `${r.w}%`, '--c': r.c || 'var(--accent)' }} /></span>
          <span className="rk-end">
            {r.val && <span className="rk-val">{r.val}</span>}
            {r.badge && <span className={`badge pill-tag ${r.badge.cls}`}>{r.badge.text}</span>}
          </span>
        </div>
      ))}
    </div>
  )
}

function DivergeBars({ rows }) {
  const max = Math.max(...rows.map(r => Math.abs(r.pct)))
  return (
    <div className="diverge">
      {rows.map((r, i) => {
        const pos = r.pct >= 0
        const w = (Math.abs(r.pct) / max) * 48
        return (
          <div className="dv-row" key={i}>
            <span className="dv-lbl">{r.label}</span>
            <span className="dv-track">
              <span className={`dv-bar ${pos ? 'pos' : 'neg'}`} style={{ width: `${w}%` }} />
            </span>
            <span className={`dv-val ${pos ? 'pos' : 'neg'}`}>{pos ? '+' : ''}{r.pct}%</span>
          </div>
        )
      })}
    </div>
  )
}

function Quadrant({ cells, dots, axisX, axisY }) {
  return (
    <div className="quad-wrap">
      <div className="quad">
        {cells.map((c, i) => (
          <div className={`q-cell ${['tl', 'tr', 'bl', 'br'][i]}`} key={i}>
            <span className="q-emoji">{c.emoji}</span>
            <span className="q-name">{c.name}</span>
            <span className="q-act">{c.act}</span>
          </div>
        ))}
        {dots.map((d, i) => (
          <span className="q-dot" key={i} style={{ left: `${d.x}%`, top: `${d.y}%`, background: d.c || 'var(--accent)' }} />
        ))}
      </div>
      <span className="quad-axis-x">{axisX} →</span>
      <span className="quad-axis-y">{axisY} →</span>
    </div>
  )
}

function Donut({ segs }) {
  const total = segs.reduce((a, s) => a + s.val, 0)
  const R = 54, C = 2 * Math.PI * R
  let off = 0
  return (
    <div className="donut-wrap">
      <svg className="donut" viewBox="0 0 132 132">
        <circle cx="66" cy="66" r={R} fill="none" stroke="var(--soft)" strokeWidth="16" />
        {segs.map((s, i) => {
          const len = C * (s.val / total)
          const seg = (
            <circle key={i} cx="66" cy="66" r={R} fill="none" stroke={s.c} strokeWidth="16"
              strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-off} transform="rotate(-90 66 66)" />
          )
          off += len
          return seg
        })}
        <text x="66" y="63" textAnchor="middle" fill="#221d2b" fontWeight="800" fontSize="16" fontFamily="'Bricolage Grotesque',sans-serif">100%</text>
        <text x="66" y="79" textAnchor="middle" fill="#8c8696" fontSize="9">of revenue</text>
      </svg>
      <div className="donut-legend">
        {segs.map((s, i) => (
          <div className="dl-row" key={i}><span className="dl-sw" style={{ background: s.c }} />{s.label}<strong>{s.val}%</strong></div>
        ))}
      </div>
    </div>
  )
}

function StackDist({ segs }) {
  const total = segs.reduce((a, s) => a + s.pct, 0)
  return (
    <>
      <div className="stack-dist">
        {segs.map((s, i) => (
          <div className="sd-seg" key={i} style={{ flexGrow: s.pct, background: s.c }}>{Math.round((s.pct / total) * 100)}%</div>
        ))}
      </div>
      <div className="stack-legend">
        {segs.map((s, i) => (
          <span className="sl-row" key={i}><span className="sl-sw" style={{ background: s.c }} />{s.label}</span>
        ))}
      </div>
    </>
  )
}

function Bullets({ rows }) {
  return (
    <div className="bullets">
      {rows.map((r, i) => (
        <div className="bu-row" key={i}>
          <span className="bu-lbl">{r.label}<small>{r.sub}</small></span>
          <span className="bu-bar">
            <span className="bu-fill" style={{ width: `${r.w}%`, background: r.c }} />
            <span className="bu-tick" style={{ left: `${r.tick}%` }} />
          </span>
        </div>
      ))}
    </div>
  )
}

function Heat({ cols, rows }) {
  const color = v => {
    // v is margin %, map to red(low)->green(high) around 10..40
    const t = Math.max(0, Math.min(1, (v - 8) / 30))
    const r = Math.round(239 + (16 - 239) * t)
    const g = Math.round(68 + (185 - 68) * t)
    const b = Math.round(68 + (129 - 68) * t)
    return `rgba(${r},${g},${b},0.16)`
  }
  return (
    <div className="heat">
      <div className="heat-row">
        <span className="heat-side" />
        {cols.map(c => <span className="heat-th" key={c}>{c}</span>)}
      </div>
      {rows.map((row, i) => (
        <div className="heat-row" key={i}>
          <span className="heat-side">{row.side}</span>
          {row.vals.map((v, j) => (
            <span className="heat-cell" key={j} style={{ background: color(v) }}>{v}</span>
          ))}
        </div>
      ))}
    </div>
  )
}

function SparkDual({ a, b }) {
  const toPts = arr => arr.map((v, i) => `${(i / (arr.length - 1)) * 300},${72 - (v / 100) * 60 - 6}`).join(' ')
  return (
    <svg className="spark" viewBox="0 0 300 72" preserveAspectRatio="none">
      <polyline points={toPts(b)} fill="none" stroke="#cdc7d6" strokeWidth="2" strokeDasharray="4 4" />
      <polyline points={toPts(a)} fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════
   SHARED PAGE PIECES
═══════════════════════════════════════════════════════ */
function PageHero({ eyebrow, EyIcon, title, lead, float, children }) {
  return (
    <section className="pp-hero">
      <div className="pp-hero-inner">
        <motion.div {...fadeUp(0)}>
          <span className="pp-eyebrow"><span className="ey-ic"><EyIcon size={13} weight="bold" /></span>{eyebrow}</span>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          <div className="pp-actions">
            <a className="pill dark large" href="#/contact">Book a demo <ArrowRight size={15} /></a>
            <a className="pp-back" href="#/">‹ Back to overview</a>
          </div>
        </motion.div>
        <motion.div className="pp-hero-visual" {...fadeUp(0.15)}>
          {children}
          {float && (
            <div className="pp-float">
              <span className="pf-ic"><float.Icon size={16} weight="bold" /></span>
              <div><strong>{float.value}</strong><span>{float.label}</span></div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function Row({ reverse, kicker, title, body, bullets, children }) {
  return (
    <div className={`pp-row${reverse ? ' reverse' : ''}`}>
      <motion.div className="pp-row-copy" {...(reverse ? slideRight(0) : slideLeft(0))}>
        <span className="pp-kicker"><span className="dot" />{kicker}</span>
        <h3>{title}</h3>
        <p>{body}</p>
        {bullets && (
          <ul className="pp-bullets">
            {bullets.map((b, i) => <li key={i}><span className="bl-ic"><Check size={15} weight="bold" /></span>{b}</li>)}
          </ul>
        )}
      </motion.div>
      <motion.div className="pp-row-visual" {...(reverse ? slideLeft(0.1) : slideRight(0.1))}>{children}</motion.div>
    </div>
  )
}

function Band({ kicker, title, body, stats }) {
  return (
    <section className="pp-section">
      <motion.div className="pp-band" {...fadeUp(0)}>
        <span className="pp-kicker"><span className="dot" />{kicker}</span>
        <h2>{title}</h2>
        {body && <p>{body}</p>}
        <div className="pp-band-stats">
          {stats.map((s, i) => (
            <motion.div className="pp-stat" key={i} {...fadeUp(0.1 + i * 0.08)}>
              <strong>{s[0]}</strong><span>{s[1]}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function Controls() {
  return (
    <section className="pp-section tight">
      <div className="pp-head">
        <span className="pp-kicker"><span className="dot" />Everything, your way</span>
        <h2>Tuned to your business, in real time</h2>
        <p>Every threshold, filter and export reflects exactly what's on your screen — and recalculates the instant you move a slider.</p>
      </div>
      <div className="ctrl-grid">
        <motion.div className="ctrl-card" {...fadeUp(0)}>
          <span className="ctrl-ic"><SlidersHorizontal size={19} weight="bold" /></span>
          <h4>Tunable thresholds</h4>
          <p>Set what counts as overstock, urgent or eroding. Every KPI and table updates live.</p>
          <div className="slider-mock" />
        </motion.div>
        <motion.div className="ctrl-card" {...fadeUp(0.08)}>
          <span className="ctrl-ic"><FunnelSimple size={19} weight="bold" /></span>
          <h4>Cascading filters</h4>
          <p>Drill Category → Family → Brand, with live counts at every level.</p>
          <div className="chip-row">
            <span className="chip">Category <span className="x">›</span></span>
            <span className="chip">Family <span className="x">›</span></span>
            <span className="chip">Brand</span>
          </div>
        </motion.div>
        <motion.div className="ctrl-card" {...fadeUp(0.16)}>
          <span className="ctrl-ic"><FileXls size={19} weight="bold" /></span>
          <h4>One-click Excel export</h4>
          <p>Export the exact filtered view — thresholds, filters and all — back to .xlsx.</p>
          <div className="chip-row"><span className="chip">Export current view</span></div>
        </motion.div>
      </div>
    </section>
  )
}

function ProductPage({ accent, accentSoft, children }) {
  return <div className="pp" style={{ '--accent': accent, '--accent-soft': accentSoft }}>{children}</div>
}

function SectionHead({ kicker, title, body }) {
  return (
    <div className="pp-head">
      <span className="pp-kicker"><span className="dot" />{kicker}</span>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   PAGE 1 — SALES ANALYSIS
═══════════════════════════════════════════════════════ */
export function SalesPage() {
  const yoy = [
    { label: 'Ducting',     pct: 15 },
    { label: 'Air filters', pct: 12 },
    { label: 'Compressors', pct: 8 },
    { label: 'Fan motors',  pct: 6 },
    { label: 'Refrigerant', pct: -4 },
    { label: 'Thermostats', pct: -9 },
  ]
  const topFamilies = [
    { label: 'Compressors', w: 100, val: '$1.24M', badge: { text: '+8%',  cls: 'good' } },
    { label: 'Air filters', w: 79,  val: '$980k',  badge: { text: '+12%', cls: 'good' } },
    { label: 'Refrigerant', w: 70,  val: '$870k',  badge: { text: '−4%',  cls: 'bad' } },
    { label: 'Fan motors',  w: 61,  val: '$760k',  badge: { text: '+6%',  cls: 'good' } },
    { label: 'Thermostats', w: 55,  val: '$690k',  badge: { text: '−9%',  cls: 'bad' } },
  ]
  const quadCells = [
    { emoji: '💎', name: 'Good margin · low volume', act: 'Push the sales or test a lower price' },
    { emoji: '⭐', name: 'Good margin · high volume', act: 'Protect and maximise' },
    { emoji: '⚠️', name: 'Low margin · low volume',  act: 'Review or retire the reference' },
    { emoji: '📈', name: 'Low margin · high volume', act: 'Raise the price' },
  ]
  const dots = [
    { x: 24, y: 30 }, { x: 70, y: 22, c: '#10b981' }, { x: 80, y: 34, c: '#10b981' },
    { x: 30, y: 70, c: '#ef4444' }, { x: 60, y: 78, c: '#f59e0b' }, { x: 74, y: 64, c: '#f59e0b' },
    { x: 18, y: 44 }, { x: 86, y: 26, c: '#10b981' },
  ]
  return (
    <ProductPage accent="#3b82f6" accentSoft="rgba(59,130,246,0.12)">
      <PageHero
        eyebrow="Product · Sales Analysis" EyIcon={TrendUp}
        title={<>See what sold —<br />and what should have sold</>}
        lead="Find missing sales, declining categories and hidden demand gaps."
        float={{ Icon: ArrowsLeftRight, value: '+5%', label: 'Revenue YoY, all families' }}
      >
        <DashCard title="Revenue YoY" sub="This year vs. last · by family" tag="Live" TagIcon={TrendUp}>
          <DivergeBars rows={yoy} />
        </DashCard>
      </PageHero>

      <section className="pp-section">
        <SectionHead kicker="What it does" title="Sales explained clearly" body="VIA compares actual performance with expected demand." />
        <Row
          kicker="Year over year"
          title="Volume and revenue, side by side"
          body="Compare every SKU and family in units and revenue."
          bullets={['Risers and fallers', 'Missing-sales signals', 'Monthly trends']}
        >
          <DashCard title="Top families by revenue" sub="Filtered view · 962 SKUs" tag="Sortable" TagIcon={ChartBar}>
            <RankBars rows={topFamilies} />
          </DashCard>
        </Row>

        <Row
          reverse
          kicker="Strategic view"
          title="The four-quadrant map of your catalog"
          body="See which SKUs to push, protect, reprice or retire."
          bullets={['Volume × Margin', 'SKU count and revenue by quadrant', 'Click to filter']}
        >
          <DashCard title="Volume × Margin" sub="Each dot is a reference" tag="4 quadrants">
            <Quadrant cells={quadCells} dots={dots} axisX="Volume" axisY="Margin" />
          </DashCard>
        </Row>

        <Row
          kicker="Early warning"
          title="Spot declines before they become dead stock"
          body="Catch weak demand before it becomes overstock."
        >
          <DashCard title="Monthly revenue" sub="2025 vs. 2024" tag="Sparkline" TagIcon={TrendUp}>
            <SparkDual a={[42, 48, 45, 60, 55, 68, 64, 72, 70, 78, 74, 82]} b={[50, 52, 49, 55, 53, 58, 54, 57, 52, 56, 50, 53]} />
          </DashCard>
        </Row>
      </section>

      <Band
        kicker="The gain"
        title="Find the missed sale."
        body="See where expected demand did not happen, and what it may cost."
        stats={[['Expected vs actual', 'find hidden gaps'], ['962 SKUs', 'ranked fast'], ['Action first', 'push, protect, reprice or retire']]}
      />
      <Controls />
    </ProductPage>
  )
}

/* ═══════════════════════════════════════════════════════
   PAGE 2 — MARGIN ANALYSIS
═══════════════════════════════════════════════════════ */
export function MarginPage() {
  const buckets = [
    { label: 'Critical (< −5%)', pct: 12, c: '#ef4444' },
    { label: 'Strong (−5…−2%)',  pct: 18, c: '#f59e0b' },
    { label: 'Moderate (−2…0%)', pct: 28, c: '#f5c842' },
    { label: 'Up (≥ 0%)',        pct: 42, c: '#10b981' },
  ]
  const drops = [
    { label: 'Refrigerant R-32', w: 100, val: '−$52k', badge: { text: '−5%', cls: 'bad' } },
    { label: 'Thermostats T-9',  w: 74,  val: '−$31k', badge: { text: '−3%', cls: 'bad' } },
    { label: 'Compressor CX-2',  w: 58,  val: '−$24k', badge: { text: '−2%', cls: 'bad' } },
    { label: 'Valves V-440',     w: 40,  val: '−$16k', badge: { text: '−1%', cls: 'bad' } },
    { label: 'Ducting D-12',     w: 26,  val: '+$9k',  badge: { text: '+4%', cls: 'good' } },
  ]
  const heatRows = [
    { side: 'Compr.', vals: [33, 32, 31, 31, 30, 29] },
    { side: 'Filters', vals: [28, 28, 27, 27, 27, 26] },
    { side: 'Refrig.', vals: [27, 25, 24, 22, 21, 19] },
    { side: 'Motors', vals: [35, 34, 34, 33, 34, 33] },
  ]
  return (
    <ProductPage accent="#ff6a4d" accentSoft="rgba(255,117,87,0.13)">
      <PageHero
        eyebrow="Product · Margin Analysis" EyIcon={ChartBar}
        title={<>Protect margin<br />with the full picture</>}
        lead="Find margin leaks and price decisions that improve total profit."
        float={{ Icon: Warning, value: '−$360k', label: 'Margin at risk this year' }}
      >
        <DashCard title="Margin drift" sub="Share of catalog by bucket" tag="This year" TagIcon={ChartBar}>
          <StackDist segs={buckets} />
        </DashCard>
      </PageHero>

      <section className="pp-section">
        <SectionHead kicker="What it does" title="Know where profit is leaking" body="VIA shows the margin drift and its financial impact." />
        <Row
          kicker="SKU level"
          title="Margin drift, reference by reference"
          body="Rank every SKU by margin change and financial impact."
          bullets={['Euro impact', 'Risk buckets', 'Product and family drilldown']}
        >
          <DashCard title="Biggest margin movers" sub="Δ margin × revenue" tag="Worst first" TagIcon={Warning}>
            <RankBars rows={drops} />
          </DashCard>
        </Row>

        <Row
          reverse
          kicker="Diagnosis"
          title="Gradual, sudden, or seasonal?"
          body="See if the issue is gradual, sudden or seasonal."
        >
          <DashCard title="Monthly margin %" sub="2025 vs. 2024" tag="Sparkline" TagIcon={TrendUp}>
            <SparkDual a={[31, 30, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21]} b={[32, 32, 31, 31, 30, 30, 29, 29, 28, 28, 27, 27]} />
          </DashCard>
        </Row>

        <Row
          kicker="By family"
          title="Where the pressure is building"
          body="Spot weak categories before the leak spreads."
        >
          <DashCard title="Margin % by family" sub="Last 6 months" tag="Heatmap">
            <Heat cols={['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} rows={heatRows} />
          </DashCard>
        </Row>
      </section>

      <Band
        kicker="The gain"
        title="Not every price increase helps."
        body="VIA shows customer, volume and basket impact before you act."
        stats={[['−2%', 'hidden margin drift'], ['$360k', 'margin at stake'], ['Context', 'before pricing action']]}
      />
      <Controls />
    </ProductPage>
  )
}

/* ═══════════════════════════════════════════════════════
   PAGE 3 — INVENTORY & OVERSTOCK
═══════════════════════════════════════════════════════ */
export function InventoryPage() {
  const stockHealth = [
    { label: 'All SKUs',    val: '962', h: 100, c: '#7856ff' },
    { label: 'In stock',    val: '811', h: 84,  c: '#8b6bff' },
    { label: 'Slow movers', val: '433', h: 45,  c: '#a080ff' },
    { label: 'Dead stock',  val: '211', h: 22,  c: '#ff7557' },
    { label: 'Neg. margin', val: '41',  h: 12,  c: '#ef4444' },
  ]
  const trapped = [
    { label: 'Compressor CX-200', w: 100, val: '$48k', badge: { text: 'Freeze',     cls: 'amber' } },
    { label: 'Filter kit FK-12',  w: 78,  val: '$31k', badge: { text: 'Push',       cls: 'violet' } },
    { label: 'Drive belt B-440',  w: 67,  val: '$27k', badge: { text: 'Liquidate',  cls: 'bad' } },
    { label: 'Coolant R-32',      w: 55,  val: '$22k', badge: { text: 'Neg. margin', cls: 'bad' } },
    { label: 'Fan motor FM-9',    w: 47,  val: '$19k', badge: { text: 'Freeze',     cls: 'amber' } },
  ]
  const cover = [
    { label: 'Sensor S-12',   sub: '0.6 mo · 38% margin', w: 14, tick: 25, c: '#ef4444' },
    { label: 'Belt B-77',     sub: '1.2 mo · 31% margin', w: 28, tick: 25, c: '#f59e0b' },
    { label: 'Filter FK-30',  sub: '1.8 mo · 27% margin', w: 44, tick: 25, c: '#f5c842' },
    { label: 'Valve V-9',     sub: '2.6 mo · 34% margin', w: 64, tick: 25, c: '#10b981' },
  ]
  const quadCells = [
    { emoji: '⭐', name: 'Low stock · good margin', act: 'Maintain — watch reorder' },
    { emoji: '💎', name: 'High stock · good margin', act: 'Play on price to clear' },
    { emoji: '📈', name: 'Low stock · low margin',  act: 'Raise the price' },
    { emoji: '⚠️', name: 'High stock · low margin', act: 'Liquidation — top priority' },
  ]
  const dots = [
    { x: 22, y: 28, c: '#10b981' }, { x: 30, y: 36, c: '#10b981' }, { x: 72, y: 26 },
    { x: 80, y: 38 }, { x: 28, y: 72, c: '#f59e0b' }, { x: 70, y: 76, c: '#ef4444' }, { x: 82, y: 66, c: '#ef4444' },
  ]
  return (
    <ProductPage accent="#7856ff" accentSoft="rgba(120,86,255,0.12)">
      <PageHero
        eyebrow="Product · Inventory & Overstock" EyIcon={Stack}
        title={<>Find the cash<br />trapped in your stock</>}
        lead="Find excess stock, dead stock and items not to reorder."
        float={{ Icon: Package, value: '$312k', label: 'Capital at risk · 47 SKUs' }}
      >
        <DashCard title="Stock health" sub="962 SKUs · 13% dead stock" tag="Last 12 mo" TagIcon={Stack}>
          <BarsV data={stockHealth} />
        </DashCard>
      </PageHero>

      <section className="pp-section">
        <SectionHead kicker="What it does" title="Reduce stock risk" body="VIA ranks excess stock and stockout risk by business impact." />
        <Row
          kicker="Overstock"
          title="Capital trapped in slow-movers"
          body="Rank SKUs by trapped capital, demand and margin risk."
          bullets={['Capital at risk', 'Action label', 'Demand and margin filters']}
        >
          <DashCard title="Top references by capital at risk" sub="Score = capital × margin risk" tag="Action" TagIcon={Warning}>
            <RankBars rows={trapped} />
          </DashCard>
        </Row>

        <Row
          reverse
          kicker="Replenishment"
          title="Catch your winners before they run out"
          body="Prioritize what to reorder before sales are lost."
          bullets={['Urgency tiers', 'Months of cover', 'Supplier lead time']}
        >
          <DashCard title="Running low on cover" sub="High margin · low stock" tag="Urgency" TagIcon={Package}>
            <Bullets rows={cover} />
          </DashCard>
        </Row>

        <Row
          kicker="The right call"
          title="Liquidate, push or wait"
          body="Choose the right action for each stock position."
        >
          <DashCard title="Stock × Margin" sub="Each dot is a reference" tag="4 quadrants">
            <Quadrant cells={quadCells} dots={dots} axisX="Months of stock" axisY="Margin" />
          </DashCard>
        </Row>
      </section>

      <Band
        kicker="The gain"
        title="Stop financing stock that doesn't move."
        body="Release cash without hurting useful stock."
        stats={[['< 1s', 'rank SKUs'], ['$312k', 'capital at risk'], ['Action', 'push, freeze or liquidate']]}
      />
      <Controls />
    </ProductPage>
  )
}

/* ═══════════════════════════════════════════════════════
   PAGE 4 — CUSTOMER PERFORMANCE
═══════════════════════════════════════════════════════ */
export function CustomersPage() {
  const accounts = [
    { label: 'Garage Centre · $1.24M', w: 100, val: 'Key',  c: '#10b981', badge: { text: '−18%', cls: 'bad' } },
    { label: 'NordPièces · $880k',     w: 71,  val: 'Key',  c: '#10b981', badge: { text: '+6%',  cls: 'good' } },
    { label: 'AutoSud · $640k',        w: 52,  val: 'Mid',  c: '#5ab4ff', badge: { text: '+14%', cls: 'good' } },
    { label: 'MécaPro · $410k',        w: 33,  val: 'Mid',  c: '#5ab4ff', badge: { text: '−7%',  cls: 'bad' } },
    { label: 'Atelier 12 · $190k',     w: 16,  val: 'Small', c: '#c4b0ff', badge: { text: '+3%', cls: 'good' } },
  ]
  const mix = [
    { label: 'Compressors', val: 38, c: '#7856ff' },
    { label: 'Filters',     val: 27, c: '#5ab4ff' },
    { label: 'Refrigerant', val: 21, c: '#4ecab8' },
    { label: 'Other',       val: 14, c: '#c4b0ff' },
  ]
  const watch = [
    { label: 'Garage Centre', w: 100, val: '−18%', badge: { text: 'Key', cls: 'slate' } },
    { label: 'MécaPro',       w: 62,  val: '−7%',  badge: { text: 'Mid', cls: 'slate' } },
    { label: 'Pièces Express', w: 40, val: '−6%',  badge: { text: 'Mid', cls: 'slate' } },
  ]
  const growing = [
    { label: 'AutoSud',    w: 100, val: '+14%', badge: { text: 'Mid', cls: 'slate' } },
    { label: 'NordPièces', w: 64,  val: '+6%',  badge: { text: 'Key', cls: 'slate' } },
    { label: 'Atelier 12', w: 34,  val: '+3%',  badge: { text: 'Small', cls: 'slate' } },
  ]
  return (
    <ProductPage accent="#10b981" accentSoft="rgba(16,185,129,0.12)">
      <PageHero
        eyebrow="Product · Customer Performance" EyIcon={UsersThree}
        title={<>Know true<br />customer value</>}
        lead="See growth, margin, mix, risk and missed categories by account."
        float={{ Icon: TrendUp, value: '−18%', label: 'Top account, year over year' }}
      >
        <DashCard title="Accounts by revenue" sub="With YoY and tier" tag="Portfolio" TagIcon={UsersThree}>
          <RankBars rows={accounts} />
        </DashCard>
      </PageHero>

      <section className="pp-section">
        <SectionHead kicker="What it does" title="Look beyond revenue" body="VIA shows which customers are growing, slipping or underperforming." />
        <Row
          kicker="Portfolio"
          title="Every account, ranked and tiered"
          body="Rank accounts by revenue, growth, margin and tier."
          bullets={['Growth and decline', 'Customer tiers', 'Product mix']}
        >
          <DashCard title="Category mix" sub="Selected account · share of revenue" tag="Account view">
            <Donut segs={mix} />
          </DashCard>
        </Row>

        <Row
          reverse
          kicker="Two watchlists"
          title="Accounts to watch, accounts on the rise"
          body="Know who to protect, recover or grow next."
        >
          <DashCard title="Spotlight" sub="Threshold ±5%" tag="Live" TagIcon={TrendUp}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <div className="dc-t" style={{ marginBottom: 10 }}><small style={{ color: '#dc2626', fontWeight: 700 }}>To watch</small></div>
                <RankBars rows={watch} />
              </div>
              <div>
                <div className="dc-t" style={{ marginBottom: 10 }}><small style={{ color: '#059669', fontWeight: 700 }}>Growing</small></div>
                <RankBars rows={growing} />
              </div>
            </div>
          </DashCard>
        </Row>
      </section>

      <Band
        kicker="The gain"
        title="Revenue is not customer value."
        body="Protect profitable accounts and recover weak ones."
        stats={[['15% → −3%', 'key account risk'], ['Mix', 'hidden opportunity'], ['Action', 'protect, recover or grow']]}
      />
      <Controls />
    </ProductPage>
  )
}

/* ═══════════════════════════════════════════════════════
   SECURITY / PRICING / CONTACT — shared illustrations
═══════════════════════════════════════════════════════ */
function CheckList({ items, tone = 'ok' }) {
  return (
    <ul className={`check-list ${tone}`}>
      {items.map((it, i) => (
        <li key={i}>
          <span className="cl-ic">{tone === 'no' ? <X size={13} weight="bold" /> : <Check size={13} weight="bold" />}</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

function CompareTable({ head, rows }) {
  return (
    <div className="cmp-wrap">
      <table className="cmp-table">
        <thead>
          <tr><th>{head[0]}</th><th>{head[1]}</th><th className="hl">{head[2]}</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r[0]}</td>
              <td>{r[1]}</td>
              <td className="hl">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AirgapDiagram() {
  return (
    <svg className="airgap" viewBox="0 0 480 300" role="img" aria-label="VIA runs inside your network with no outbound connection">
      <defs>
        <linearGradient id="netg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(120,86,255,0.10)" />
          <stop offset="100%" stopColor="rgba(120,86,255,0.02)" />
        </linearGradient>
      </defs>
      {/* network boundary */}
      <rect x="20" y="40" width="300" height="230" rx="18" fill="url(#netg)" stroke="#7856ff" strokeWidth="1.5" strokeDasharray="2 0" />
      <text x="40" y="66" fill="#7856ff" fontSize="12" fontWeight="800" fontFamily="'Bricolage Grotesque',sans-serif">YOUR NETWORK</text>
      {/* ERP node */}
      <g>
        <rect x="48" y="120" width="104" height="64" rx="12" fill="#fff" stroke="#e8e4ee" />
        <text x="100" y="150" textAnchor="middle" fill="#221d2b" fontSize="13" fontWeight="800" fontFamily="'Bricolage Grotesque',sans-serif">ERP</text>
        <text x="100" y="168" textAnchor="middle" fill="#8c8696" fontSize="10">Excel export</text>
      </g>
      {/* VIA node */}
      <g>
        <rect x="188" y="112" width="104" height="80" rx="12" fill="#1a1523" />
        <text x="240" y="148" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="800" fontFamily="'Bricolage Grotesque',sans-serif">VIA</text>
        <text x="240" y="167" textAnchor="middle" fill="#c4b0ff" fontSize="10">runs locally</text>
      </g>
      {/* ERP -> VIA arrow */}
      <line x1="152" y1="152" x2="188" y2="152" stroke="#7856ff" strokeWidth="2" markerEnd="url(#arr)" />
      <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#7856ff" /></marker></defs>
      {/* internet cloud outside */}
      <g>
        <rect x="372" y="120" width="92" height="64" rx="14" fill="#faf7ff" stroke="#e8e4ee" />
        <text x="418" y="150" textAnchor="middle" fill="#9b95a6" fontSize="12" fontWeight="700">Internet</text>
        <text x="418" y="167" textAnchor="middle" fill="#bdb7c8" fontSize="9">cloud · APIs</text>
      </g>
      {/* severed link VIA -> internet */}
      <line x1="292" y1="152" x2="372" y2="152" stroke="#d9d3e2" strokeWidth="2" strokeDasharray="5 5" />
      <g transform="translate(332 152)">
        <circle r="15" fill="#fff" stroke="#ef4444" strokeWidth="2" />
        <line x1="-7" y1="-7" x2="7" y2="7" stroke="#ef4444" strokeWidth="2.2" />
        <line x1="7" y1="-7" x2="-7" y2="7" stroke="#ef4444" strokeWidth="2.2" />
      </g>
      <text x="332" y="196" textAnchor="middle" fill="#ef4444" fontSize="10.5" fontWeight="800">no outbound</text>
    </svg>
  )
}

function OptionCards({ options }) {
  return (
    <div className="opt-grid">
      {options.map((o, i) => (
        <motion.div className={`opt-card${o.rec ? ' rec' : ''}`} key={i} {...fadeUp(i * 0.08)}>
          {o.rec && <span className="opt-flag">Recommended</span>}
          <span className="opt-ic"><o.Icon size={20} weight="bold" /></span>
          <h4>{o.title}</h4>
          <p>{o.desc}</p>
          <span className="opt-best">{o.best}</span>
        </motion.div>
      ))}
    </div>
  )
}

function Timeline({ steps }) {
  return (
    <div className="timeline">
      {steps.map((s, i) => (
        <motion.div className="tl-step" key={i} {...fadeUp(i * 0.07)}>
          <span className="tl-dot">{i + 1}</span>
          <strong>{s.t}</strong>
          <span>{s.d}</span>
        </motion.div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   SECURITY — ON-PREMISE / AIR-GAPPED (vase clos)
═══════════════════════════════════════════════════════ */
export function OnPremSecurityPage() {
  return (
    <ProductPage accent="#7856ff" accentSoft="rgba(120,86,255,0.12)">
      <PageHero
        eyebrow="Security · Installed at your site" EyIcon={Lock}
        title={<>Installed at your site.<br />Air-gapped by design.</>}
        lead="VIA runs entirely inside your network. No API, no outbound connection, no cloud — it physically cannot send your data anywhere. You buy it once, you host it, you own it."
        float={{ Icon: ShieldCheck, value: '0', label: 'outbound connections' }}
      >
        <DashCard title="How it sits in your network" sub="ERP export in · nothing out" tag="Vase clos" TagIcon={Lock}>
          <AirgapDiagram />
        </DashCard>
      </PageHero>

      <section className="pp-section">
        <SectionHead kicker="The principle" title="The software simply doesn't talk to the outside" body="No API. No outbound network call. No cloud service. No AI agent. No auto-update. It can neither send your data away nor receive instructions from outside." />
        <Row
          kicker="Verified in the code"
          title="Not a promise — a property we can show you"
          body="The application was read specifically to confirm there is no path out. Your IT can repeat every one of these checks before anything goes near production."
          bullets={['No API keys or external-service configuration', 'Every file read points to a local path', 'No network library: no outbound request, no realtime, no telemetry beacon', 'No analytics or tracking of any kind', 'Fonts embedded locally — it never even fetches a resource to display']}
        >
          <DashCard title="Source-code review" sub="What we confirmed" tag="Auditable" TagIcon={ListChecks}>
            <CheckList items={['0 API keys / external config', 'All fetches resolve to local files', 'No axios / WebSocket / sendBeacon', 'No analytics or telemetry', 'Fonts bundled, not fetched']} />
          </DashCard>
        </Row>

        <Row
          reverse
          kicker="Attack surface"
          title="Nothing new is exposed to the network"
          body="VIA fits inside your existing security perimeter without widening it. There is no server to expose, no server-side database, no online account to phish."
        >
          <DashCard title="Typical SaaS tool vs. VIA on-premise" sub="What each one exposes" tag="Comparison">
            <CompareTable
              head={['', 'Typical SaaS', 'VIA on-prem']}
              rows={[
                ['Exposed server', 'Yes', 'No'],
                ['Server database', 'Yes', 'No'],
                ['Online account', 'Yes', 'No'],
                ['Outbound traffic', 'Constant', 'None'],
                ['Data leaves site', 'Yes', 'Never'],
              ]}
            />
          </DashCard>
        </Row>
      </section>

      <section className="pp-section tight">
        <SectionHead kicker="Honest by design" title="The one risk worth an expert's attention" body="Like any modern software, VIA is built on open-source libraries (React, Recharts, SheetJS). The theoretical risk is that one contains unwanted code — and here's why it's contained." />
        <div className="sec-twocol">
          <motion.div className="dash-card lg" {...fadeUp(0)}>
            <div className="dc-head"><span className="dc-t"><strong>Why it's contained</strong><small>supply-chain risk, neutralised</small></span></div>
            <CheckList items={['Even a malicious library could exfiltrate nothing — there is no outbound channel', 'Libraries are few, widely used and auditable', 'We hand over the full component inventory (every library and version)']} />
          </motion.div>
          <motion.div className="dash-card lg" {...fadeUp(0.1)}>
            <div className="dc-head"><span className="dc-t"><strong>Anticipate a false positive</strong><small>the "http://" strings in the code</small></span></div>
            <p className="sec-note">Searching the built code turns up addresses like <code>openoffice.org</code> or <code>purl.org</code>. These are <strong>file-format identifiers</strong> (Excel/OpenOffice XML namespaces) and documentation links in error messages — text labels, never connections. The real test is to watch the network while VIA runs: zero outbound.</p>
          </motion.div>
        </div>
      </section>

      <section className="pp-section">
        <SectionHead kicker="Verify it yourself" title="Security shouldn't be taken on trust" body="VIA gives you what you need to check, and your team runs its own controls before production." />
        <div className="sec-twocol">
          <motion.div className="dash-card lg" {...fadeUp(0)}>
            <div className="dc-head"><span className="dc-t"><strong>What VIA provides</strong></span><span className="dc-tag" style={{ color: 'var(--accent)' }}><Package size={12} weight="bold" />Handover</span></div>
            <CheckList items={['Full component inventory (libraries + versions)', 'Access to the source code — small and readable', 'Checksums of the delivered files', 'Documentation confirming no API, no external link']} />
          </motion.div>
          <motion.div className="dash-card lg" {...fadeUp(0.1)}>
            <div className="dc-head"><span className="dc-t"><strong>What your IT can do</strong></span><span className="dc-tag" style={{ color: 'var(--accent)' }}><ListChecks size={12} weight="bold" />Your controls</span></div>
            <CheckList items={['Watch network traffic while it runs — expect zero outbound', 'Review the source code', 'Audit dependencies with your own tools', 'Test in a sandbox, run a pen test if your policy requires']} />
          </motion.div>
        </div>
      </section>

      <section className="pp-section">
        <SectionHead kicker="Installation" title="Three ways to install it — your call" body="VIA is a web app that needs to be served locally. Pick the form that suits your estate; your IT keeps full control of the machine it runs on." />
        <OptionCards options={[
          { Icon: HardDrives, title: 'Desktop app', desc: 'Packaged as a signed executable. Double-click, a dedicated window opens, runs offline. Signed so you can verify the file is untouched.', best: 'Best for a few users on identified machines', rec: true },
          { Icon: Browser,    title: 'Internal server', desc: 'Served from one machine on your network, reached via browser on the LAN only — never exposed outside. Updates centralised on one box.', best: 'Best for multi-user access across desks' },
          { Icon: Cube,       title: 'Portable version', desc: 'A self-contained folder (even on USB) launched locally, no system install. The easiest to audit and sandbox.', best: 'Best for auditing before you commit' },
        ]} />
        <div className="tl-head"><span className="pp-kicker"><span className="dot" />A clean handover</span></div>
        <Timeline steps={[
          { t: 'Handover & audit', d: 'Component inventory and source go to your IT for review in a sandbox.' },
          { t: 'Validation', d: 'Your team signs off after its own tests.' },
          { t: 'Production install', d: 'Installed with checksum verification of every file.' },
          { t: 'Hyper-care begins', d: 'Around twelve months of close support starts.' },
        ]} />
      </section>

      <Band
        kicker="After go-live"
        title="A year of hyper-care, then it's simply yours."
        body="Because it's offline and yours, no logs reach us automatically. You flag an issue by email or phone; we patch and adjust directly. When you move to SAP later, only the column mapping changes."
        stats={[['~12 mo', 'of priority support and included changes'], ['0 logs', 'leave your site — you tell us, we fix'], ['SAP-ready', 'same Excel exports, just remap the columns']]}
      />

      <section className="pp-section tight">
        <div className="sec-cross">
          <div>
            <strong>Prefer not to host it yourself?</strong>
            <span>VIA can also run as a managed service, with security handled for you.</span>
          </div>
          <a className="pill subtle" href="#/security/saas">See VIA SaaS <ArrowRight size={14} /></a>
        </div>
      </section>
    </ProductPage>
  )
}

/* ═══════════════════════════════════════════════════════
   SECURITY — SAAS (managed)
═══════════════════════════════════════════════════════ */
export function SaasSecurityPage() {
  return (
    <ProductPage accent="#3b82f6" accentSoft="rgba(59,130,246,0.12)">
      <PageHero
        eyebrow="Security · SaaS option" EyIcon={Globe}
        title={<>VIA, hosted for you.<br />Secure by default.</>}
        lead="Prefer zero maintenance? VIA can run as a managed service — the same seven analyses, with hosting, updates and security handled for you."
        float={{ Icon: ShieldCheck, value: 'TLS', label: 'encrypted in transit & at rest' }}
      >
        <DashCard title="Managed & protected" sub="What the SaaS option covers" tag="Hosted" TagIcon={Globe}>
          <div className="sec-feature-grid">
            {[
              { Icon: Lock, t: 'Encrypted', d: 'In transit and at rest' },
              { Icon: Fingerprint, t: 'Access control', d: 'Per-user, role-based' },
              { Icon: Database, t: 'Isolated', d: 'Your data in its own space' },
              { Icon: Wrench, t: 'Maintained', d: 'Updates & backups for you' },
            ].map((f, i) => (
              <div className="sfg-cell" key={i}>
                <span className="sfg-ic"><f.Icon size={17} weight="bold" /></span>
                <strong>{f.t}</strong><span>{f.d}</span>
              </div>
            ))}
          </div>
        </DashCard>
      </PageHero>

      <section className="pp-section">
        <SectionHead kicker="What you get" title="Security handled, so you don't have to" body="The managed option keeps the analysis identical and takes the operational load off your team." />
        <Row
          kicker="Protection"
          title="Encrypted, isolated, access-controlled"
          body="Your data is encrypted in transit and at rest. Each customer lives in its own logical space — never mixed, never resold. Access is per-user and role-based, with SSO available on request."
          bullets={['TLS in transit, encryption at rest', 'Per-customer isolation', 'Role-based access, SSO on request', 'Regular backups, handled for you']}
        >
          <DashCard title="Account access" sub="Per-user, role-based" tag="SSO ready" TagIcon={Fingerprint}>
            <CheckList items={['Named user accounts', 'Roles: admin, analyst, viewer', 'SSO / SAML on request', 'Access revocable at any time']} />
          </DashCard>
        </Row>

        <Row
          reverse
          kicker="Your data stays yours"
          title="We host it — we don't own it"
          body="We never sell or share your data. You can export it or request deletion at any time. Hosting region and any compliance specifics are confirmed for your engagement."
        >
          <DashCard title="Data handling" sub="Hosted, never sold" tag="Yours">
            <CheckList items={['Never sold, never shared with third parties', 'Export on request', 'Deletion on request', 'Hosting region confirmed per engagement']} />
          </DashCard>
        </Row>
      </section>

      <section className="pp-section tight">
        <SectionHead kicker="Which one fits you?" title="SaaS or on-premise — a straight answer" body="If you want nothing to leave your network, choose on-premise. If you want zero maintenance, choose SaaS." />
        <CompareTable
          head={['', 'SaaS (managed)', 'On-premise (air-gapped)']}
          rows={[
            ['Hosting', 'We host it', 'You host it'],
            ['Data location', 'Managed cloud', 'Your machines only'],
            ['Maintenance', 'Handled for you', 'You + hyper-care'],
            ['Outbound traffic', 'Encrypted', 'None'],
            ['Best for', 'Zero maintenance', 'Maximum isolation'],
          ]}
        />
        <div className="sec-cross" style={{ marginTop: 28 }}>
          <div>
            <strong>Want nothing to leave your network?</strong>
            <span>The air-gapped, on-premise option keeps every byte inside your walls.</span>
          </div>
          <a className="pill subtle" href="#/security/on-prem">See the air-gapped option <ArrowRight size={14} /></a>
        </div>
      </section>

      <Band
        kicker="Either way"
        title="Same analyses. You choose the trust model."
        body="On-premise for total isolation, SaaS for zero upkeep — the seven analyses, the tailored thresholds and the one-click Excel export are identical."
        stats={[['7', 'analyses, in both models'], ['You decide', 'where your data lives'], ['No resale', 'your data is never sold or shared']]}
      />
    </ProductPage>
  )
}

/* ═══════════════════════════════════════════════════════
   PRICING
═══════════════════════════════════════════════════════ */
export function PricingPage() {
  const plans = [
    {
      name: 'Owned', tag: 'On-premise', accent: '#7856ff', rec: true,
      line: 'Buy once. Install on your machines. Own it for good.',
      price: 'One-time licence', priceSub: 'tailored to your needs — contact us',
      feats: ['Air-gapped — nothing leaves your network', 'Full source & component inventory handed over', 'Three install options (desktop, server, portable)', '≈ 12 months of hyper-care included', 'Smooth path to SAP exports'],
      cta: 'Request a quote',
    },
    {
      name: 'Managed', tag: 'SaaS', accent: '#3b82f6', rec: false,
      line: 'We host it, secure it and keep it up to date.',
      price: 'From $550/mo', priceSub: 'scales with your needs — contact us',
      feats: ['Hosting, updates & backups handled for you', 'Encrypted in transit and at rest', 'Per-user, role-based access (SSO on request)', 'Your data isolated, never resold', 'Same seven analyses'],
      cta: 'Request a quote',
    },
  ]
  return (
    <ProductPage accent="#7856ff" accentSoft="rgba(120,86,255,0.12)">
      <PageHero
        eyebrow="Pricing" EyIcon={Sparkle}
        title={<>Two ways to own VIA.</>}
        lead="One software, one purpose — pick the model that fits how you want to run it. Plans start at $550/month and scale with your catalogue size and team, so let's talk."
        float={{ Icon: Sparkle, value: 'From $550/mo', label: 'starting price · scales with needs' }}
      >
        <div className="plan-mini">
          <div className="plan-mini-row"><span className="pm-dot" style={{ background: '#7856ff' }} />Owned · on-premise<strong>One-time</strong></div>
          <div className="plan-mini-row"><span className="pm-dot" style={{ background: '#3b82f6' }} />Managed · SaaS<strong>From $550/mo</strong></div>
          <div className="plan-mini-note">Both include the seven analyses, tunable thresholds and one-click Excel export. Final price depends on your needs — contact us.</div>
        </div>
      </PageHero>

      <section className="pp-section">
        <div className="plan-grid">
          {plans.map((p, i) => (
            <motion.div className={`plan-card${p.rec ? ' rec' : ''}`} key={i} style={{ '--accent': p.accent }} {...fadeUp(i * 0.1)}>
              {p.rec && <span className="plan-flag">Most secure</span>}
              <span className="plan-tag">{p.tag}</span>
              <h3>{p.name}</h3>
              <p className="plan-line">{p.line}</p>
              <div className="plan-price"><strong>{p.price}</strong><span>{p.priceSub}</span></div>
              <ul className="plan-feats">
                {p.feats.map((f, j) => <li key={j}><span className="pf-ic"><Check size={14} weight="bold" /></span>{f}</li>)}
              </ul>
              <a className={`pill ${p.rec ? 'dark' : 'subtle'} large plan-cta`} href="#/contact">{p.cta} <ArrowRight size={15} /></a>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pp-section tight">
        <SectionHead kicker="Side by side" title="What changes between the two" />
        <CompareTable
          head={['', 'Owned · on-premise', 'Managed · SaaS']}
          rows={[
            ['Payment', 'One-time licence', 'From $550/mo'],
            ['Hosting', 'Your machines', 'We host it'],
            ['Data location', 'Your network only', 'Managed cloud'],
            ['Updates', 'Manual, during hyper-care', 'Automatic'],
            ['Support', '≈ 12 months hyper-care', 'Included while subscribed'],
            ['Best for', 'Maximum isolation', 'Zero maintenance'],
          ]}
        />
      </section>

      <Band
        kicker="No surprises"
        title="From $550/month, tailored to you."
        body="Plans start at $550/month and scale with your catalogue size and team. Tell us your setup and we'll come back with a clear quote — no lock-in."
        stats={[['From $550/mo', 'starting point, scales with your needs'], ['No lock-in', 'own it outright, or cancel anytime'], ['One demo', 'on your own data before you decide']]}
      />
    </ProductPage>
  )
}

/* ═══════════════════════════════════════════════════════
   CONTACT / DEMO — Formspree
═══════════════════════════════════════════════════════ */
export function ContactPage() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    try {
      const res = await fetch('https://formspree.io/f/mwvwnalv', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('ok'); form.reset() } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  return (
    <ProductPage accent="#7856ff" accentSoft="rgba(120,86,255,0.12)">
      <section className="pp-hero">
        <div className="pp-hero-inner contact-inner">
          <motion.div {...fadeUp(0)}>
            <span className="pp-eyebrow"><span className="ey-ic"><Sparkle size={13} weight="bold" /></span>Book a demo</span>
            <h1>See VIA on<br />your own data</h1>
            <p className="lead">Send us a bit about your setup and we'll set up a demo built from your catalogue. No commitment — just a clear look at what VIA surfaces.</p>
            <ul className="pp-bullets" style={{ marginTop: 22 }}>
              <li><span className="bl-ic"><Check size={15} weight="bold" /></span>A demo built from your own ERP export</li>
              <li><span className="bl-ic"><Check size={15} weight="bold" /></span>On-premise or SaaS — we'll advise</li>
              <li><span className="bl-ic"><Check size={15} weight="bold" /></span>A tailored quote, no sticker price</li>
            </ul>
          </motion.div>

          <motion.div className="form-card" {...fadeUp(0.12)}>
            {status === 'ok' ? (
              <div className="form-success">
                <span className="fs-ic"><Check size={26} weight="bold" /></span>
                <h3>Thanks — message sent.</h3>
                <p>We'll be in touch shortly to set up your demo.</p>
                <button className="pill subtle" onClick={() => setStatus('idle')}>Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <label className="field"><span>Name</span><input name="name" required placeholder="Jane Doe" /></label>
                  <label className="field"><span>Company</span><input name="company" required placeholder="Your company" /></label>
                </div>
                <div className="form-grid">
                  <label className="field"><span>Work email</span><input type="email" name="email" required placeholder="you@company.com" /></label>
                  <label className="field"><span>Role</span><input name="role" placeholder="Operations, purchasing…" /></label>
                </div>
                <label className="field"><span>Interested in</span>
                  <select name="deployment" defaultValue="">
                    <option value="" disabled>Choose a model…</option>
                    <option value="on-premise">On-premise (air-gapped)</option>
                    <option value="saas">SaaS (managed)</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </label>
                <label className="field"><span>Anything we should know?</span>
                  <textarea name="message" rows="3" placeholder="Catalogue size, ERP, what you'd like to see…" />
                </label>
                <button className="pill dark large form-submit" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : <>Request a demo <ArrowRight size={15} /></>}
                </button>
                {status === 'error' && <p className="form-err">Something went wrong — please email contact@viahq.ai instead.</p>}
                <p className="form-note">Or email us directly at <a href="mailto:contact@viahq.ai">contact@viahq.ai</a></p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </ProductPage>
  )
}

/* ─── Route registry ─── */
export const ROUTES = {
  sales:               SalesPage,
  margin:              MarginPage,
  inventory:           InventoryPage,
  customers:           CustomersPage,
  'security/on-prem':  OnPremSecurityPage,
  'security/saas':     SaasSecurityPage,
  pricing:             PricingPage,
  contact:             ContactPage,
}
