import { useState } from 'react'
import {
  ArrowRight,
  Award,
  BookOpen,
  Clock,
  Flame,
  ListChecks,
  Moon,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { Link } from '../lib/router'
import { useStore } from '../lib/store'
import {
  achievements,
  improvementTrend,
  lastWeekActivity,
  learningGoals,
  quizPerformance,
  recentAttempts,
  recommendations,
  weeklyActivity,
} from '../data/content'
import { BarChart, HorizontalBars, LineChart, Sparkline } from '../components/charts'
import { Badge, Bar, ProgressRing } from '../components/ui'

const ACHIEVEMENT_ICONS = {
  flame: Flame,
  trending: TrendingUp,
  target: Target,
  clock: Clock,
  moon: Moon,
  award: Award,
}

const MASTERY = [
  { label: 'Algebra', value: 78 },
  { label: 'Trigonometry', value: 64 },
  { label: 'Chemistry', value: 55 },
  { label: 'Biology', value: 88 },
  { label: 'Physics', value: 74 },
]

export default function Progress() {
  const { notify } = useStore()
  const [week, setWeek] = useState('this')

  const overallGoal = Math.round(
    learningGoals.reduce((total, goal) => total + goal.progress, 0) / learningGoals.length,
  )
  const averageQuiz = Math.round(
    quizPerformance.reduce((total, item) => total + item.value, 0) / quizPerformance.length,
  )

  return (
    <div className="container page pg">
      <header className="page-head">
        <div>
          <span className="eyebrow">Progress & analytics</span>
          <h1 className="page-title">Small gains, made visible.</h1>
          <p>
            Your effort, accuracy and concept mastery in one calm view — with the next
            best action always attached.
          </p>
        </div>
        <div className="row wrap">
          <span className="badge badge--sage">Updated today · 9:12 AM</span>
          <Link to="/assessment" className="btn btn--primary btn--sm">
            <Sparkles size={14} /> New diagnostic
          </Link>
        </div>
      </header>

      <section className="pg-stats">
        <article className="pg-stat card">
          <div className="between">
            <span className="pg-stat__label">
              <Clock size={14} /> Learning hours
            </span>
            <span className="badge badge--teal">+3.2h</span>
          </div>
          <div className="pg-stat__value">
            34.5<span>h</span>
          </div>
          <div className="between">
            <p className="tiny muted">3h 42m this week</p>
            <Sparkline data={[16, 21, 24, 26, 30, 33, 34.5]} />
          </div>
        </article>

        <article className="pg-stat card">
          <div className="between">
            <span className="pg-stat__label">
              <BookOpen size={14} /> Topics completed
            </span>
            <span className="badge badge--teal">+1</span>
          </div>
          <div className="pg-stat__value">
            8<span>/ 12</span>
          </div>
          <Bar value={67} size="sm" />
          <p className="tiny muted">4 topics in progress</p>
        </article>

        <article className="pg-stat card">
          <div className="between">
            <span className="pg-stat__label">
              <ListChecks size={14} /> Quiz average
            </span>
            <span className="badge badge--gold">
              <TrendingUp size={11} /> +17%
            </span>
          </div>
          <div className="pg-stat__value">{averageQuiz}%</div>
          <Sparkline data={[58, 63, 61, 69, 74, 76, 78]} color="var(--gold-600)" />
          <p className="tiny muted">Across 14 attempts</p>
        </article>

        <article className="pg-stat card">
          <div className="between">
            <span className="pg-stat__label">
              <Flame size={14} /> Current streak
            </span>
            <span className="badge badge--gold">Best 21</span>
          </div>
          <div className="pg-stat__value">
            12<span>days</span>
          </div>
          <div className="pg-streak-dots">
            {[1, 1, 1, 1, 1, 0, 0].map((done, index) => (
              <span key={index} className={done ? 'is-done' : ''} />
            ))}
          </div>
          <p className="tiny muted">2 days to your next badge</p>
        </article>
      </section>

      <div className="split">
        <div className="stack" style={{ gap: 22 }}>
          <section className="card card--pad">
            <div className="card-head">
              <div>
                <h2 className="card-title">
                  <Clock size={16} /> Weekly progress
                </h2>
                <p className="tiny muted" style={{ marginTop: 4 }}>
                  Minutes studied per day · compared with last week
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
              data={week === 'this' ? weeklyActivity : lastWeekActivity}
              compare={week === 'this' ? lastWeekActivity : weeklyActivity}
              height={200}
            />

            <div className="chart-summary">
              <div>
                <strong>{week === 'this' ? '5h 42m' : '4h 26m'}</strong>
                <span>Total studied</span>
              </div>
              <div>
                <strong>{week === 'this' ? '32 min' : '38 min'}</strong>
                <span>Longest session</span>
              </div>
              <div>
                <strong className="text-teal">{week === 'this' ? '+28%' : 'Baseline'}</strong>
                <span>Week over week</span>
              </div>
              <div>
                <strong>{week === 'this' ? '6 of 7' : '5 of 7'}</strong>
                <span>Active days</span>
              </div>
            </div>
          </section>

          <div className="grid grid-2" style={{ gap: 22 }}>
            <section className="card card--pad">
              <div className="card-head">
                <h2 className="card-title">
                  <ListChecks size={16} /> Quiz performance
                </h2>
                <Badge variant="teal">Avg {averageQuiz}%</Badge>
              </div>
              <BarChart data={quizPerformance} />
              <p className="tiny muted" style={{ marginTop: 10 }}>
                Algebra is climbing. Chemical bonding remains the lowest — a targeted
                10-question set this week would help most.
              </p>
            </section>

            <section className="card card--pad">
              <div className="card-head">
                <h2 className="card-title">
                  <TrendingUp size={16} /> Improvement trend
                </h2>
                <Badge variant="gold">+17%</Badge>
              </div>
              <LineChart data={improvementTrend} height={150} suffix="%" max={100} />
              <div className="row between" style={{ marginTop: 8 }}>
                <p className="tiny muted">Average quiz score across six weeks</p>
                <span className="badge badge--teal">On track</span>
              </div>
            </section>
          </div>

          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <Target size={16} /> Mastery by subject
              </h2>
              <span className="tiny muted">Based on 14 quizzes and 2 diagnostics</span>
            </div>
            <HorizontalBars items={MASTERY} />
          </section>

          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <ListChecks size={16} /> Recent quiz attempts
              </h2>
              <Link to="/learning" className="text-link">
                Practise more <ArrowRight size={14} />
              </Link>
            </div>
            <div className="attempt-table">
              <div className="attempt-table__head">
                <span>Topic</span>
                <span>Date</span>
                <span>Score</span>
                <span>Time</span>
                <span />
              </div>
              {recentAttempts.map((attempt) => (
                <div className="attempt-row" key={attempt.id}>
                  <span className="strong">{attempt.topic}</span>
                  <span className="tiny muted">{attempt.date}</span>
                  <span>
                    <span
                      className={`badge ${
                        attempt.score >= 80
                          ? 'badge--teal'
                          : attempt.score >= 60
                            ? 'badge--gold'
                            : 'badge--danger'
                      }`}
                    >
                      {attempt.score}%
                    </span>
                  </span>
                  <span className="tiny muted">
                    {attempt.questions} Qs · {attempt.time}
                  </span>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => notify(`Opening review for ${attempt.topic}.`)}
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="stack" style={{ gap: 22 }}>
          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <Target size={16} /> Learning goals
              </h2>
              <span className="badge badge--teal">On track</span>
            </div>
            <div className="pg-goal-hero">
              <ProgressRing
                value={overallGoal}
                size={88}
                stroke={8}
                label={`${overallGoal}%`}
                sublabel="this week"
              />
              <div>
                <strong className="small">Three goals, one plan</strong>
                <p className="tiny muted">
                  Reset every Monday. The AI rebalances them if a week goes sideways.
                </p>
              </div>
            </div>

            <div className="stack" style={{ gap: 16 }}>
              {learningGoals.map((goal) => (
                <div key={goal.id}>
                  <div className="bar-meta">
                    <span className="small strong">{goal.title}</span>
                    <span className="tiny">{goal.progress}%</span>
                  </div>
                  <Bar value={goal.progress} size="sm" tone={goal.progress >= 80 ? 'teal' : 'gold'} />
                  <p className="tiny muted" style={{ marginTop: 5 }}>
                    {goal.note} · target {goal.target}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <Sparkles size={16} /> Recommended for you
              </h2>
            </div>
            <div className="reco-list">
              {recommendations.map((item) => (
                <div className="reco-item" key={item.id}>
                  <div className="between">
                    <span className="tiny muted">{item.type}</span>
                    <Badge variant="sage">AI pick</Badge>
                  </div>
                  <strong className="small">{item.title}</strong>
                  <p className="tiny muted">{item.note}</p>
                  <Link to={item.href} className="text-link">
                    {item.cta} <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <Award size={16} /> Achievements
              </h2>
              <span className="tiny muted">6 earned</span>
            </div>
            <div className="achievements">
              {achievements.map((item) => {
                const Icon = ACHIEVEMENT_ICONS[item.icon] || Award
                return (
                  <div className={`achievement achievement--${item.tone}`} key={item.id}>
                    <span className="achievement__icon">
                      <Icon size={16} />
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.note}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
