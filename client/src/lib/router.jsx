import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const RouterContext = createContext(null)

function readLocation() {
  return {
    pathname: window.location.pathname.replace(/\/+$/, '') || '/',
    search: window.location.search,
  }
}

export function RouterProvider({ children }) {
  const [location, setLocation] = useState(readLocation)

  useEffect(() => {
    const handlePop = () => setLocation(readLocation())
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = useCallback((to, options = {}) => {
    if (!to) return
    const next = String(to)
    if (next === window.location.pathname + window.location.search) return
    const method = options.replace ? 'replaceState' : 'pushState'
    window.history[method]({}, '', next)
    setLocation(readLocation())
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const value = useMemo(
    () => ({
      ...location,
      navigate,
      searchParams: new URLSearchParams(location.search),
    }),
    [location, navigate],
  )

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  )
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) throw new Error('useRouter must be used inside RouterProvider')
  return context
}

export function Link({
  to,
  children,
  className,
  onClick,
  replace,
  ...rest
}) {
  const { navigate } = useRouter()

  function handleClick(event) {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return
    }
    event.preventDefault()
    navigate(to, { replace })
  }

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
