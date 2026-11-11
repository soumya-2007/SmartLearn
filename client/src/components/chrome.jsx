import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Flame,
  GraduationCap,
  Home,
  Info,
  LayoutDashboard,
  LineChart,
  LogOut,
  Mail,
  Menu,
  Search,
  Settings,
  Sparkles,
  UserRound,
  Users,
  X,
} from 'lucide-react'
import { Link, useRouter } from '../lib/router'
import { useStore } from '../lib/store'
import { Avatar, Logo } from './ui'

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/teachers', label: 'Explore Teachers', icon: Users, match: '/teachers' },
  { to: '/discover', label: 'Discover Topics', icon: Compass },
  {
    to: '/dashboard',
    label: 'My Learning',
    icon: LayoutDashboard,
    extraMatch: ['/learning'],
  },
  { to: '/progress', label: 'Progress', icon: LineChart },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

const TAB_ITEMS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/teachers', label: 'Teachers', icon: Users },
  { to: '/dashboard', label: 'Learning', icon: LayoutDashboard, extraMatch: ['/learning'] },
  { to: '/progress', label: 'Progress', icon: LineChart },
]

function isActive(pathname, item) {
  if (item.to === '/') return pathname === '/'
  if (item.match && pathname.startsWith(item.match)) return true
  if (pathname === item.to) return true
  return (item.extraMatch || []).some((path) => pathname.startsWith(path))
}

/* --------------------------------------------------------------------------
   Header
   -------------------------------------------------------------------------- */

export function Header({ onOpenAuth }) {
  const { pathname } = useRouter()
  const { signedIn, signOut, savedTeachers } = useStore()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef(null)

  useEffect(() => {
    function onPointerDown(event) {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  return (
    <header className="site-header">
      <div className="container">
        <div className="nav">
          <Link to="/" aria-label="SmartLearn home">
            <Logo />
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link ${isActive(pathname, item) ? 'is-active' : ''}`}
                aria-current={isActive(pathname, item) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link
              to="/discover"
              className="btn btn--icon header-search"
              aria-label="Search topics"
              title="Search topics"
            >
              <Search size={17} />
            </Link>
            {signedIn ? (
              <>
                <span className="streak-pill">
                  <Flame size={14} />
                  12-day streak
                </span>
                <div className="account" ref={accountRef}>
                  <button
                    type="button"
                    className="account__trigger"
                    onClick={() => setAccountOpen((open) => !open)}
                    aria-expanded={accountOpen}
                    aria-haspopup="menu"
                  >
                    <Avatar
                      name="Aarav Mehta"
                      initials="AM"
                      tint={['#DCEBE4', '#2C7264']}
                      size={30}
                    />
                    <span className="account__meta">
                      <strong>Aarav</strong>
                      <span>Class 10 · Level 7</span>
                    </span>
                  </button>
                  {accountOpen ? (
                    <div className="menu" role="menu">
                      <div className="menu__head">
                        <div className="row" style={{ gap: 10 }}>
                          <Avatar
                            name="Aarav Mehta"
                            initials="AM"
                            tint={['#DCEBE4', '#2C7264']}
                            size={34}
                          />
                          <div className="account__meta">
                            <strong>Aarav Mehta</strong>
                            <span>aarav.mehta@example.com</span>
                          </div>
                        </div>
                      </div>
                      <Link to="/dashboard" className="menu__item" role="menuitem">
                        <LayoutDashboard /> Dashboard
                      </Link>
                      <Link to="/learning" className="menu__item" role="menuitem">
                        <BookOpen /> My learning
                      </Link>
                      <Link to="/profile" className="menu__item" role="menuitem">
                        <UserRound /> Profile
                      </Link>
                      <Link to="/profile" className="menu__item" role="menuitem">
                        <Settings /> Preferences
                      </Link>
                      <hr className="divider" style={{ margin: '6px 0' }} />
                      <button
                        type="button"
                        className="menu__item"
                        onClick={signOut}
                        role="menuitem"
                      >
                        <LogOut /> Sign out
                      </button>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => onOpenAuth('login')}
                >
                  Log in
                </button>
                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  onClick={() => onOpenAuth('signup')}
                >
                  Get started
                </button>
              </>
            )}
            <button
              type="button"
              className="nav-toggle"
              aria-label={sheetOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={sheetOpen}
              onClick={() => setSheetOpen((open) => !open)}
            >
              {sheetOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-sheet ${sheetOpen ? 'is-open' : ''}`}>
        <div className="container">
          <div className="mobile-sheet__links">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={isActive(pathname, item) ? 'is-active' : ''}
                  onClick={() => setSheetOpen(false)}
                >
                  <Icon />
                  {item.label}
                </Link>
              )
            })}
          </div>
          <div className="mobile-sheet__links" style={{ marginTop: 8 }}>
            <Link to="/assessment" onClick={() => setSheetOpen(false)}>
              <Sparkles /> AI learning assessment
            </Link>
          </div>
          {!signedIn ? (
            <div className="mobile-sheet__cta">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => {
                  setSheetOpen(false)
                  onOpenAuth('login')
                }}
              >
                Log in
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  setSheetOpen(false)
                  onOpenAuth('signup')
                }}
              >
                Get started
              </button>
            </div>
          ) : (
            <div className="mobile-sheet__cta">
              <Link to="/profile" className="btn btn--secondary" onClick={() => setSheetOpen(false)}>
                <Avatar name="Aarav Mehta" initials="AM" size={22} />
                Aarav · {savedTeachers.length} saved
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

/* --------------------------------------------------------------------------
   Mobile tab bar
   -------------------------------------------------------------------------- */

export function Tabbar() {
  const { pathname } = useRouter()
  return (
    <nav className="tabbar" aria-label="Mobile">
      {TAB_ITEMS.map((item) => {
        const Icon = item.icon
        const active = isActive(pathname, item)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={active ? 'is-active' : ''}
            aria-current={active ? 'page' : undefined}
          >
            <Icon />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

/* --------------------------------------------------------------------------
   Footer
   -------------------------------------------------------------------------- */

export function Footer() {
  const { notify } = useStore()
  const [email, setEmail] = useState('')

  function subscribe(event) {
    event.preventDefault()
    if (!email.trim()) {
      notify('Add your email to receive the weekly plan.')
      return
    }
    notify('You’re on the list — the first study plan arrives Monday.', 'success')
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p>
              AI-powered learning that finds the right teacher, the right resource
              and the right next step for every student.
            </p>
            <form className="footer__subscribe" onSubmit={subscribe}>
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="input-icon">
                <Mail size={16} />
                <input
                  id="footer-email"
                  className="input"
                  type="email"
                  placeholder="Weekly study plan"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn--primary btn--sm" aria-label="Subscribe">
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          <div className="footer__col">
            <h4>Platform</h4>
            <ul>
              <li>
                <Link to="/discover">Discover topics</Link>
              </li>
              <li>
                <Link to="/teachers">Explore teachers</Link>
              </li>
              <li>
                <Link to="/learning">Learning workspace</Link>
              </li>
              <li>
                <Link to="/assessment">AI assessment</Link>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>For students</h4>
            <ul>
              <li>
                <Link to="/dashboard">My learning</Link>
              </li>
              <li>
                <Link to="/progress">Progress & analytics</Link>
              </li>
              <li>
                <Link to="/profile">Learning preferences</Link>
              </li>
              <li>
                <Link to="/teachers">Teacher shortlist</Link>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Get in touch</h4>
            <ul>
              <li>
                <a href="mailto:hello@smartlearn.example">hello@smartlearn.example</a>
              </li>
              <li>
                <a href="mailto:support@smartlearn.example">Help & support</a>
              </li>
              <li>
                <Link to="/assessment">Book a diagnostic</Link>
              </li>
            </ul>
            <div className="footer__trust">
              <GraduationCap size={16} />
              Trusted by 12,000+ learners
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} SmartLearn. Built for curious minds.</span>
          <div className="footer__bottom-links">
            <a href="mailto:hello@smartlearn.example">Privacy</a>
            <a href="mailto:hello@smartlearn.example">Terms</a>
            <Link to="/discover">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* --------------------------------------------------------------------------
   Toasts
   -------------------------------------------------------------------------- */

export function Toaster() {
  const { toasts, dismissToast } = useStore()
  if (!toasts.length) return null

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.tone === 'success' ? 'toast--success' : ''}`}
        >
          {toast.tone === 'success' ? (
            <CheckCircle2 size={17} />
          ) : (
            <Info size={17} />
          )}
          <span>{toast.message}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => dismissToast(toast.id)}
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  )
}

/* --------------------------------------------------------------------------
   Auth modal
   -------------------------------------------------------------------------- */

export function AuthModal({ open, initialMode = 'login', onClose }) {
  const { signIn, notify } = useStore()
  const [mode, setMode] = useState(initialMode)
  const [role, setRole] = useState('student')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  if (!open) return null

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.email.trim() || form.password.length < 4) {
      notify('Enter an email and a password of at least 4 characters.')
      return
    }
    signIn(mode === 'signup' ? form.name || 'Aarav' : 'Aarav')
    onClose()
  }

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <Logo />
        <h2 id="auth-title">
          {mode === 'login' ? 'Welcome back' : 'Start learning smarter'}
        </h2>
        <p className="modal__lead">
          {mode === 'login'
            ? 'Pick up your learning path exactly where you left it.'
            : 'Create a free account and get a personalised study plan in minutes.'}
        </p>

        <div className="auth-tabs" role="tablist" aria-label="Authentication">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'login'}
            className={mode === 'login' ? 'is-active' : ''}
            onClick={() => setMode('login')}
          >
            Log in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'signup'}
            className={mode === 'signup' ? 'is-active' : ''}
            onClick={() => setMode('signup')}
          >
            Sign up
          </button>
        </div>

        <div className="auth-roles" role="group" aria-label="I am a">
          <button
            type="button"
            className={role === 'student' ? 'is-active' : ''}
            onClick={() => setRole('student')}
          >
            <GraduationCap size={15} /> Student
          </button>
          <button
            type="button"
            className={role === 'teacher' ? 'is-active' : ''}
            onClick={() => setRole('teacher')}
          >
            <Users size={15} /> Teacher
          </button>
        </div>

        <form className="stack" style={{ gap: 12 }} onSubmit={handleSubmit}>
          {mode === 'signup' ? (
            <label className="field">
              <span className="field-label">Full name</span>
              <input
                className="input"
                placeholder="Aarav Mehta"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                autoComplete="name"
              />
            </label>
          ) : null}
          <label className="field">
            <span className="field-label">Email address</span>
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              autoComplete="email"
              autoFocus
            />
          </label>
          <label className="field">
            <span className="field-label">Password</span>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </label>
          <button type="submit" className="btn btn--primary btn--block btn--lg" style={{ marginTop: 4 }}>
            {mode === 'login' ? 'Log in to SmartLearn' : 'Create my free account'}
            <ArrowRight size={17} />
          </button>
        </form>

        <div className="auth-sep">or continue with</div>
        <button
          type="button"
          className="btn btn--secondary btn--block"
          onClick={() => {
            signIn('Aarav')
            onClose()
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.7l4-3Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A11.6 11.6 0 0 0 12 0 12 12 0 0 0 1.4 6.7l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="auth-foot">
          {mode === 'login' ? 'New to SmartLearn? ' : 'Already learning with us? '}
          <button
            type="button"
            className="link-button"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Create an account' : 'Log in instead'}
          </button>
          <br />
          By continuing you agree to our friendly demo terms. No card required.
        </p>
      </div>
    </div>
  )
}
