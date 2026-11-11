import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Brain,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  ListChecks,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
} from 'lucide-react'
import { Link } from '../lib/router'
import { useStore } from '../lib/store'
import {
  assessmentMeta,
  assessmentQuestions,
  teachersById,
  topicsById,
} from '../data/content'
import { TeacherMini } from '../components/TeacherCard'
import { HorizontalBars } from '../components/charts'
import { Badge, Bar, ProgressRing, SubjectTile } from '../components/ui'

const LETTERS = ['A', 'B', 'C', 'D']

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return `${minutes}:${String(rest).padStart(2, '0')}`
}

export default function Assessment() {
  const { assessment, saveAssessment } = useStore()
  const [stage, setStage] = useState('intro')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [elapsed, setElapsed] = useState(0)
  const [result, setResult] = useState(assessment || null)

  useEffect(() => {
    if (stage !== 'quiz') return undefined
    const timer = window.setInterval(() => {
      setElapsed((value) => Math.min(479, value + 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [stage])

  const question =
    assessmentQuestions[Math.min(index, assessmentQuestions.length - 1)]
  const answeredCount = Object.keys(answers).length
  const remaining = 480 - elapsed

  function start() {
    setAnswers({})
    setIndex(0)
    setElapsed(0)
    setStage('quiz')
  }

  function finish() {
    const conceptStats = assessmentMeta.concepts.map((concept) => {
      const questions = assessmentQuestions.filter((item) => item.concept === concept)
      const correct = questions.filter(
        (item) => answers[item.id] === item.answer,
      ).length
      return {
        concept,
        correct,
        total: questions.length,
        mastery: Math.round((correct / questions.length) * 100),
      }
    })
    const score = Math.round(
      (assessmentQuestions.filter(
        (item) => answers[item.id] === item.answer,
      ).length /
        assessmentQuestions.length) *
        100,
    )
    const payload = {
      score,
      answers,
      conceptStats,
      at: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      }),
    }
    setResult(payload)
    saveAssessment(payload)
    setStage('results')
  }

  return (
    <div className="container page asm">
      <header className="page-head">
        <div>
          <span className="eyebrow">AI learning assessment</span>
          <h1 className="page-title">Find the gaps. Close them faster.</h1>
          <p>
            A short adaptive diagnostic that maps what you truly understand — then
            builds a remediation plan around the exact concepts that are holding you
            back.
          </p>
        </div>
        <span className="badge badge--teal">
          <Sparkles size={13} /> Adaptive diagnostic
        </span>
      </header>

      {stage === 'intro' ? (
        <div className="split">
          <div className="stack" style={{ gap: 22 }}>
            <section className="card card--pad asm-intro">
              <div className="row wrap" style={{ justifyContent: 'space-between', gap: 14 }}>
                <div className="row" style={{ gap: 12 }}>
                  <SubjectTile subjectId="math" size={46} />
                  <div>
                    <h2>{assessmentMeta.title}</h2>
                    <p className="tiny muted">{assessmentMeta.subject}</p>
                  </div>
                </div>
                <Badge variant="gold">Recommended next</Badge>
              </div>

              <p className="asm-intro__lead">
                Six questions. Eight minutes. No grades — just a clear picture of which
                sub-concepts are solid and which need attention before your next test.
              </p>

              <div className="asm-facts">
                <div>
                  <ListChecks size={16} />
                  <strong>{assessmentMeta.questions} questions</strong>
                  <span>Multiple choice</span>
                </div>
                <div>
                  <Clock size={16} />
                  <strong>~8 minutes</strong>
                  <span>Untimed, self-paced</span>
                </div>
                <div>
                  <Brain size={16} />
                  <strong>6 concepts</strong>
                  <span>Gap-level analysis</span>
                </div>
              </div>

              <div className="row wrap" style={{ marginTop: 22 }}>
                <button type="button" className="btn btn--primary btn--lg" onClick={start}>
                  Start diagnostic <ArrowRight size={17} />
                </button>
                {result ? (
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => {
                      setIndex(0)
                      setAnswers(result.answers || {})
                      setStage('results')
                    }}
                  >
                    Review last result
                  </button>
                ) : null}
              </div>
              <p className="tiny muted" style={{ marginTop: 12 }}>
                <Check size={12} /> Your answers stay private and are used only to
                personalise your learning path.
              </p>
            </section>

            <section className="card card--pad">
              <div className="card-head">
                <h2 className="card-title">
                  <Compass size={16} /> Concepts covered
                </h2>
                <span className="badge badge--sage">Class 10 · Mathematics</span>
              </div>
              <div className="asm-concepts">
                {assessmentMeta.concepts.map((concept, i) => (
                  <div className="asm-concept" key={concept}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {concept}
                  </div>
                ))}
              </div>
            </section>

            <section className="card card--pad">
              <div className="card-head">
                <h2 className="card-title">
                  <Clock size={16} /> Recent attempts
                </h2>
              </div>
              <div className="asm-attempts">
                <div className="asm-attempt">
                  <div>
                    <strong>Quadratic equations</strong>
                    <p className="tiny muted">6 questions · 7 min</p>
                  </div>
                  <span className="badge badge--gold">64%</span>
                  <span className="tiny muted">Last week</span>
                </div>
                <div className="asm-attempt">
                  <div>
                    <strong>Linear equations</strong>
                    <p className="tiny muted">8 questions · 6 min</p>
                  </div>
                  <span className="badge badge--teal">92%</span>
                  <span className="tiny muted">2 weeks ago</span>
                </div>
              </div>
            </section>
          </div>

          <aside className="stack" style={{ gap: 22 }}>
            <section className="card card--pad">
              <h2 className="tp-section-title">What you’ll get</h2>
              <ul className="asm-benefits">
                <li>
                  <span className="tile-icon">
                    <Target size={16} />
                  </span>
                  <div>
                    <strong>A concept-level gap map</strong>
                    <p>Not “maths is weak” — “sign errors in the discriminant”.</p>
                  </div>
                </li>
                <li>
                  <span className="tile-icon tile-icon--navy">
                    <ListChecks size={16} />
                  </span>
                  <div>
                    <strong>A 3-step remediation plan</strong>
                    <p>Sequenced lessons and practice, sized to your week.</p>
                  </div>
                </li>
                <li>
                  <span className="tile-icon tile-icon--gold">
                    <UserRound size={16} />
                  </span>
                  <div>
                    <strong>Matched teachers & materials</strong>
                    <p>Educators whose style fits the gaps you actually have.</p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="card card--sage asm-side-note">
              <TrendingUp size={18} />
              <div>
                <strong>Students who complete a diagnostic improve 2.4× faster.</strong>
                <p className="tiny">
                  Because the first week stops being guesswork. You can retake this any
                  time.
                </p>
              </div>
            </section>

            {result ? (
              <section className="card card--pad">
                <h2 className="tp-section-title">Last result</h2>
                <div className="row" style={{ gap: 14 }}>
                  <ProgressRing value={result.score} size={64} stroke={6} label={`${result.score}%`} />
                  <div>
                    <strong className="small">Saved {result.at}</strong>
                    <p className="tiny muted">
                      Review your gaps and keep going with the plan.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn--secondary btn--sm btn--block"
                  style={{ marginTop: 12 }}
                  onClick={() => {
                    setAnswers(result.answers || {})
                    setStage('results')
                  }}
                >
                  Open result
                </button>
              </section>
            ) : null}
          </aside>
        </div>
      ) : null}

      {stage === 'quiz' ? (
        <div className="asm-quiz-layout">
          <section className="card asm-quiz">
            <div className="asm-quiz__head">
              <div className="grow">
                <div className="between" style={{ marginBottom: 8 }}>
                  <span className="tiny strong">
                    Question {index + 1} of {assessmentQuestions.length}
                  </span>
                  <span className="badge badge--sage">
                    <Clock size={12} /> {formatTime(Math.max(0, remaining))} left
                  </span>
                </div>
                <Bar
                  value={((index + 1) / assessmentQuestions.length) * 100}
                  size="sm"
                />
              </div>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setStage('intro')}
              >
                Exit
              </button>
            </div>

            <div className="asm-question">
              <div className="row wrap" style={{ gap: 8 }}>
                <Badge variant="teal">{question.concept}</Badge>
                <Badge variant="outline">{question.difficulty}</Badge>
              </div>
              <h2>{question.prompt}</h2>

              <div className="asm-options">
                {question.options.map((option, optionIndex) => (
                  <button
                    type="button"
                    key={option}
                    className={`asm-option ${answers[question.id] === optionIndex ? 'is-chosen' : ''}`}
                    onClick={() =>
                      setAnswers((current) => ({ ...current, [question.id]: optionIndex }))
                    }
                    aria-pressed={answers[question.id] === optionIndex}
                  >
                    <span className="asm-option__letter">{LETTERS[optionIndex]}</span>
                    {option}
                    {answers[question.id] === optionIndex ? (
                      <span className="asm-option__check">
                        <Check size={12} />
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="asm-quiz__foot">
              <button
                type="button"
                className="btn btn--ghost"
                disabled={index === 0}
                onClick={() => setIndex((value) => Math.max(0, value - 1))}
              >
                Back
              </button>
              <span className="tiny muted">
                {answeredCount} of {assessmentQuestions.length} answered
              </span>
              {index === assessmentQuestions.length - 1 ? (
                <button type="button" className="btn btn--primary" onClick={finish}>
                  See my results <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() =>
                    setIndex((value) =>
                      Math.min(assessmentQuestions.length - 1, value + 1),
                    )
                  }
                >
                  Next question <ArrowRight size={16} />
                </button>
              )}
            </div>
          </section>

          <aside className="card asm-tracker">
            <h2 className="card-title">
              <Sparkles size={16} /> Live gap tracker
            </h2>
            <p className="tiny muted">
              Concepts update as you answer. Nothing is graded until you finish.
            </p>
            <div className="asm-tracker__list">
              {assessmentMeta.concepts.map((concept) => {
                const items = assessmentQuestions.filter((item) => item.concept === concept)
                const answered = items.filter((item) => answers[item.id] !== undefined)
                const correct = items.filter(
                  (item) => answers[item.id] === item.answer,
                ).length
                return (
                  <div className="asm-tracker__item" key={concept}>
                    <span className={`asm-tracker__dot ${answered.length ? (correct ? 'is-good' : 'is-bad') : ''}`} />
                    <span className="grow">{concept}</span>
                    <span className="tiny muted">
                      {answered.length ? `${correct}/${items.length}` : '—'}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="asm-tracker__note">
              <Sparkles size={14} />
              <p>
                Tip: think about the graph before the formula. Most gaps show up as a
                misread question, not missing knowledge.
              </p>
            </div>
          </aside>
        </div>
      ) : null}

      {stage === 'results' && result ? (
        <Results result={result} onRetake={start} />
      ) : null}
    </div>
  )
}

function Results({ result, onRetake }) {
  const conceptStats = result.conceptStats || []
  const strong = conceptStats.filter((item) => item.mastery >= 100)
  const weak = conceptStats.filter((item) => item.mastery < 100)
  const plan = [
    {
      title: 'Rebuild the discriminant habit',
      detail: '12-minute lesson, then 10 questions with bracket-first substitution.',
      href: '/learning',
      cta: 'Open lesson',
      icon: Target,
    },
    {
      title: 'Practise mixed method selection',
      detail: 'A short set where factorising and the formula both look tempting.',
      href: '/learning',
      cta: 'Start practice',
      icon: ListChecks,
    },
    {
      title: 'Review with a matched teacher',
      detail: 'Dr. Ananya Iyer specialises in exactly these two gaps.',
      href: '/teachers/ananya-iyer',
      cta: 'View profile',
      icon: UserRound,
    },
  ]

  return (
    <div className="asm-results">
      <section className="card asm-result-hero">
        <div className="asm-result-hero__score">
          <ProgressRing
            value={result.score}
            size={132}
            stroke={10}
            label={`${result.score}%`}
            sublabel="diagnostic"
          />
        </div>
        <div className="grow">
          <span className="eyebrow">Diagnostic complete · Saved {result.at}</span>
          <h2>
            {result.score >= 80
              ? 'Strong foundation. Two precise gaps left.'
              : result.score >= 55
                ? 'A solid base with clear, fixable gaps.'
                : 'A clear starting point — and a short path forward.'}
          </h2>
          <p className="muted">
            You answered {conceptStats.reduce((total, item) => total + item.correct, 0)} of{' '}
            {assessmentQuestions.length} correctly. The plan below targets the
            sub-concepts that cost you marks — not the whole syllabus.
          </p>
          <div className="chip-row" style={{ marginTop: 14 }}>
            {strong.length ? (
              <Badge variant="teal" icon={CheckCircle2}>
                Strong: {strong.map((item) => item.concept).join(', ')}
              </Badge>
            ) : null}
            <Badge variant="gold" icon={Sparkles}>
              Focus: {weak.slice(0, 2).map((item) => item.concept).join(', ')}
            </Badge>
          </div>
          <div className="row wrap" style={{ marginTop: 18 }}>
            <Link to="/learning" className="btn btn--primary">
              Start remediation path <ArrowRight size={16} />
            </Link>
            <button type="button" className="btn btn--secondary" onClick={onRetake}>
              <RotateCcw size={15} /> Retake
            </button>
          </div>
        </div>
      </section>

      <div className="split">
        <div className="stack" style={{ gap: 22 }}>
          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <Target size={16} /> Knowledge gap analysis
              </h2>
              <Badge variant="sage">{weak.length} gaps found</Badge>
            </div>

            <HorizontalBars
              items={conceptStats.map((item) => ({
                label: item.concept,
                value: item.mastery,
                tone: item.mastery >= 100 ? 'teal' : item.mastery >= 50 ? 'gold' : 'danger',
              }))}
            />

            <div className="gap-notes">
              <div>
                <strong>What this means</strong>
                <p>
                  Mastery is per concept, not per chapter. A 0% on discriminant
                  questions means the rule is not yet automatic — even if you can solve
                  quadratics generally.
                </p>
              </div>
              <div>
                <strong>Next best step</strong>
                <p>
                  Spend 20 minutes on {weak[0]?.concept.toLowerCase() || 'the first gap'} before
                  attempting another full quiz. Short, targeted repetition beats volume.
                </p>
              </div>
            </div>
          </section>

          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <Sparkles size={16} /> Your 3-step remediation plan
              </h2>
              <span className="tiny muted">~45 min total</span>
            </div>
            <div className="remediation">
              {plan.map((step, i) => {
                const Icon = step.icon
                return (
                  <div className="remediation__step" key={step.title}>
                    <span className="remediation__num">{i + 1}</span>
                    <span className="tile-icon">
                      <Icon size={16} />
                    </span>
                    <div className="grow">
                      <strong>{step.title}</strong>
                      <p className="tiny muted">{step.detail}</p>
                    </div>
                    <Link to={step.href} className="btn btn--secondary btn--sm">
                      {step.cta}
                    </Link>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <UserRound size={16} /> Teachers matched to these gaps
              </h2>
              <Link to="/teachers" className="text-link">
                See all
              </Link>
            </div>
            <div className="grid grid-2" style={{ gap: 14 }}>
              <TeacherMini
                teacher={teachersById['ananya-iyer']}
                note="Algebra remediation specialist"
              />
              <TeacherMini
                teacher={teachersById['vikram-rao']}
                note="Practice-heavy, accuracy focused"
              />
            </div>
          </section>
        </div>

        <aside className="stack" style={{ gap: 22 }}>
          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">Weak concepts</h2>
            </div>
            {weak.length ? (
              <div className="gap-list">
                {weak.map((item) => (
                  <div className="gap-item" key={item.concept}>
                    <div className="between">
                      <strong className="small">{item.concept}</strong>
                      <span className="tiny muted">
                        {item.correct}/{item.total} correct
                      </span>
                    </div>
                    <div className="row" style={{ gap: 9, marginTop: 6 }}>
                      <Bar
                        value={item.mastery}
                        size="sm"
                        tone={item.mastery >= 50 ? 'gold' : 'danger'}
                      />
                      <span className="tiny strong">{item.mastery}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="small muted">
                No gaps in this diagnostic. Try the advanced set to find a real stretch.
              </p>
            )}
            <Link to="/learning" className="btn btn--primary btn--sm btn--block" style={{ marginTop: 14 }}>
              Fix these gaps <ArrowRight size={14} />
            </Link>
          </section>

          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <FileText size={16} /> Suggested materials
              </h2>
            </div>
            <div className="stack" style={{ gap: 12 }}>
              <div className="material-item material-item--plain">
                <span className="list-icon list-icon--navy">
                  <FileText size={15} />
                </span>
                <div className="grow">
                  <strong className="small">Quadratic formula — master notes</strong>
                  <p className="tiny muted">6 pages · includes a method selector</p>
                </div>
                <Link to="/learning" className="text-link">
                  Open
                </Link>
              </div>
              <div className="material-item material-item--plain">
                <span className="list-icon">
                  <ListChecks size={15} />
                </span>
                <div className="grow">
                  <strong className="small">10 discriminant questions</strong>
                  <p className="tiny muted">Adaptive · ~12 minutes</p>
                </div>
                <Link to="/learning" className="text-link">
                  Open
                </Link>
              </div>
              <div className="material-item material-item--plain">
                <span className="list-icon list-icon--gold">
                  <Compass size={15} />
                </span>
                <div className="grow">
                  <strong className="small">
                    {topicsById['quadratic-equations'].name} path
                  </strong>
                  <p className="tiny muted">6 modules · 4h 25m</p>
                </div>
                <Link to="/learning" className="text-link">
                  Open
                </Link>
              </div>
            </div>
          </section>

          <section className="card card--sage asm-side-note">
            <Sparkles size={18} />
            <div>
              <strong>Recheck in 7 days</strong>
              <p className="tiny">
                Spaced retrieval works best when the next diagnostic lands just before
                you would forget.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
