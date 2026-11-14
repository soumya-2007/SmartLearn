import { useEffect, useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Users,
  X,
} from 'lucide-react'
import { DEMO_ACCOUNT, passwordStrength } from '../lib/auth'
import { useStore } from '../lib/store'
import { Logo } from './ui'

const STRENGTH_LABELS = ['', 'Weak password', 'Fair password', 'Strong password']

export default function AuthModal({ open, initialMode = 'login', onClose }) {
  const { signIn, signUp, signInDemo } = useStore()
  const [mode, setMode] = useState(initialMode)
  const [role, setRole] = useState('student')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [remember, setRemember] = useState(true)
  const [reveal, setReveal] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

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

  const isSignup = mode === 'signup'
  const strength = passwordStrength(form.password)

  function switchMode(next) {
    setMode(next)
    setError('')
    setReveal(false)
  }

  async function run(action) {
    setBusy(true)
    setError('')
    const result = await action()
    if (!result?.ok) {
      setError(result?.error || 'Something went wrong. Please try again.')
      setBusy(false)
      return
    }
    setBusy(false)
    onClose()
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (isSignup) {
      if (!form.name.trim()) {
        setError('Enter your full name.')
        return
      }
      if (!form.email.trim()) {
        setError('Enter your email address.')
        return
      }
      if (form.password !== form.confirm) {
        setError('Your passwords do not match yet.')
        return
      }
      run(() =>
        signUp({
          name: form.name,
          email: form.email,
          password: form.password,
          role,
          remember,
        }),
      )
      return
    }
    run(() =>
      signIn({ email: form.email, password: form.password, remember }),
    )
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
          {isSignup ? 'Start learning smarter' : 'Welcome back'}
        </h2>
        <p className="modal__lead">
          {isSignup
            ? 'Create a free account and get a personalised study plan in minutes.'
            : 'Pick up your learning path exactly where you left it.'}
        </p>

        <div className="auth-tabs" role="tablist" aria-label="Authentication">
          <button
            type="button"
            role="tab"
            aria-selected={!isSignup}
            className={!isSignup ? 'is-active' : ''}
            onClick={() => switchMode('login')}
          >
            Log in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isSignup}
            className={isSignup ? 'is-active' : ''}
            onClick={() => switchMode('signup')}
          >
            Sign up
          </button>
        </div>

        {isSignup ? (
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
        ) : null}

        <form className="stack auth-form" style={{ gap: 12 }} onSubmit={handleSubmit} noValidate>
          {isSignup ? (
            <label className="field">
              <span className="field-label">Full name</span>
              <input
                className="input"
                placeholder="Aarav Mehta"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                autoComplete="name"
                autoFocus
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
              autoFocus={!isSignup}
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <span className="input-affix">
              <input
                className="input"
                type={reveal ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                autoComplete={isSignup ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                className="input-affix__btn"
                onClick={() => setReveal((visible) => !visible)}
                aria-label={reveal ? 'Hide password' : 'Show password'}
                aria-pressed={reveal}
              >
                {reveal ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </span>
            {isSignup ? (
              <>
                <span className="auth-strength" aria-hidden="true">
                  {[0, 1, 2].map((step) => (
                    <span
                      key={step}
                      className={
                        strength > step
                          ? `is-on strength-${strength}`
                          : undefined
                      }
                    />
                  ))}
                </span>
                <span className="field-hint">
                  {form.password
                    ? STRENGTH_LABELS[strength]
                    : 'Use 8+ characters with at least one letter and one number.'}
                </span>
              </>
            ) : null}
          </label>

          {isSignup ? (
            <label className="field">
              <span className="field-label">Confirm password</span>
              <input
                className="input"
                type={reveal ? 'text' : 'password'}
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={(event) => setForm({ ...form, confirm: event.target.value })}
                autoComplete="new-password"
              />
            </label>
          ) : null}

          <label className="check">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            <span>Keep me signed in for 30 days</span>
          </label>

          {error ? (
            <div className="auth-alert" role="alert">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          ) : null}

          <button
            type="submit"
            className="btn btn--primary btn--block btn--lg"
            disabled={busy}
            style={{ marginTop: 2 }}
          >
            {busy ? (
              <>
                <span className="spinner" aria-hidden="true" />
                {isSignup ? 'Creating account…' : 'Signing in…'}
              </>
            ) : (
              <>
                {isSignup ? 'Create my free account' : 'Log in to SmartLearn'}
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        <div className="auth-sep">or try it instantly</div>
        <div className="auth-demo">
          <p>
            <strong>Demo account</strong> — sign in as Aarav with{' '}
            <code>{DEMO_ACCOUNT.email}</code> and{' '}
            <code>{DEMO_ACCOUNT.password}</code>.
          </p>
          <button
            type="button"
            className="btn btn--secondary btn--sm btn--block"
            onClick={() => run(() => signInDemo())}
            disabled={busy}
          >
            Use demo account
          </button>
        </div>

        <p className="auth-foot">
          {isSignup ? 'Already learning with us? ' : 'New to SmartLearn? '}
          <button
            type="button"
            className="link-button"
            onClick={() => switchMode(isSignup ? 'login' : 'signup')}
          >
            {isSignup ? 'Log in instead' : 'Create an account'}
          </button>
          <br />
          This demo keeps accounts and sessions on this device. No card required.
        </p>
      </div>
    </div>
  )
}
