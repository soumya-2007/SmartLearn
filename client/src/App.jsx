import { useEffect, useState } from 'react'
import { Compass, LockKeyhole, ShieldCheck } from 'lucide-react'
import { RouterProvider, useRouter } from './lib/router'
import { StoreProvider, useStore } from './lib/store'
import { Footer, Header, Tabbar, Toaster } from './components/chrome'
import AuthModal from './components/AuthModal'
import { EmptyState } from './components/ui'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Discover from './pages/Discover'
import Teachers from './pages/Teachers'
import TeacherProfile from './pages/TeacherProfile'
import Workspace from './pages/Workspace'
import Assessment from './pages/Assessment'
import Progress from './pages/Progress'
import Profile from './pages/Profile'
import './styles/pages.css'
import './styles/auth.css'

const PROTECTED_ROUTES = new Set([
  '/dashboard',
  '/learning',
  '/progress',
  '/profile',
])

function NotFound() {
  return (
    <div className="container page">
      <EmptyState
        icon={Compass}
        title="This page has wandered off"
        action={
          <a className="btn btn--primary" href="/">
            Back to home
          </a>
        }
      >
        The link you followed does not exist. Try discovering a topic instead.
      </EmptyState>
    </div>
  )
}

function AuthWall({ onOpenAuth }) {
  return (
    <div className="container">
      <section className="auth-wall">
        <div className="card auth-wall__card">
          <span className="auth-wall__icon">
            <LockKeyhole size={24} />
          </span>
          <span className="eyebrow">Your private learning space</span>
          <h1>Sign in to continue your journey.</h1>
          <p>
            Your dashboard, learning workspace, progress and profile are tied to
            your account. Log in to pick up where you left off, or create a free
            account in under a minute.
          </p>
          <div className="auth-wall__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => onOpenAuth('login')}
            >
              Log in
            </button>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => onOpenAuth('signup')}
            >
              Create free account
            </button>
          </div>
          <p className="auth-wall__note">
            <ShieldCheck size={13} /> Accounts and sessions are stored on this
            device for the demo.
          </p>
        </div>
      </section>
    </div>
  )
}

function Shell() {
  const { pathname } = useRouter()
  const { signedIn } = useStore()
  const [auth, setAuth] = useState({ open: false, mode: 'login' })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  const openAuth = (mode = 'login') => setAuth({ open: true, mode })
  const closeAuth = () => setAuth((current) => ({ ...current, open: false }))

  let page
  if (pathname === '/') page = <Landing onOpenAuth={openAuth} />
  else if (pathname === '/dashboard') page = <Dashboard />
  else if (pathname === '/discover') page = <Discover />
  else if (pathname === '/teachers') page = <Teachers />
  else if (pathname.startsWith('/teachers/')) {
    page = <TeacherProfile id={pathname.replace('/teachers/', '')} />
  } else if (pathname === '/learning') page = <Workspace />
  else if (pathname === '/assessment') page = <Assessment />
  else if (pathname === '/progress') page = <Progress />
  else if (pathname === '/profile') page = <Profile />
  else page = <NotFound />

  if (!signedIn && PROTECTED_ROUTES.has(pathname)) {
    page = <AuthWall onOpenAuth={openAuth} />
  }

  const appLike = pathname === '/learning'

  return (
    <>
      <Header key={pathname} onOpenAuth={openAuth} />
      <main id="main">{page}</main>
      {appLike ? null : <Footer />}
      <Tabbar />
      <Toaster />
      <AuthModal
        key={`${auth.open}-${auth.mode}`}
        open={auth.open}
        initialMode={auth.mode}
        onClose={closeAuth}
      />
    </>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <StoreProvider>
        <Shell />
      </StoreProvider>
    </RouterProvider>
  )
}
