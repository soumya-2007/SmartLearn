import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

const StoreContext = createContext(null)

export const DEFAULT_GOALS = [
  { id: 'g1', label: 'Revise factorisation rules', minutes: 15, done: true },
  { id: 'g2', label: 'Finish the quadratic quiz', minutes: 20, done: true },
  { id: 'g3', label: 'Watch: word problems walkthrough', minutes: 10, done: true },
  { id: 'g4', label: '10 practice questions on roots', minutes: 15, done: false },
]

export function StoreProvider({ children }) {
  const [signedIn, setSignedIn] = useState(false)
  const [savedTeachers, setSavedTeachers] = useState(['meera-nair'])
  const [completedModules, setCompletedModules] = useState(['m1', 'm2'])
  const [assessment, setAssessment] = useState(null)
  const [goals, setGoals] = useState(DEFAULT_GOALS)
  const [toasts, setToasts] = useState([])
  const [prefs, setPrefs] = useState({
    language: 'English',
    level: 'Intermediate',
    dailyGoal: 60,
    learningStyle: 'Visual + practice',
    examBoard: 'CBSE',
    reminders: true,
    weeklyDigest: true,
  })

  const notify = useCallback((message, tone = 'default') => {
    const id = Math.random().toString(36).slice(2, 9)
    setToasts((current) => [...current, { id, message, tone }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3800)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const signIn = useCallback(
    (name) => {
      setSignedIn(true)
      notify(`Welcome${name ? `, ${name.split(' ')[0]}` : ' back'} — your plan is ready.`, 'success')
    },
    [notify],
  )

  const signOut = useCallback(() => {
    setSignedIn(false)
    notify('You have been signed out of this demo.')
  }, [notify])

  const toggleSavedTeacher = useCallback(
    (id) => {
      setSavedTeachers((current) => {
        const exists = current.includes(id)
        notify(exists ? 'Removed from your shortlist.' : 'Saved to your teacher shortlist.', 'success')
        return exists ? current.filter((item) => item !== id) : [...current, id]
      })
    },
    [notify],
  )

  const toggleModule = useCallback(
    (id) => {
      setCompletedModules((current) => {
        const exists = current.includes(id)
        notify(exists ? 'Module marked as not started.' : 'Module complete — progress updated.', 'success')
        return exists ? current.filter((item) => item !== id) : [...current, id]
      })
    },
    [notify],
  )

  const toggleGoal = useCallback((id) => {
    setGoals((current) =>
      current.map((goal) =>
        goal.id === id ? { ...goal, done: !goal.done } : goal,
      ),
    )
  }, [])

  const addGoal = useCallback(
    (label) => {
      if (!label.trim()) return
      setGoals((current) => [
        ...current,
        {
          id: `g${Date.now()}`,
          label: label.trim(),
          minutes: 15,
          done: false,
        },
      ])
      notify('Added to today’s plan.', 'success')
    },
    [notify],
  )

  const saveAssessment = useCallback(
    (result) => {
      setAssessment(result)
      notify('Assessment saved — your roadmap has been updated.', 'success')
    },
    [notify],
  )

  const updatePrefs = useCallback(
    (patch) => setPrefs((current) => ({ ...current, ...patch })),
    [],
  )

  const value = useMemo(
    () => ({
      signedIn,
      signIn,
      signOut,
      savedTeachers,
      toggleSavedTeacher,
      completedModules,
      toggleModule,
      assessment,
      saveAssessment,
      goals,
      toggleGoal,
      addGoal,
      prefs,
      updatePrefs,
      toasts,
      notify,
      dismissToast,
    }),
    [
      signedIn,
      signIn,
      signOut,
      savedTeachers,
      toggleSavedTeacher,
      completedModules,
      toggleModule,
      assessment,
      saveAssessment,
      goals,
      toggleGoal,
      addGoal,
      prefs,
      updatePrefs,
      toasts,
      notify,
      dismissToast,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside StoreProvider')
  return context
}
