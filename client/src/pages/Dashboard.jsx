import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock,
  FileText,
  Flame,
  ListChecks,
  Play,
  Sparkles,
  Target,
  TrendingUp,
  Video,
} from 'lucide-react'
import { Link } from '../lib/router'
import { useStore } from '../lib/store'
import {
  lastWeekActivity,
  recentMaterials,
  streakDays,
  strongTopics,
  topicsById,
  weakTopics,
  weeklyActivity,
} from '../data/content'
import { TeacherMini } from '../components/TeacherCard'
import { LineChart, Sparkline } from '../components/charts'
import { Avatar, Bar, ProgressRing, SubjectTile } from '../components/ui'
import { teachersById } from '../data/content'

const materialIcons = {
  file: FileText,
  play: Video,
  quiz: ListChecks,
}

export default function Dashboard() {
  const { goals, toggleGoal, prefs, notify, user } = useStore()
  const [week, setWeek] = useState('this')
  const displayName = user?.name || 'Aarav Mehta'
  const displayInitials = user?.initials || 'AM'
  const firstName = displayName.split(' ')[0]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const completedMinutes = goals
    .filter((goal) => goal.done)
    .reduce((total, goal) => total + goal.minutes, 0)
  const goalPercent = Math.min(
    100,
    Math.round((completedMinutes / prefs.dailyGoal) * 100),
  )
  const remainingGoals = goals.filter((goal) => !goal.done).length

  const chartData = week === 'this' ? weeklyActivity : lastWeekActivity
  const avgMinutes = Math.round(
    chartData.reduce((total, day) => total + day.value, 0) / chartData.length,
  )

  const enrolled = [topicsById['quadratic-equations'], topicsById['chemical-bonding']]

  return (
    <div className="container page dash">
      <header className="dash-head">
        <div className="row" style={{ gap: 16 }}>
          <Avatar
            name={displayName}
            initials={displayInitials}
            tint={['#DCEBE4', '#2C7264']}
            size={56}
            online
          />
          <div>
            <span className="eyebrow">Class 10 · CBSE · Level 7</span>
            <h1 className="page-title">{greeting}, {firstName}.</h1>
            <p className="muted small">
              {remainingGoals
                ? `${remainingGoals} small step${remainingGoals > 1 ? 's' : ''} left in today’s plan — ${
                    60 - completedMinutes > 0 ? 60 - completedMinutes : 0
                  } minutes of focus.`
                : 'Today’s plan is complete. Anything extra is a bonus.'}
            </p>
          </div>
        </div>
        <div className="row wrap">
          <span className="streak-pill">
            <Flame size={14} /> 12-day streak
          </span>
          <Link to="/learning" className="btn btn--primary">
            <Play size={16} /> Resume learning
          </Link>
        </div>
      </header>

      {/* Top metrics -------------------------------------------------- */}
      <section className="dash-metrics">
        <article className="metric-card card">
          <div className="between">
            <span className="metric-card__label">Learning level</span>
            <span className="tile-icon tile-icon--gold">
              <Target size={17} />
            </span>
          </div>
          <div className="metric-card__value">
            Level 7 <span className="metric-card__sub">Diligent Learner</span>
          </div>
          <Bar value={89} tone="gold" size="sm" />
          <p className="tiny muted">2,840 / 3,200 XP to Level 8</p>
        </article>

        <article className="metric-card card">
          <div className="between">
            <span className="metric-card__label">Overall progress</span>
            <span className="badge badge--teal">
              <TrendingUp size={12} /> +8%
            </span>
          </div>
          <div className="row" style={{ gap: 14 }}>
            <ProgressRing value={68} size={58} stroke={6} label="68%" />
            <div>
              <div className="metric-card__value metric-card__value--sm">On track</div>
              <p className="tiny muted">Across 3 active courses</p>
            </div>
          </div>
          <Bar value={68} size="sm" />
        </article>

        <article className="metric-card card">
          <div className="between">
            <span className="metric-card__label">Learning hours</span>
            <Sparkline data={[18, 22, 21, 27, 30, 32, 34.5]} />
          </div>
          <div className="metric-card__value">
            34.5<span className="metric-card__unit">h</span>
          </div>
          <p className="tiny muted">3h 42m this week · 74% of goal</p>
        </article>

        <article className="metric-card card">
          <div className="between">
            <span className="metric-card__label">Quiz average</span>
            <span className="tile-icon">
              <ListChecks size={17} />
            </span>
          </div>
          <div className="metric-card__value">78%</div>
          <p className="tiny muted">+17% in the last four weeks</p>
          <Bar value={78} size="sm" />
        </article>
      </section>

      <div className="split" style={{ marginTop: 24 }}>
        <div className="stack" style={{ gap: 24 }}>
          {/* Continue learning ---------------------------------------- */}
          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <Play size={16} /> Continue where you left off
              </h2>
              <Link to="/learning" className="text-link">
                My learning <ArrowRight size={14} />
              </Link>
            </div>

            <div className="continue-list">
              {enrolled.map((topic, index) => {
                const progress = index === 0 ? 68 : 35
                const teacher = teachersById[topic.teacherIds[0]]
                return (
                  <article className="continue-card" key={topic.id}>
                    <SubjectTile subjectId={topic.subjectId} size={46} />
                    <div className="grow">
                      <div className="between" style={{ gap: 10 }}>
                        <h3>{topic.name}</h3>
                        <span className="tiny muted">
                          {index === 0 ? 'Lesson 4 of 6' : 'Module 2 of 5'}
                        </span>
                      </div>
                      <p className="tiny muted">
                        {topic.subjectId === 'math' ? 'Mathematics' : 'Chemistry'} ·{' '}
                        {teacher.name}
                      </p>
                      <div className="row" style={{ gap: 10, marginTop: 8 }}>
                        <Bar value={progress} size="sm" tone={index === 0 ? 'teal' : 'gold'} />
                        <span className="tiny strong">{progress}%</span>
                      </div>
                    </div>
                    <Link
                      to="/learning"
                      className="btn btn--icon"
                      aria-label={`Resume ${topic.name}`}
                      title="Resume lesson"
                    >
                      <ArrowRight size={17} />
                    </Link>
                  </article>
                )
              })}
            </div>

            <div className="continue-foot">
              <span className="tiny muted">
                <Clock size={13} /> Next up: the quadratic formula · 12 min left
              </span>
              <Link to="/assessment" className="text-link">
                Re-run diagnostic <ArrowUpRight size={13} />
              </Link>
            </div>
          </section>

          {/* Weekly chart --------------------------------------------- */}
          <section className="card card--pad">
            <div className="card-head">
              <div>
                <h2 className="card-title">
                  <CalendarDays size={16} /> Learning activity
                </h2>
                <p className="tiny muted" style={{ marginTop: 4 }}>
                  Minutes studied per day
                </p>
              </div>
              <div className="segmented">
                <button
                  type="button"
                  className={week === 'this' ? 'is-active' : ''}
                  onClick={() => setWeek('this')}
                >
                  This week
                </button>
                <button
                  type="button"
                  className={week === 'last' ? 'is-active' : ''}
                  onClick={() => setWeek('last')}
                >
                  Last week
                </button>
              </div>
            </div>
            <LineChart
              data={chartData}
              compare={week === 'this' ? lastWeekActivity : weeklyActivity}
              height={180}
            />
            <div className="chart-summary">
              <div>
                <strong>{avgMinutes} min</strong>
                <span>Daily average</span>
              </div>
              <div>
                <strong>{week === 'this' ? '5h 42m' : '4h 26m'}</strong>
                <span>Total this week</span>
              </div>
              <div>
                <strong className="text-teal">{week === 'this' ? '+18%' : 'Baseline'}</strong>
                <span>vs previous week</span>
              </div>
            </div>
          </section>

          {/* Weak topics --------------------------------------------- */}
          <section className="card card--pad">
            <div className="card-head">
              <div>
                <h2 className="card-title">
                  <Target size={16} /> Topics that need attention
                </h2>
                <p className="tiny muted" style={{ marginTop: 4 }}>
                  Ranked by mastery, not by how recently you studied them.
                </p>
              </div>
              <Link to="/assessment" className="text-link">
                Diagnose gaps <ArrowRight size={14} />
              </Link>
            </div>

            <div className="weak-list">
              {weakTopics.slice(0, 3).map((topic) => (
                <div className="weak-item" key={topic.id}>
                  <div className="weak-item__main">
                    <div className="between">
                      <strong>{topic.name}</strong>
                      <span className="tiny muted">{topic.lastPracticed}</span>
                    </div>
                    <p className="tiny muted">{topic.subject}</p>
                    <div className="row" style={{ gap: 10, marginTop: 7 }}>
                      <Bar
                        value={topic.mastery}
                        size="sm"
                        tone={topic.mastery < 50 ? 'danger' : 'gold'}
                      />
                      <span className="tiny strong">{topic.mastery}%</span>
                    </div>
                  </div>
                  <span className="badge badge--sage">{topic.trend}</span>
                  <Link to="/learning" className="btn btn--secondary btn--sm">
                    Practice
                  </Link>
                </div>
              ))}
            </div>

            <div className="strong-strip">
              <span className="tiny muted">Looking strong:</span>
              {strongTopics.map((topic) => (
                <span className="badge badge--teal" key={topic.name}>
                  <Check size={12} /> {topic.name} {topic.mastery}%
                </span>
              ))}
            </div>
          </section>

          {/* Recommended teachers ------------------------------------ */}
          <section className="card card--pad">
            <div className="card-head">
              <div>
                <h2 className="card-title">
                  <Sparkles size={16} /> Teachers matched to your gaps
                </h2>
                <p className="tiny muted" style={{ marginTop: 4 }}>
                  Based on subject depth, teaching style and your preferred language.
                </p>
              </div>
              <Link to="/teachers" className="text-link">
                See all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-2" style={{ gap: 14 }}>
              <TeacherMini teacher={teachersById['ananya-iyer']} note="Best fit for factorisation" />
              <TeacherMini teacher={teachersById['meera-nair']} note="Best fit for bonding diagrams" />
            </div>
          </section>

          {/* Recent materials ---------------------------------------- */}
          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <FileText size={16} /> Recently accessed
              </h2>
              <Link to="/learning" className="text-link">
                Open workspace <ArrowRight size={14} />
              </Link>
            </div>
            <div className="material-list">
              {recentMaterials.map((material) => {
                const Icon = materialIcons[material.icon] || FileText
                return (
                  <div className="material-item" key={material.id}>
                    <span className={`list-icon ${material.type === 'Video' ? 'list-icon--navy' : ''}`}>
                      <Icon size={16} />
                    </span>
                    <div className="grow">
                      <strong>{material.title}</strong>
                      <p className="tiny muted">
                        {material.meta} · {material.topic}
                      </p>
                    </div>
                    <span className="tiny muted">{material.when}</span>
                    <button
                      type="button"
                      className="btn btn--icon"
                      aria-label={`Open ${material.title}`}
                      onClick={() => notify(`Opening “${material.title}” in the workspace.`)}
                    >
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        {/* Right rail ------------------------------------------------- */}
        <aside className="stack" style={{ gap: 24 }}>
          <section className="card card--pad goal-card">
            <div className="card-head">
              <h2 className="card-title">
                <Target size={16} /> Today’s goal
              </h2>
              <Link to="/profile" className="tiny muted">
                Edit
              </Link>
            </div>
            <div className="goal-card__ring">
              <ProgressRing
                value={goalPercent}
                size={112}
                stroke={9}
                label={`${completedMinutes}`}
                sublabel={`of ${prefs.dailyGoal} min`}
              />
              <div>
                <strong className="goal-card__title">
                  {goalPercent >= 100 ? 'Goal complete' : 'Almost there'}
                </strong>
                <p className="tiny muted">
                  {remainingGoals
                    ? `${remainingGoals} task${remainingGoals > 1 ? 's' : ''} left today`
                    : 'Nice work — everything is checked off.'}
                </p>
                <span className="badge badge--gold" style={{ marginTop: 6 }}>
                  <Flame size={12} /> Keep the streak alive
                </span>
              </div>
            </div>

            <ul className="goal-list">
              {goals.map((goal) => (
                <li key={goal.id}>
                  <button
                    type="button"
                    className={`goal-item ${goal.done ? 'is-done' : ''}`}
                    onClick={() => toggleGoal(goal.id)}
                    aria-pressed={goal.done}
                  >
                    <span className="goal-check">
                      {goal.done ? <Check size={12} /> : null}
                    </span>
                    <span className="grow">{goal.label}</span>
                    <span className="tiny muted">{goal.minutes}m</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="card card--pad streak-card">
            <div className="between">
              <h2 className="card-title">
                <Flame size={16} /> Study streak
              </h2>
              <span className="badge badge--gold">12 days</span>
            </div>
            <div className="streak-card__hero">
              <span className="streak-flame">
                <Flame size={26} />
              </span>
              <div>
                <strong>Keep it going</strong>
                <p className="tiny muted">Best streak: 21 days · 12 this run</p>
              </div>
            </div>
            <div className="streak-days">
              {streakDays.map((day, index) => (
                <div key={index} className="streak-day">
                  <span className={day.done ? 'is-done' : ''}>
                    {day.done ? <Check size={12} /> : null}
                  </span>
                  <small>{day.day}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="card card--sage ai-suggestion">
            <span className="ai-suggestion__icon">
              <Sparkles size={18} />
            </span>
            <h3>Small insight, big difference</h3>
            <p>
              Your accuracy drops 22% when questions mix factorising and the formula.
              A 10-minute mixed set on Thursday would close that gap.
            </p>
            <Link to="/learning" className="btn btn--secondary btn--sm">
              Start mixed set <ArrowRight size={14} />
            </Link>
          </section>

          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <CalendarDays size={16} /> Next session
              </h2>
              <span className="badge badge--sage">Today</span>
            </div>
            <div className="session-card">
              <Avatar
                name="Dr. Ananya Iyer"
                initials="AI"
                tint={['#DDEBE4', '#2C7264']}
                size={40}
                online
              />
              <div className="grow">
                <strong>Trigonometry identities</strong>
                <p className="tiny muted">Dr. Ananya Iyer · 6:00 PM · 45 min</p>
              </div>
            </div>
            <Link to="/learning" className="btn btn--secondary btn--sm btn--block" style={{ marginTop: 12 }}>
              Prepare for session
            </Link>
          </section>
        </aside>
      </div>
    </div>
  )
}
