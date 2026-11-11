import { useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileText,
  ListChecks,
  Maximize2,
  MessageSquare,
  Pause,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  Target,
  Volume2,
} from 'lucide-react'
import { Link } from '../lib/router'
import { useStore } from '../lib/store'
import {
  course,
  lessonChapters,
  lessonNotes,
  practiceQuiz,
  teachersById,
} from '../data/content'
import {
  Avatar,
  Badge,
  Bar,
  ProgressRing,
  Rating,
  SubjectTile,
} from '../components/ui'

const TABS = [
  { id: 'lesson', label: 'Lesson', icon: Play },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'practice', label: 'Practice', icon: ListChecks },
  { id: 'ai', label: 'AI tutor', icon: MessageSquare },
]

const AI_REPLIES = [
  'Think of the discriminant as a preview. D = b² − 4ac tells you how many times the parabola crosses the x-axis before you solve anything: positive means twice, zero means once, negative means never. Try computing D for x² + 4x + 8 and tell me what the graph does.',
  'Completing the square works because you are rewriting the same expression in a form that exposes the vertex. Take x² + 6x: add and subtract 9 to get (x + 3)² − 9. The +9 completes the square, the −9 keeps the value unchanged. That is the whole trick behind the quadratic formula.',
  'Here is a harder one: if x² + (k − 2)x + 9 = 0 has equal roots, find k. Start with D = 0, so (k − 2)² = 36. That gives k = 8 or k = −4. Notice how the condition “equal roots” converts the question into a much simpler equation.',
  'Your last three attempts show the same pattern: the sign of b. Write the substitution with brackets every time — (−7)² not −7². It feels slow for a week, then it becomes automatic and those marks stop disappearing.',
]

export default function Workspace() {
  const { completedModules, toggleModule, notify, prefs } = useStore()
  const [currentId, setCurrentId] = useState('m3')
  const [tab, setTab] = useState('lesson')
  const [playing, setPlaying] = useState(false)
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'intro',
      role: 'ai',
      text: 'Hi Aarav. I have read your last 3 quiz attempts on quadratic equations. Ask me anything about the formula, the discriminant, or a specific question that is bugging you.',
    },
  ])
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const replyIndex = useRef(0)

  const current = course.modules.find((module) => module.id === currentId) || course.modules[2]
  const currentIndex = course.modules.findIndex((module) => module.id === current.id)
  const isComplete = completedModules.includes(current.id)
  const completedCount = course.modules.filter((module) =>
    completedModules.includes(module.id),
  ).length
  const progress = Math.round((completedCount / course.modules.length) * 100)
  const nextModule =
    course.modules.find(
      (module) => !completedModules.includes(module.id) && module.id !== current.id,
    ) || course.modules[Math.min(currentIndex + 1, course.modules.length - 1)]
  const teacher = teachersById[course.teacherId]
  const quizScore = practiceQuiz.reduce(
    (total, question) => total + (answers[question.id] === question.answer ? 1 : 0),
    0,
  )

  function selectModule(id) {
    setCurrentId(id)
    setTab('lesson')
    setPlaying(false)
    setChecked(false)
    setAnswers({})
  }

  function submitQuiz() {
    if (Object.keys(answers).length < practiceQuiz.length) {
      notify('Answer all three questions before checking.')
      return
    }
    setChecked(true)
    const score = practiceQuiz.reduce(
      (total, question) => total + (answers[question.id] === question.answer ? 1 : 0),
      0,
    )
    if (score === practiceQuiz.length && !completedModules.includes(current.id)) {
      toggleModule(current.id)
    } else {
      notify(
        score === practiceQuiz.length
          ? 'Perfect practice set.'
          : `You scored ${score}/${practiceQuiz.length} — read the explanations and try again.`,
        score === practiceQuiz.length ? 'success' : 'default',
      )
    }
  }

  function resetQuiz() {
    setAnswers({})
    setChecked(false)
  }

  function downloadNote(note) {
    const blob = new Blob([note.content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${note.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.txt`
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    URL.revokeObjectURL(url)
    notify(`Downloaded “${note.title}”.`, 'success')
  }

  function sendMessage(text) {
    const value = text.trim()
    if (!value) return
    setMessages((current) => [
      ...current,
      { id: `u-${Date.now()}`, role: 'user', text: value },
    ])
    setDraft('')
    setTyping(true)
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `a-${Date.now()}`,
          role: 'ai',
          text: AI_REPLIES[replyIndex.current % AI_REPLIES.length],
        },
      ])
      replyIndex.current += 1
      setTyping(false)
    }, 900)
  }

  function openTutor(question) {
    setTab('ai')
    sendMessage(question)
  }

  return (
    <div className="ws">
      <div className="ws-topbar">
        <div className="container ws-topbar__inner">
          <Link to="/dashboard" className="tp-back">
            <ArrowLeft size={15} /> Dashboard
          </Link>
          <div className="ws-topbar__title">
            <span className="ws-topbar__dot" />
            {course.title}
            <span className="ws-topbar__meta">
              {course.level} · {completedCount}/{course.modules.length} modules
            </span>
          </div>
          <div className="row" style={{ gap: 10 }}>
            <Badge variant="teal">
              <Sparkles size={12} /> AI-adapted path
            </Badge>
            <span className="badge badge--sage">{progress}% complete</span>
          </div>
        </div>
      </div>

      <div className="container ws-layout">
        {/* Learning path --------------------------------------------- */}
        <aside className="ws-sidebar card">
          <div className="ws-course">
            <SubjectTile subjectId={course.subjectId} size={40} />
            <div className="grow">
              <strong>{course.title}</strong>
              <p className="tiny muted">{course.subtitle}</p>
            </div>
          </div>
          <div className="ws-course__progress">
            <div className="bar-meta">
              <span className="tiny muted">Learning path</span>
              <strong className="tiny">{progress}%</strong>
            </div>
            <Bar value={progress} size="sm" />
          </div>

          <nav className="ws-modules" aria-label="Learning path">
            {course.modules.map((module, index) => {
              const done = completedModules.includes(module.id)
              const active = module.id === current.id
              return (
                <button
                  type="button"
                  key={module.id}
                  className={`ws-module ${active ? 'is-current' : ''} ${done ? 'is-done' : ''}`}
                  onClick={() => selectModule(module.id)}
                  aria-current={active ? 'step' : undefined}
                >
                  <span className="ws-module__status">
                    {done ? <CheckCircle2 size={17} /> : index + 1}
                  </span>
                  <span className="ws-module__text">
                    <strong>{module.title}</strong>
                    <small>
                      {module.kind} · {module.minutes} min
                    </small>
                  </span>
                  <ChevronRight size={15} className="ws-module__chev" />
                </button>
              )
            })}
          </nav>

          <div className="ws-sidebar__foot">
            <Target size={14} />
            <p>
              Path adapts after each quiz. Mastery above 85% retires a module
              automatically.
            </p>
          </div>
        </aside>

        {/* Lesson ---------------------------------------------------- */}
        <section className="ws-main">
          <article className="card ws-lesson">
            <header className="ws-lesson__head">
              <div className="between wrap" style={{ gap: 12 }}>
                <div>
                  <span className="eyebrow">
                    Module {currentIndex + 1} · {current.kind}
                  </span>
                  <h1>{current.title}</h1>
                  <p className="muted small">{current.summary}</p>
                </div>
                <div className="row" style={{ gap: 8 }}>
                  <span className="badge badge--sage">
                    <Clock size={12} /> {current.minutes} min
                  </span>
                  {isComplete ? (
                    <span className="badge badge--teal">
                      <Check size={12} /> Completed
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="ws-tabs" role="tablist" aria-label="Lesson sections">
                {TABS.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={tab === item.id}
                      className={tab === item.id ? 'is-active' : ''}
                      onClick={() => setTab(item.id)}
                    >
                      <Icon size={15} /> {item.label}
                    </button>
                  )
                })}
              </div>
            </header>

            <div className="ws-lesson__body">
              {tab === 'lesson' ? (
                <div className="ws-tab-panel">
                  <div className={`ws-video ${playing ? 'is-playing' : ''}`}>
                    <div className="ws-video__glow" aria-hidden="true" />
                    <div className="ws-video__grain" aria-hidden="true" />
                    <div className="ws-video__center">
                      <button
                        type="button"
                        className="ws-video__play"
                        onClick={() => {
                          setPlaying((value) => !value)
                          if (!playing) notify('Preview playing — your full lesson continues in the live session.')
                        }}
                        aria-label={playing ? 'Pause preview' : 'Play lesson preview'}
                      >
                        {playing ? <Pause size={24} /> : <Play size={24} />}
                      </button>
                      <span className="ws-video__label">
                        {playing ? 'Playing preview…' : 'Watch the concept explained'}
                      </span>
                      <span className="tiny ws-video__sub">
                        {current.title} · Dr. Ananya Iyer
                      </span>
                    </div>
                    <div className="ws-video__controls">
                      <span className="tiny">08:24</span>
                      <div className={`ws-video__line ${playing ? 'is-playing' : ''}`}>
                        <span />
                      </div>
                      <span className="tiny">28:00</span>
                      <Volume2 size={15} />
                      <Maximize2 size={15} />
                    </div>
                  </div>

                  <div className="ws-chapters">
                    <div className="between">
                      <strong className="small">In this lesson</strong>
                      <span className="tiny muted">{lessonChapters.length} chapters</span>
                    </div>
                    {lessonChapters.map((chapter) => (
                      <button
                        type="button"
                        key={chapter.title}
                        className="ws-chapter"
                        onClick={() => notify(`Jumping to “${chapter.title}” at ${chapter.time}.`)}
                      >
                        <span>{chapter.time}</span>
                        {chapter.title}
                        <Play size={13} />
                      </button>
                    ))}
                  </div>

                  <div className="ws-objectives">
                    <h3>What you’ll be able to do</h3>
                    <ul>
                      {current.objectives.map((objective) => (
                        <li key={objective}>
                          <span>
                            <Check size={12} />
                          </span>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="ws-formula">
                    <div>
                      <span className="eyebrow">Key idea</span>
                      <code>x = (−b ± √(b² − 4ac)) / 2a</code>
                      <p className="small muted">
                        Write <em>b</em> in brackets before squaring. Most lost marks
                        here are sign errors, not algebra errors.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      onClick={() => openTutor('Why does the quadratic formula work?')}
                    >
                      <Sparkles size={14} /> Ask the AI tutor
                    </button>
                  </div>

                  <div className="ws-lesson__foot">
                    <button
                      type="button"
                      className={`btn ${isComplete ? 'btn--sage' : 'btn--primary'}`}
                      onClick={() => toggleModule(current.id)}
                    >
                      {isComplete ? (
                        <>
                          <Check size={16} /> Module completed
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={16} /> Mark module complete
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn--secondary"
                      onClick={() => setTab('practice')}
                    >
                      Practise this concept <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              ) : null}

              {tab === 'notes' ? (
                <div className="ws-tab-panel">
                  <div className="ws-panel-head">
                    <div>
                      <h3>Downloadable notes</h3>
                      <p className="small muted">
                        Written by your teacher, matched to this module. Yours to keep.
                      </p>
                    </div>
                    <Badge variant="sage">{lessonNotes.length} files</Badge>
                  </div>

                  <div className="note-list">
                    {lessonNotes.map((note) => (
                      <article className="note-item" key={note.id}>
                        <span className="list-icon list-icon--navy">
                          <FileText size={17} />
                        </span>
                        <div className="grow">
                          <strong>{note.title}</strong>
                          <p className="tiny muted">
                            {note.meta} · {note.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="btn btn--secondary btn--sm"
                          onClick={() => downloadNote(note)}
                        >
                          <Download size={14} /> Download
                        </button>
                      </article>
                    ))}
                  </div>

                  <div className="ws-note-card card--sage">
                    <Sparkles size={17} />
                    <div>
                      <strong>Want these adapted?</strong>
                      <p className="small">
                        Ask the AI tutor to rewrite any note at your reading level, or
                        generate five extra questions from it.
                      </p>
                      <button
                        type="button"
                        className="text-link"
                        onClick={() => openTutor('Can you summarise these notes in simpler language?')}
                      >
                        Simplify these notes <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {tab === 'practice' ? (
                <div className="ws-tab-panel">
                  <div className="ws-panel-head">
                    <div>
                      <h3>Quick practice · 3 questions</h3>
                      <p className="small muted">
                        Immediate feedback with a worked explanation for every option.
                      </p>
                    </div>
                    {checked ? (
                      <span className={`badge ${quizScore === 3 ? 'badge--teal' : 'badge--gold'}`}>
                        {quizScore} / {practiceQuiz.length} correct
                      </span>
                    ) : (
                      <Badge variant="sage">No timer</Badge>
                    )}
                  </div>

                  <div className="quiz-list">
                    {practiceQuiz.map((question, questionIndex) => (
                      <article className="quiz-q" key={question.id}>
                        <div className="quiz-q__prompt">
                          <span className="quiz-q__num">{questionIndex + 1}</span>
                          <h4>{question.prompt}</h4>
                        </div>
                        <div className="quiz-options">
                          {question.options.map((option, optionIndex) => {
                            const chosen = answers[question.id] === optionIndex
                            const correct = question.answer === optionIndex
                            const state = checked
                              ? correct
                                ? 'is-correct'
                                : chosen
                                  ? 'is-wrong'
                                  : ''
                              : chosen
                                ? 'is-chosen'
                                : ''
                            return (
                              <button
                                type="button"
                                key={option}
                                className={`quiz-option ${state}`}
                                onClick={() => {
                                  if (checked) return
                                  setAnswers((current) => ({
                                    ...current,
                                    [question.id]: optionIndex,
                                  }))
                                }}
                                aria-pressed={chosen}
                              >
                                <span className="quiz-option__letter">
                                  {String.fromCharCode(65 + optionIndex)}
                                </span>
                                {option}
                                {checked && correct ? <Check size={15} /> : null}
                              </button>
                            )
                          })}
                        </div>
                        {checked ? (
                          <div className="quiz-explain">
                            <Sparkles size={14} />
                            <p>{question.explanation}</p>
                          </div>
                        ) : null}
                      </article>
                    ))}
                  </div>

                  <div className="ws-lesson__foot">
                    {checked ? (
                      <>
                        <button type="button" className="btn btn--secondary" onClick={resetQuiz}>
                          <RotateCcw size={15} /> Try again
                        </button>
                        <button
                          type="button"
                          className="btn btn--primary"
                          onClick={() => setTab('lesson')}
                        >
                          Back to lesson <ArrowRight size={15} />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="tiny muted">
                          {Object.keys(answers).length} of {practiceQuiz.length} answered
                        </span>
                        <button
                          type="button"
                          className="btn btn--primary"
                          onClick={submitQuiz}
                        >
                          Check answers <ArrowRight size={15} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : null}

              {tab === 'ai' ? (
                <div className="ws-tab-panel ws-tutor">
                  <div className="ws-tutor__head">
                    <div className="row" style={{ gap: 10 }}>
                      <span className="chat-avatar">
                        <Sparkles size={15} />
                      </span>
                      <div>
                        <strong>AI tutor · quadratics</strong>
                        <p className="tiny muted">Knows your attempts, notes and pace</p>
                      </div>
                    </div>
                    <Badge variant="teal">Personalized</Badge>
                  </div>

                  <div className="ws-chat">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`ws-chat__msg ws-chat__msg--${message.role}`}
                      >
                        {message.role === 'ai' ? (
                          <span className="chat-avatar chat-avatar--sm">
                            <Sparkles size={12} />
                          </span>
                        ) : (
                          <Avatar name="Aarav Mehta" initials="AM" size={28} />
                        )}
                        <div className="ws-chat__bubble">
                          <p>{message.text}</p>
                        </div>
                      </div>
                    ))}
                    {typing ? (
                      <div className="ws-chat__msg ws-chat__msg--ai">
                        <span className="chat-avatar chat-avatar--sm">
                          <Sparkles size={12} />
                        </span>
                        <div className="ws-chat__bubble ws-chat__bubble--typing">
                          <i />
                          <i />
                          <i />
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="ws-suggestions">
                    {[
                      'Explain the discriminant simply',
                      'Why does completing the square work?',
                      'Give me a harder question',
                    ].map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        className="chip"
                        onClick={() => sendMessage(prompt)}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>

                  <form
                    className="ws-chat__input"
                    onSubmit={(event) => {
                      event.preventDefault()
                      sendMessage(draft)
                    }}
                  >
                    <label htmlFor="tutor-input" className="sr-only">
                      Ask the AI tutor
                    </label>
                    <input
                      id="tutor-input"
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      placeholder="Ask about this concept, or paste a question…"
                    />
                    <button
                      type="submit"
                      className="btn btn--primary btn--sm"
                      disabled={!draft.trim()}
                    >
                      <Send size={15} /> Send
                    </button>
                  </form>
                  <p className="tiny muted center">
                    AI answers are grounded in this course’s notes. Always verify with
                    your teacher.
                  </p>
                </div>
              ) : null}
            </div>
          </article>

          <article className="card ws-next">
            <span className="tile-icon">
              <Target size={17} />
            </span>
            <div className="grow">
              <span className="eyebrow">Up next in your path</span>
              <strong>{nextModule.title}</strong>
              <p className="tiny muted">
                {nextModule.kind} · {nextModule.minutes} min · {nextModule.summary}
              </p>
            </div>
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => selectModule(nextModule.id)}
            >
              Continue <ArrowRight size={14} />
            </button>
          </article>
        </section>

        {/* Right rail ------------------------------------------------ */}
        <aside className="ws-rail">
          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">
                <Target size={16} /> Path progress
              </h2>
              <Badge variant="teal">{prefs.level}</Badge>
            </div>
            <div className="ws-ring">
              <ProgressRing
                value={progress}
                size={108}
                stroke={9}
                label={`${completedCount}/${course.modules.length}`}
                sublabel="modules"
              />
              <div>
                <strong className="small">Steady progress</strong>
                <p className="tiny muted">
                  {isComplete ? 'This module is complete.' : 'Finish this module to unlock the next.'}
                </p>
              </div>
            </div>
            <div className="kv">
              <span>Estimated total</span>
              <strong>{course.totalMinutes} min</strong>
            </div>
            <div className="kv">
              <span>Notes & practice</span>
              <strong>{lessonNotes.length} notes · {practiceQuiz.length} questions</strong>
            </div>
          </section>

          <section className="card card--pad">
            <div className="card-head">
              <h2 className="card-title">Your teacher</h2>
              <span className="badge badge--sage">Live</span>
            </div>
            <div className="row" style={{ gap: 10 }}>
              <Avatar
                name={teacher.name}
                initials={teacher.initials}
                tint={teacher.tint}
                size={44}
                online
              />
              <div className="grow">
                <Link to={`/teachers/${teacher.id}`} className="strong small">
                  {teacher.name}
                </Link>
                <p className="tiny muted">{teacher.style}</p>
                <Rating value={teacher.rating} count={teacher.reviews} />
              </div>
            </div>
            <button
              type="button"
              className="btn btn--secondary btn--sm btn--block"
              style={{ marginTop: 14 }}
              onClick={() => notify('Doubt sent to Dr. Ananya Iyer. She usually replies in ~2 hours.', 'success')}
            >
              <MessageSquare size={14} /> Ask your teacher
            </button>
          </section>

          <section className="card card--sage ws-quick">
            <Sparkles size={17} />
            <div>
              <strong>Need it explained differently?</strong>
              <p className="tiny">
                Ask the AI tutor for a diagram, a simpler version, or a worked example.
              </p>
              <button
                type="button"
                className="chip"
                onClick={() => openTutor('Can you explain this with a diagram?')}
              >
                Explain with a diagram
              </button>
            </div>
          </section>

          <section className="card card--pad ws-resources">
            <h2 className="card-title">Module resources</h2>
            <div className="ws-resource">
              <FileText size={15} /> Notes <span>{lessonNotes.length}</span>
            </div>
            <div className="ws-resource">
              <ListChecks size={15} /> Practice questions <span>{practiceQuiz.length}</span>
            </div>
            <div className="ws-resource">
              <Play size={15} /> Video chapters <span>{lessonChapters.length}</span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
