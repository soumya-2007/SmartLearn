import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Flame,
  GraduationCap,
  Play,
  Search,
  Send,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Link, useRouter } from '../lib/router'
import { subjects, teachers, teachersById, topics } from '../data/content'
import {
  Avatar,
  Bar,
  Logo,
  Rating,
  SectionHead,
  Stars,
} from '../components/ui'

const journey = [
  {
    number: '01',
    icon: Compass,
    title: 'Discover',
    text: 'Find the best teachers and resources for any topic — filtered by your class, language and goal.',
    meta: '1,200+ topics mapped',
    link: '/discover',
    linkLabel: 'Explore topics',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Personalize',
    text: 'Get recommendations based on your learning needs, pace and the concepts you find hardest.',
    meta: 'Adapts after every quiz',
    link: '/assessment',
    linkLabel: 'Take the assessment',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Improve',
    text: 'Track progress, strengthen weak concepts with targeted practice, and see your growth weekly.',
    meta: 'Weekly progress reports',
    link: '/progress',
    linkLabel: 'See progress',
  },
]

const featuredTeachers = ['ananya-iyer', 'meera-nair', 'priya-deshpande']
const popularSearches = ['Quadratic Equations', 'Chemical Bonding', 'Trigonometry', 'Probability']

export default function Landing({ onOpenAuth }) {
  const { navigate } = useRouter()

  function search(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const query = String(data.get('topic') || '').trim()
    const subject = String(data.get('subject') || '')
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (subject) params.set('subject', subject)
    navigate(`/discover${params.toString() ? `?${params}` : ''}`)
  }

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="land-hero pattern">
        <div className="container land-hero__grid">
          <div className="land-hero__copy">
            <span className="hero-eyebrow rise">
              <span className="hero-eyebrow__dot" />
              AI-powered learning · Classes 6–12
            </span>

            <h1 className="display hero-title rise" style={{ '--delay': '60ms' }}>
              Learn smarter. Grow faster.
              <span className="hero-title__accent">
                Your learning journey, personalized.
              </span>
            </h1>

            <p className="hero-lede rise" style={{ '--delay': '120ms' }}>
              Find the right teachers, discover the best learning resources, and
              master every topic at your own pace with AI-powered personalized
              learning.
            </p>

            <form className="hero-search rise" onSubmit={search} style={{ '--delay': '180ms' }}>
              <Search size={19} aria-hidden="true" />
              <label htmlFor="hero-topic" className="sr-only">
                What topic do you want to master today?
              </label>
              <input
                id="hero-topic"
                name="topic"
                placeholder="What topic do you want to master today?"
                autoComplete="off"
              />
              <select
                name="subject"
                className="hero-search__select"
                aria-label="Subject"
                defaultValue=""
              >
                <option value="">All subjects</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn btn--primary">
                Find my path
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="hero-suggest rise" style={{ '--delay': '220ms' }}>
              <span>Popular:</span>
              {topics
                .filter((topic) => topic.featured)
                .slice(0, 4)
                .map((topic) => (
                  <Link key={topic.id} to={`/discover?q=${encodeURIComponent(topic.name)}`}>
                    {topic.name}
                  </Link>
                ))}
            </div>

            <div className="hero-cta rise" style={{ '--delay': '260ms' }}>
              <Link to="/dashboard" className="btn btn--primary btn--lg">
                Start Learning
                <ArrowRight size={17} />
              </Link>
              <Link to="/teachers" className="btn btn--secondary btn--lg">
                Explore Teachers
              </Link>
            </div>

            <div className="hero-trust rise" style={{ '--delay': '320ms' }}>
              <div className="trust-avatars">
                {teachers.slice(0, 3).map((teacher) => (
                  <Avatar
                    key={teacher.id}
                    name={teacher.name}
                    initials={teacher.initials}
                    tint={teacher.tint}
                    size={34}
                  />
                ))}
                <span className="trust-avatars__more">12k+</span>
              </div>
              <div>
                <div className="row" style={{ gap: 6 }}>
                  <Stars value={5} size={12} />
                  <strong className="tiny">4.9 / 5</strong>
                </div>
                <p className="tiny muted">from 3,400+ student reviews</p>
              </div>
              <span className="hero-trust__sep" />
              <div className="hero-trust__stat">
                <strong>480+</strong>
                <span>verified educators</span>
              </div>
            </div>
          </div>

          <div className="land-hero__visual rise" style={{ '--delay': '160ms' }}>
            <div className="hero-visual">
              <div className="hv-orbit" aria-hidden="true" />
              <div className="hv-orbit hv-orbit--two" aria-hidden="true" />

              <div className="hv-main card">
                <div className="hv-main__top">
                  <span className="badge badge--teal">
                    <Sparkles /> Focus session
                  </span>
                  <span className="hv-live">
                    <i /> AI adapted
                  </span>
                </div>

                <div className="hv-topic">Quadratic Equations</div>
                <p className="tiny muted">Lesson 4 · The quadratic formula</p>

                <div className="hv-plot-wrap">
                  <svg viewBox="0 0 300 130" className="hv-plot" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((line) => (
                      <line
                        key={line}
                        x1="16"
                        x2="288"
                        y1={20 + line * 22}
                        y2={20 + line * 22}
                        stroke="#E9EFEB"
                        strokeWidth="1"
                      />
                    ))}
                    <line x1="16" y1="112" x2="288" y2="112" stroke="#D9E5DF" />
                    <line x1="32" y1="8" x2="32" y2="118" stroke="#D9E5DF" />
                    <path
                      d="M34 104 Q160 -18 282 104"
                      fill="none"
                      stroke="var(--teal)"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                    />
                    <circle cx="160" cy="43" r="4.5" fill="#fff" stroke="var(--teal)" strokeWidth="2.4" />
                    <line
                      x1="160"
                      y1="48"
                      x2="160"
                      y2="112"
                      stroke="var(--teal)"
                      strokeDasharray="3 4"
                      opacity="0.5"
                    />
                    <text x="169" y="38" fontSize="9" fill="#7A8C9A" fontFamily="Inter, sans-serif">
                      vertex
                    </text>
                    <text x="46" y="124" fontSize="9" fill="#7A8C9A" fontFamily="Inter, sans-serif">
                      roots
                    </text>
                  </svg>
                </div>

                <div className="hv-progress">
                  <div className="bar-meta">
                    <span>Concept mastery</span>
                    <strong>68%</strong>
                  </div>
                  <Bar value={68} />
                </div>

                <div className="hv-foot">
                  <div className="row" style={{ gap: 9 }}>
                    <Avatar
                      name="Dr. Ananya Iyer"
                      initials="AI"
                      tint={['#DDEBE4', '#2C7264']}
                      size={32}
                      online
                    />
                    <div className="hv-foot__meta">
                      <strong>Dr. Ananya Iyer</strong>
                      <span>Algebra specialist · 4.9</span>
                    </div>
                  </div>
                  <button type="button" className="hv-play" aria-label="Play lesson preview">
                    <Play size={15} />
                  </button>
                </div>
              </div>

              <div className="hv-card hv-ai">
                <span className="tile-icon">
                  <Sparkles size={17} />
                </span>
                <div>
                  <strong>AI insight</strong>
                  <p>You solve 2× faster with diagrams. Start visual, then check with the formula.</p>
                </div>
              </div>

              <div className="hv-card hv-teacher">
                <Avatar
                  name="Meera Nair"
                  initials="MN"
                  tint={['#F1EADB', '#8A6A2F']}
                  size={38}
                />
                <div>
                  <strong>96% match</strong>
                  <span>Dr. Ananya Iyer</span>
                  <Stars value={5} size={11} />
                </div>
              </div>

              <div className="hv-card hv-streak">
                <Flame size={17} />
                <div>
                  <strong>12 days</strong>
                  <span>Learning streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="hero-facts">
            <span>
              <GraduationCap size={16} /> Built for CBSE, ICSE & state boards
            </span>
            <span>
              <Users size={16} /> 1:1 tutoring & guided self-study
            </span>
            <span>
              <Target size={16} /> Diagnostic-led remediation
            </span>
            <span>
              <Star size={16} /> Free to start, no card needed
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Journey                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="How SmartLearn works"
            title="Your learning journey starts here"
            lead="Three calm, deliberate steps — from finding the right help to seeing measurable improvement."
            action={
              <Link to="/discover" className="text-link">
                Browse all topics <ArrowRight size={15} />
              </Link>
            }
          />

          <div className="grid grid-3 journey-grid">
            {journey.map((item, index) => {
              const Icon = item.icon
              return (
                <article
                  className="journey-card card card--hover rise"
                  key={item.title}
                  style={{ '--delay': `${index * 80}ms` }}
                >
                  <div className="journey-card__top">
                    <span className="journey-card__icon">
                      <Icon size={21} />
                    </span>
                    <span className="journey-card__num">{item.number}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className="journey-card__foot">
                    <span>{item.meta}</span>
                    <Link to={item.link} className="journey-card__link">
                      {item.linkLabel} <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="subject-strip">
            <span className="subject-strip__label">Popular right now</span>
            <div className="chip-row">
              {popularSearches.map((name) => (
                <Link key={name} to={`/discover?q=${encodeURIComponent(name)}`} className="chip">
                  {name}
                </Link>
              ))}
              <Link to="/discover" className="chip">
                All 12 topics <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Featured teachers                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="section land-teachers">
        <div className="container">
          <SectionHead
            eyebrow="Teacher discovery"
            title="Educators your learning style will thank you for"
            lead="Every teacher is matched on subject depth, teaching style, language and how well they explain the concepts you find hardest."
            action={
              <Link to="/teachers" className="btn btn--secondary btn--sm">
                Explore all teachers <ArrowRight size={15} />
              </Link>
            }
          />

          <div className="grid grid-3">
            {featuredTeachers.map((id, index) => {
              const teacher = teachersById[id]
              return (
                <article
                  className="feature-teacher card card--hover rise"
                  key={id}
                  style={{ '--delay': `${index * 70}ms` }}
                >
                  <div className="between">
                    <Avatar
                      name={teacher.name}
                      initials={teacher.initials}
                      tint={teacher.tint}
                      size={54}
                    />
                    <span className="badge badge--teal">
                      <Sparkles /> {teacher.compatibility}% match
                    </span>
                  </div>
                  <h3>{teacher.name}</h3>
                  <p className="tiny muted">{teacher.qualification}</p>
                  <div className="row" style={{ marginTop: 8 }}>
                    <Rating value={teacher.rating} count={teacher.reviews} />
                    <span className="tiny muted">· {teacher.experience} yrs</span>
                  </div>
                  <p className="feature-teacher__headline">{teacher.headline}</p>
                  <div className="chip-row">
                    {teacher.topics.slice(0, 2).map((topic) => (
                      <span className="tag" key={topic}>
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="feature-teacher__foot">
                    <span className="tiny muted">
                      <Check size={13} /> {teacher.response}
                    </span>
                    <Link to={`/teachers/${teacher.id}`} className="text-link">
                      View profile <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* AI split                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div className="land-ai card">
            <div className="land-ai__copy">
              <span className="eyebrow">Your AI learning companion</span>
              <h2 className="section-title">An AI tutor that knows exactly where you’re stuck.</h2>
              <p className="section-lead">
                SmartLearn reads your quiz attempts, notes and pace to build a
                diagnosis — not a generic playlist. Then it explains the gap in the
                way you learn best.
              </p>
              <ul className="ai-features">
                <li>
                  <span className="ai-features__icon">
                    <Target size={16} />
                  </span>
                  <div>
                    <strong>Pinpoints the gap, not just the subject</strong>
                    <p>“Sign error in the discriminant” beats “revise algebra”.</p>
                  </div>
                </li>
                <li>
                  <span className="ai-features__icon">
                    <Sparkles size={16} />
                  </span>
                  <div>
                    <strong>Explains at your level, every time</strong>
                    <p>Diagrams for visual learners, worked steps for practice-led learners.</p>
                  </div>
                </li>
                <li>
                  <span className="ai-features__icon">
                    <TrendingUp size={16} />
                  </span>
                  <div>
                    <strong>Re-plans your week as you improve</strong>
                    <p>Mastery above 85% retires a topic and frees time for the next one.</p>
                  </div>
                </li>
              </ul>
              <div className="row" style={{ marginTop: 24 }}>
                <Link to="/assessment" className="btn btn--primary">
                  Take a diagnostic <ArrowRight size={16} />
                </Link>
                <Link to="/learning" className="btn btn--ghost">
                  See a learning path
                </Link>
              </div>
            </div>

            <div className="land-ai__visual">
              <div className="chat-card card">
                <div className="chat-head">
                  <div className="row" style={{ gap: 9 }}>
                    <span className="chat-avatar">
                      <Sparkles size={15} />
                    </span>
                    <div>
                      <strong>SmartLearn AI</strong>
                      <span className="tiny muted">Concept coach · always on</span>
                    </div>
                  </div>
                  <span className="badge badge--sage">Personalized</span>
                </div>
                <div className="chat-body">
                  <div className="chat-bubble chat-bubble--user">
                    I keep losing marks on discriminant questions. Why?
                  </div>
                  <div className="chat-bubble chat-bubble--ai">
                    <p>
                      Looking at your last 8 attempts, the sign of <em>b</em> is the
                      culprit — 3 of your 4 errors came from writing −b as positive when
                      b was already negative.
                    </p>
                  </div>
                  <div className="chat-step">
                    <span>Try this</span>
                    <code>D = (−7)² − 4(1)(6) = 49 − 24 = 25</code>
                    <small>Write b in brackets before squaring. Always.</small>
                  </div>
                  <div className="chat-bubble chat-bubble--ai chat-bubble--short">
                    <p>Want two similar questions, or a diagram of what D tells you?</p>
                  </div>
                </div>
                <div className="chat-input">
                  <span>Ask a follow-up…</span>
                  <span className="chat-send">
                    <Send size={15} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CTA                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="container">
        <div className="land-cta">
          <div className="land-cta__shape" aria-hidden="true" />
          <div className="land-cta__copy">
            <span className="eyebrow">Ready when you are</span>
            <h2>Your next breakthrough is one topic away.</h2>
            <p>
              Start with a free diagnostic, meet a teacher matched to how you learn,
              and follow a plan that changes as you do.
            </p>
          </div>
          <div className="land-cta__actions">
            <button
              type="button"
              className="btn btn--gold btn--lg"
              onClick={() => onOpenAuth('signup')}
            >
              Start Learning <ArrowRight size={17} />
            </button>
            <Link to="/teachers" className="btn btn--cta-outline btn--lg">
              Explore Teachers
            </Link>
          </div>
          <div className="land-cta__foot">
            <span>
              <Check size={14} /> Free diagnostic
            </span>
            <span>
              <Check size={14} /> No card required
            </span>
            <span>
              <Check size={14} /> Cancel anytime
            </span>
            <Logo inverse className="land-cta__logo" />
          </div>
        </div>
      </section>
    </>
  )
}
