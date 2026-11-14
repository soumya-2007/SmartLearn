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
  const { pathname, navigate } = useRouter()
  const { signedIn, signOut, savedTeachers, user } = useStore()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef(null)

  const displayName = user?.name || 'Aarav Mehta'
  const displayEmail = user?.email || 'aarav.mehta@example.com'
  const initials = user?.initials || 'AM'
  const firstName = displayName.split(' ')[0]
  const accountSubtitle =
    user?.role === 'teacher' ? 'Teacher account' : 'Class 10 · Level 7'

  function handleSignOut() {
    setAccountOpen(false)
    setSheetOpen(false)
    signOut()
    navigate('/')
  }

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
                      name={displayName}
                      initials={initials}
                      tint={['#DCEBE4', '#2C7264']}
                      size={30}
                    />
                    <span className="account__meta">
                      <strong>{firstName}</strong>
                      <span>{accountSubtitle}</span>
                    </span>
                  </button>
                  {accountOpen ? (
                    <div className="menu" role="menu">
                      <div className="menu__head">
                        <div className="row" style={{ gap: 10 }}>
                          <Avatar
                            name={displayName}
                            initials={initials}
                            tint={['#DCEBE4', '#2C7264']}
                            size={34}
                          />
                          <div className="account__meta">
                            <strong>{displayName}</strong>
                            <span className="menu__email">{displayEmail}</span>
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
                        onClick={handleSignOut}
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
                <Avatar name={displayName} initials={initials} size={22} />
                {firstName} · {savedTeachers.length} saved
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

