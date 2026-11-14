import { useState } from 'react'
import {
  ArrowRight,
  Bell,
  Check,
  Flame,
  GraduationCap,
  LogOut,
  Mail,
  MapPin,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { Link } from '../lib/router'
import { useStore } from '../lib/store'
import { languageOptions, student, teachersById } from '../data/content'
import { TeacherMini } from '../components/TeacherCard'
import { Badge, Bar, EmptyState, ProgressRing } from '../components/ui'
import { Avatar } from '../components/ui'

const LEARNING_STYLES = [
  'Visual + practice',
  'Step-by-step worked examples',
  'Conversation & discussion',
  'Exam drills & timed sets',
]

const DAILY_GOALS = [30, 45, 60, 90]
const BOARDS = ['CBSE', 'ICSE', 'State board', 'IB']

export default function Profile() {
  const {
    user,
    prefs,
    updatePrefs,
    savedTeachers,
    signOut,
    notify,
  } = useStore()
  const [draft, setDraft] = useState(prefs)

  const saved = savedTeachers.map((id) => teachersById[id]).filter(Boolean)
  const displayName = user?.name || student.name
  const displayInitials = user?.initials || student.initials
  const displayEmail = user?.email || student.email
  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', {
        month: 'long',
        year: 'numeric',
      })
    : student.joined

  function save(event) {
    event.preventDefault()
    updatePrefs(draft)
    notify('Preferences saved — your search matches have been re-ranked.', 'success')
  }

  return (
    <div className="container page prof">
      <header className="page-head">
        <div>
          <span className="eyebrow">Profile & preferences</span>
          <h1 className="page-title">Your learning profile.</h1>
          <p>
            The more accurate this is, the better the topic matches, teacher
            recommendations and AI explanations become.
          </p>
        </div>
        <div className="row wrap">
          <Link to="/progress" className="btn btn--secondary btn--sm">
            View analytics <ArrowRight size={14} />
          </Link>
          <button type="button" className="btn btn--ghost btn--sm" onClick={signOut}>
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </header>

      <div className="split">
        <div className="stack" style={{ gap: 22 }}>
          <section className="card prof-identity">
            <div className="prof-identity__main">
              <Avatar
                name={displayName}
                initials={displayInitials}
                tint={['#DCEBE4', '#2C7264']}
                size={78}
                online
              />
              <div className="grow">
                <div className="row wrap" style={{ gap: 8 }}>
                  <h2>{displayName}</h2>
                  <Badge variant="teal" icon={GraduationCap}>
                    {student.grade}
                  </Badge>
                  <Badge variant="gold">Level {student.level}</Badge>
                </div>
                <p className="small muted">
                  {student.levelName} · {student.board} · Joined {joined}
                </p>
                <div className="row wrap" style={{ gap: 16, marginTop: 10 }}>
                  <span className="tiny muted row" style={{ gap: 6 }}>
                    <Mail size={13} /> {displayEmail}
                  </span>
                  <span className="tiny muted row" style={{ gap: 6 }}>
                    <MapPin size={13} /> {student.city}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="btn btn--secondary btn--sm"
                onClick={() => notify('Profile editing is available in the full product. Preferences below are live.')}
              >
                Edit profile
              </button>
            </div>

            <div className="prof-identity__stats">
              <div>
                <Flame size={15} />
                <strong>{student.streak} days</strong>
                <span>current streak</span>
              </div>
              <div>
                <Target size={15} />
                <strong>{student.topicsCompleted} topics</strong>
                <span>completed</span>
              </div>
              <div>
                <Users size={15} />
                <strong>{saved.length || student.savedCount} saved</strong>
                <span>teachers</span>
              </div>
              <div>
                <Sparkles size={15} />
                <strong>{student.hours}h</strong>
                <span>learning time</span>
              </div>
            </div>
          </section>

          <form className="card card--pad" onSubmit={save}>
            <div className="card-head">
              <div>
                <h2 className="card-title">
                  <Target size={16} /> Learning preferences
                </h2>
                <p className="tiny muted" style={{ marginTop: 4 }}>
                  Used in topic search, teacher matching and every AI explanation.
                </p>
              </div>
              <Badge variant="sage">Saved automatically in this demo</Badge>
            </div>

            <div className="field-grid">
              <label className="field">
                <span className="field-label">Preferred language</span>
                <select
                  className="select"
                  value={draft.language}
                  onChange={(event) => setDraft({ ...draft, language: event.target.value })}
                >
                  {languageOptions.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span className="field-label">Comfortable difficulty</span>
                <select
                  className="select"
                  value={draft.level}
                  onChange={(event) => setDraft({ ...draft, level: event.target.value })}
                >
                  {['Foundation', 'Intermediate', 'Advanced'].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span className="field-label">How you learn best</span>
                <select
                  className="select"
                  value={draft.learningStyle}
                  onChange={(event) => setDraft({ ...draft, learningStyle: event.target.value })}
                >
                  {LEARNING_STYLES.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span className="field-label">Exam board</span>
                <select
                  className="select"
                  value={draft.examBoard}
                  onChange={(event) => setDraft({ ...draft, examBoard: event.target.value })}
                >
                  {BOARDS.map((board) => (
                    <option key={board} value={board}>
                      {board}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span className="field-label">Daily study goal</span>
                <select
                  className="select"
                  value={draft.dailyGoal}
                  onChange={(event) =>
                    setDraft({ ...draft, dailyGoal: Number(event.target.value) })
                  }
                >
                  {DAILY_GOALS.map((minutes) => (
                    <option key={minutes} value={minutes}>
                      {minutes} minutes
                    </option>
                  ))}
                </select>
              </label>

              <div className="field">
                <span className="field-label">Current class</span>
                <input className="input" value="Class 10" readOnly aria-readonly="true" />
              </div>
            </div>

            <div className="prof-toggles">
              <div className="prof-toggle-row">
                <span className="list-icon">
                  <Bell size={16} />
                </span>
                <div className="grow">
                  <strong className="small">Study reminders</strong>
                  <p className="tiny muted">A gentle nudge at your usual study time.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={draft.reminders}
                  aria-label="Study reminders"
                  className={`switch ${draft.reminders ? 'is-on' : ''}`}
                  onClick={() => setDraft({ ...draft, reminders: !draft.reminders })}
                >
                  <span />
                </button>
              </div>

              <div className="prof-toggle-row">
                <span className="list-icon list-icon--gold">
                  <Mail size={16} />
                </span>
                <div className="grow">
                  <strong className="small">Weekly progress digest</strong>
                  <p className="tiny muted">A Sunday summary with one clear next step.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={draft.weeklyDigest}
                  aria-label="Weekly progress digest"
                  className={`switch ${draft.weeklyDigest ? 'is-on' : ''}`}
                  onClick={() => setDraft({ ...draft, weeklyDigest: !draft.weeklyDigest })}
                >
                  <span />
                </button>
              </div>
            </div>

            <div className="row" style={{ marginTop: 20 }}>
              <button type="submit" className="btn btn--primary">
                <Check size={16} /> Save preferences
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setDraft(prefs)}
              >
                Reset changes
              </button>
            </div>
          </form>

          <section className="card card--pad">
            <div className="card-head">
              <div>
                <h2 className="card-title">
                  <Users size={16} /> Saved teachers
                </h2>
                <p className="tiny muted" style={{ marginTop: 4 }}>
                  Your shortlist is shared with the AI when it recommends a session.
                </p>
              </div>
              <Link to="/teachers" className="text-link">
                Find more <ArrowRight size={14} />
              </Link>
            </div>

            {saved.length ? (
              <div className="grid grid-2" style={{ gap: 14 }}>
                {saved.map((teacher) => (
                  <TeacherMini
                    key={teacher.id}
                    teacher={teacher}
                    note={`${teacher.style} · ${teacher.languages[0]}`}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="No saved teachers yet"
                action={
                  <Link to="/teachers" className="btn btn--primary btn--sm">
                    Explore teachers
                  </Link>
                }
              >
                Save a teacher from their profile or card and they will appear here.
              </EmptyState>
            )}
          </section>
        </div>

        <aside className="stack" style={{ gap: 22 }}>
          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <Target size={16} /> Learning level
              </h2>
              <Badge variant="gold">Level {student.level}</Badge>
            </div>
            <div className="prof-level">
              <ProgressRing
                value={89}
                size={104}
                stroke={9}
                color="var(--gold)"
                label={`${student.xp.toLocaleString()}`}
                sublabel="XP"
              />
              <div>
                <strong className="small">{student.levelName}</strong>
                <p className="tiny muted">
                  {student.nextLevelXp - student.xp} XP to Level {student.level + 1}
                </p>
                <Bar value={89} size="sm" tone="gold" />
              </div>
            </div>
            <p className="tiny muted" style={{ marginTop: 12 }}>
              Earned by finishing lessons, keeping streaks and improving quiz accuracy.
            </p>
          </section>

          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <Flame size={16} /> This week
              </h2>
            </div>
            <div className="prof-week">
              <div>
                <strong>45 min</strong>
                <span>of 60 min goal</span>
              </div>
              <ProgressRing value={75} size={64} stroke={6} label="75%" />
            </div>
            <div className="kv">
              <span>Longest streak</span>
              <strong>21 days</strong>
            </div>
            <div className="kv">
              <span>Study days this month</span>
              <strong>18 of 22</strong>
            </div>
            <div className="kv">
              <span>Next badge</span>
              <strong>14-day streak</strong>
            </div>
          </section>

          <section className="card card--pad">
            <h2 className="card-title">
              <Mail size={16} /> Account
            </h2>
            <div className="kv">
              <span>Email</span>
              <strong className="small">{displayEmail}</strong>
            </div>
            <div className="kv">
              <span>Account type</span>
              <strong>{user?.role === 'teacher' ? 'Teacher' : 'Student'}</strong>
            </div>
            <div className="kv">
              <span>Plan</span>
              <strong>Free demo</strong>
            </div>
            <div className="kv">
              <span>Member since</span>
              <strong>{joined}</strong>
            </div>
            <Link to="/assessment" className="btn btn--secondary btn--sm btn--block" style={{ marginTop: 14 }}>
              Retake diagnostic <ArrowRight size={14} />
            </Link>
          </section>

          <section className="card card--sage prof-note">
            <Sparkles size={17} />
            <div>
              <strong>Your profile shapes everything</strong>
              <p className="tiny">
                Switching your learning style from visual to exam drills immediately
                re-ranks teacher matches and changes how the AI explains worked
                examples.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
