/**
 * Client-side authentication engine.
 *
 * Accounts, salted password hashes and sessions live in this browser's storage
 * so the demo has a real sign-up / sign-in / sign-out flow without a server.
 * Passwords are never stored in plain text. This is demo-grade auth: because
 * everything runs on the client, it cannot provide server-enforced security.
 */

const ACCOUNTS_KEY = 'smartlearn.accounts.v1'
const SESSION_KEY = 'smartlearn.session.v1'
const LONG_SESSION = 30 * 24 * 60 * 60 * 1000
const SHORT_SESSION = 12 * 60 * 60 * 1000
const PBKDF2_ITERATIONS = 150000

export const DEMO_ACCOUNT = {
  name: 'Aarav Mehta',
  email: 'aarav@smartlearn.app',
  password: 'LearnSmart123',
}

export const MIN_PASSWORD_LENGTH = 8

function encode(bytes) {
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

function decode(value) {
  const binary = atob(value)
  return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  return `usr_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

async function hashPassword(password, salt, iterations = PBKDF2_ITERATIONS) {
  if (!globalThis.crypto?.subtle) {
    throw new Error(
      'Sign-in needs a secure connection. Open the app over https or localhost.',
    )
  }
  const material = await globalThis.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await globalThis.crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    material,
    256,
  )
  return new Uint8Array(bits)
}

function equalBytes(a, b) {
  if (a.length !== b.length) return false
  let difference = 0
  for (let index = 0; index < a.length; index += 1) {
    difference |= a[index] ^ b[index]
  }
  return difference === 0
}

function readAccounts() {
  try {
    const stored = window.localStorage.getItem(ACCOUNTS_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveAccounts(accounts) {
  try {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
    return ''
  } catch {
    return 'This browser blocked local storage, so your account could not be saved.'
  }
}

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalizeEmail(email))
}

export function passwordIssue(password) {
  if (!password) return 'Choose a password.'
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Use at least ${MIN_PASSWORD_LENGTH} characters for your password.`
  }
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return 'Include at least one letter and one number.'
  }
  return ''
}

export function passwordStrength(password) {
  if (!password) return 0
  let score = 0
  if (password.length >= MIN_PASSWORD_LENGTH) score += 1
  if (password.length >= 12) score += 1
  if (/[A-Za-z]/.test(password) && /\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  return Math.max(1, Math.min(3, Math.ceil(score * 0.75)))
}

export function initialsFromName(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (!parts.length) return 'SL'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function publicUser(account) {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role || 'student',
    initials: initialsFromName(account.name),
    createdAt: account.createdAt,
  }
}

function readSession() {
  try {
    const stored =
      window.sessionStorage.getItem(SESSION_KEY) ||
      window.localStorage.getItem(SESSION_KEY)
    if (!stored) return null
    const session = JSON.parse(stored)
    if (
      !session?.userId ||
      !session?.expiresAt ||
      session.expiresAt <= Date.now()
    ) {
      clearSession()
      return null
    }
    return session
  } catch {
    return null
  }
}

function writeSession(userId, remember) {
  const payload = JSON.stringify({
    userId,
    expiresAt: Date.now() + (remember ? LONG_SESSION : SHORT_SESSION),
  })
  try {
    window.localStorage.removeItem(SESSION_KEY)
    window.sessionStorage.removeItem(SESSION_KEY)
    const storage = remember ? window.localStorage : window.sessionStorage
    storage.setItem(SESSION_KEY, payload)
  } catch {
    // The session still lives in memory for this page even if storage is blocked.
  }
}

export function clearSession() {
  try {
    window.localStorage.removeItem(SESSION_KEY)
    window.sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // Nothing else to clean up.
  }
}

/** Restores a valid session synchronously so a refresh keeps the user signed in. */
export function restoreSession() {
  const session = readSession()
  if (!session) return null
  const account = readAccounts().find((item) => item.id === session.userId)
  if (!account) {
    clearSession()
    return null
  }
  return publicUser(account)
}

export async function signUp({
  name,
  email,
  password,
  role = 'student',
  remember = true,
}) {
  const cleanName = String(name || '').trim().replace(/\s+/g, ' ')
  const cleanEmail = normalizeEmail(email)

  if (cleanName.length < 2) return { ok: false, error: 'Enter your full name.' }
  if (cleanName.length > 60) {
    return { ok: false, error: 'Keep your name to 60 characters or fewer.' }
  }
  if (!isValidEmail(cleanEmail)) {
    return { ok: false, error: 'Enter a valid email address.' }
  }
  const issue = passwordIssue(password)
  if (issue) return { ok: false, error: issue }

  const accounts = readAccounts()
  if (accounts.some((account) => account.email === cleanEmail)) {
    return {
      ok: false,
      error: 'An account with that email already exists. Log in instead.',
    }
  }

  try {
    const salt = globalThis.crypto.getRandomValues(new Uint8Array(16))
    const passwordHash = await hashPassword(password, salt)
    const account = {
      id: createId(),
      name: cleanName,
      email: cleanEmail,
      role,
      salt: encode(salt),
      passwordHash: encode(passwordHash),
      iterations: PBKDF2_ITERATIONS,
      createdAt: new Date().toISOString(),
    }
    const storageError = saveAccounts([...accounts, account])
    if (storageError) return { ok: false, error: storageError }
    writeSession(account.id, remember)
    return { ok: true, user: publicUser(account) }
  } catch (error) {
    return {
      ok: false,
      error: error?.message || 'Could not create your account. Please try again.',
    }
  }
}

export async function signIn({ email, password, remember = true }) {
  const cleanEmail = normalizeEmail(email)
  if (!isValidEmail(cleanEmail)) {
    return { ok: false, error: 'Enter a valid email address.' }
  }
  if (!password) return { ok: false, error: 'Enter your password.' }

  const account = readAccounts().find((item) => item.email === cleanEmail)
  if (!account) {
    return {
      ok: false,
      error: 'No account found for that email. Create a free account instead.',
    }
  }

  try {
    const salt = decode(account.salt)
    const attempt = await hashPassword(
      password,
      salt,
      account.iterations || PBKDF2_ITERATIONS,
    )
    if (!equalBytes(attempt, decode(account.passwordHash))) {
      return { ok: false, error: 'Incorrect password. Please try again.' }
    }
    writeSession(account.id, remember)
    return { ok: true, user: publicUser(account) }
  } catch (error) {
    return {
      ok: false,
      error: error?.message || 'Could not sign in. Please try again.',
    }
  }
}

export function signOut() {
  clearSession()
}

let demoAccountPromise = null

/** Seeds the demo student on first use. Safe to call repeatedly. */
export function ensureDemoAccount() {
  if (demoAccountPromise) return demoAccountPromise

  demoAccountPromise = (async () => {
    const accounts = readAccounts()
    if (accounts.some((account) => account.email === DEMO_ACCOUNT.email)) {
      return { ok: true }
    }
    const salt = globalThis.crypto.getRandomValues(new Uint8Array(16))
    const passwordHash = await hashPassword(DEMO_ACCOUNT.password, salt)
    const account = {
      id: createId(),
      name: DEMO_ACCOUNT.name,
      email: DEMO_ACCOUNT.email,
      role: 'student',
      salt: encode(salt),
      passwordHash: encode(passwordHash),
      iterations: PBKDF2_ITERATIONS,
      createdAt: new Date().toISOString(),
    }
    const storageError = saveAccounts([...accounts, account])
    if (storageError) return { ok: false, error: storageError }
    return { ok: true }
  })().catch((error) => {
    demoAccountPromise = null
    return {
      ok: false,
      error: error?.message || 'The demo account could not be prepared.',
    }
  })

  return demoAccountPromise
}
