import {
  Atom,
  BadgeCheck,
  BookOpen,
  Calculator,
  Dna,
  FlaskConical,
  Sparkles,
  Star,
  Terminal,
} from 'lucide-react'
import { Link } from '../lib/router'

/* --------------------------------------------------------------------------
   Brand
   -------------------------------------------------------------------------- */

export function Logo({ inverse = false, className = '' }) {
  return (
    <span className={`brand ${inverse ? 'brand--inverse' : ''} ${className}`}>
      <span className="brand__mark" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 17.5V7.2c0-.8.7-1.4 1.4-1.2 2.4.6 4.5 1.8 6.6 3.6 2.1-1.8 4.2-3 6.6-3.6.7-.2 1.4.4 1.4 1.2v10.3"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M12 9.6v8.2M7.4 12.4c1.2.4 2.3 1 3.2 1.8M16.6 12.4c-1.2.4-2.3 1-3.2 1.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M18.7 3.2l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6Z"
            fill="#F2C879"
          />
        </svg>
      </span>
      <span className="brand__word">
        Smart<em>Learn</em>
      </span>
    </span>
  )
}

/* --------------------------------------------------------------------------
   Avatars, badges, progress
   -------------------------------------------------------------------------- */

export function Avatar({
  name,
  initials,
  tint = ['#E5F0EB', '#2F7567'],
  size = 44,
  online = false,
  className = '',
}) {
  const derived =
    initials ||
    (name || '?')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase()

  return (
    <span
      className={`avatar ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.34),
        color: tint[1],
        background: `linear-gradient(145deg, ${tint[0]}, ${tint[0]} 45%, ${mix(
          tint[0],
          '#ffffff',
          0.55,
        )})`,
      }}
      title={name}
      aria-label={name}
      role="img"
    >
      {derived}
      {online ? <span className="avatar__online" aria-hidden="true" /> : null}
    </span>
  )
}

function mix(hex, target, amount) {
  const parse = (value) => {
    const v = value.replace('#', '')
    return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16))
  }
  const [r1, g1, b1] = parse(hex)
  const [r2, g2, b2] = parse(target)
  const to = (a, b) => Math.round(a + (b - a) * amount)
  return `rgb(${to(r1, r2)}, ${to(g1, g2)}, ${to(b1, b2)})`
}

export function VerifiedBadge({ label = 'Verified' }) {
  return (
    <span className="badge badge--teal">
      <BadgeCheck />
      {label}
    </span>
  )
}

export function Badge({ children, variant = '', icon: Icon, className = '' }) {
  return (
    <span className={`badge ${variant ? `badge--${variant}` : ''} ${className}`}>
      {Icon ? <Icon /> : null}
      {children}
    </span>
  )
}

export function Bar({ value, tone = 'teal', size = '', label, showValue }) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={`bar ${size === 'sm' ? 'bar--sm' : size === 'lg' ? 'bar--lg' : ''}`}>
      <div
        className={`bar__fill is-${tone}`}
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
      />
      {showValue ? <span className="sr-only">{clamped}%</span> : null}
    </div>
  )
}

export function ProgressRing({
  value,
  size = 96,
  stroke = 9,
  color = 'var(--teal)',
  label,
  sublabel,
}) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EBF1ED"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (clamped / 100) * circumference}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1s var(--ease)' }}
        />
      </svg>
      <span className="ring__label">
        <strong>{label ?? `${Math.round(clamped)}%`}</strong>
        {sublabel ? <small>{sublabel}</small> : null}
      </span>
    </div>
  )
}

export function Stars({ value, size = 13 }) {
  const rounded = Math.round(value)
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((index) => (
        <Star
          key={index}
          width={size}
          height={size}
          style={{ opacity: index < rounded ? 1 : 0.28 }}
        />
      ))}
    </span>
  )
}

export function Rating({ value, count }) {
  return (
    <span className="rating">
      <Star size={13} style={{ fill: 'var(--gold)', color: 'var(--gold-600)' }} />
      {value}
      {count ? <span>({count})</span> : null}
    </span>
  )
}

/* --------------------------------------------------------------------------
   Section headings
   -------------------------------------------------------------------------- */

export function SectionHead({ eyebrow, title, lead, action, className = '' }) {
  return (
    <div className={`section-head ${className}`}>
      <div className="section-head__text">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2 className="section-title">{title}</h2>
        {lead ? <p className="section-lead">{lead}</p> : null}
      </div>
      {action}
    </div>
  )
}

export function Spark({ children }) {
  return (
    <span className="ai-note">
      <Sparkles aria-hidden="true" />
      <span>{children}</span>
    </span>
  )
}

/* --------------------------------------------------------------------------
   Subject icons
   -------------------------------------------------------------------------- */

const SUBJECT_ICONS = {
  math: Calculator,
  physics: Atom,
  chemistry: FlaskConical,
  biology: Dna,
  english: BookOpen,
  cs: Terminal,
}

export function SubjectIcon({ subjectId, size = 18 }) {
  const Icon = SUBJECT_ICONS[subjectId] || BookOpen
  return <Icon size={size} aria-hidden="true" />
}

export function SubjectTile({ subjectId, size = 42 }) {
  const tones = {
    math: 'tile-icon',
    physics: 'tile-icon tile-icon--navy',
    chemistry: 'tile-icon tile-icon--gold',
    biology: 'tile-icon',
    english: 'tile-icon tile-icon--navy',
    cs: 'tile-icon tile-icon--navy',
  }
  return (
    <span className={tones[subjectId] || 'tile-icon'} style={{ width: size, height: size }}>
      <SubjectIcon subjectId={subjectId} size={Math.round(size * 0.45)} />
    </span>
  )
}

/* --------------------------------------------------------------------------
   Misc
   -------------------------------------------------------------------------- */

export function Stat({ label, value, note, icon: Icon, tone = 'teal' }) {
  return (
    <div className="stat">
      <span className={`stat__icon stat__icon--${tone}`}>
        {Icon ? <Icon size={18} /> : null}
      </span>
      <div>
        <div className="stat__value">{value}</div>
        <div className="stat__label">{label}</div>
        {note ? <div className="stat__note">{note}</div> : null}
      </div>
    </div>
  )
}

export function EmptyState({ icon: Icon = Sparkles, title, children, action }) {
  return (
    <div className="empty">
      <span className="empty__icon">
        <Icon size={22} />
      </span>
      <h3>{title}</h3>
      {children ? <p>{children}</p> : null}
      {action}
    </div>
  )
}

export function Crumb({ to, children }) {
  return (
    <Link to={to} className="crumb">
      {children}
    </Link>
  )
}
