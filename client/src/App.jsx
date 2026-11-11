import { useEffect, useState } from 'react'
import { Compass } from 'lucide-react'
import { RouterProvider, useRouter } from './lib/router'
import { StoreProvider } from './lib/store'
import { AuthModal, Footer, Header, Tabbar, Toaster } from './components/chrome'
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

function Shell() {
  const { pathname } = useRouter()
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
  else if (pathname === '/profile') page = <Profile onOpenAuth={openAuth} />
  else page = <NotFound />

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
