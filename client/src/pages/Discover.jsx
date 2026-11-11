import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Clock,
  Compass,
  FileText,
  ListChecks,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Video,
  X,
} from 'lucide-react'
import { Link } from '../lib/router'
import {
  difficultyOptions,
  goalOptions,
  languageOptions,
  subjects,
  subjectsById,
  teachersById,
  topics,
} from '../data/content'
import { Avatar, Badge, Bar, EmptyState, ProgressRing, Rating, SubjectIcon, SubjectTile } from '../components/ui'

const CLASS_OPTIONS = ['Class 8', 'Class 9', 'Class 10', 'Class 11']
const TRY_TOPICS = ['Quadratic Equations', 'Chemical Bonding', 'Probability', 'Photosynthesis']

function scoreTopic(topic, filters) {
  const goalScore =
    filters.goal === 'all' ? 82 : topic.goals.includes(filters.goal) ? 100 : 58
  const languageScore =
    filters.language === 'all'
      ? 88
      : topic.languages.includes(filters.language)
        ? 100
        : 50
  const levelScore =
    filters.level === 'all' ? 85 : topic.level === filters.level ? 100 : 60

  const raw =
    topic.matchBase * 0.62 +
    goalScore * 0.16 +
    languageScore * 0.1 +
    levelScore * 0.12

  return Math.round(Math.min(99, raw))
}

export default function Discover() {
  const params = new URLSearchParams(window.location.search)
  const [query, setQuery] = useState(params.get('q') || '')
  const [subject, setSubject] = useState(params.get('subject') || 'all')
  const [classFilter, setClassFilter] = useState('all')
  const [level, setLevel] = useState('all')
  const [language, setLanguage] = useState('all')
  const [goal, setGoal] = useState('all')
  const [sort, setSort] = useState('match')
  const [suggestOpen, setSuggestOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const suggestions = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return []
    return topics
      .filter(
        (topic) =>
          topic.name.toLowerCase().includes(needle) ||
          topic.tags.some((tag) => tag.includes(needle)),
      )
      .slice(0, 5)
  }, [query])

  const activeFilters = [subject, classFilter, level, language, goal].filter(
    (value) => value !== 'all',
  ).length

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const filtered = topics
      .filter((topic) => {
        if (subject !== 'all' && topic.subjectId !== subject) return false
        if (classFilter !== 'all' && topic.classLevel !== classFilter) return false
        if (level !== 'all' && topic.level !== level) return false
        if (language !== 'all' && !topic.languages.includes(language)) return false
        if (goal !== 'all' && !topic.goals.includes(goal)) return false
        if (needle) {
          const haystack = [
            topic.name,
            topic.blurb,
            topic.classLevel,
            subjectsById[topic.subjectId].name,
            ...topic.tags,
          ]
            .join(' ')
            .toLowerCase()
          if (!needle.split(/\s+/).every((word) => haystack.includes(word))) return false
        }
        return true
      })
      .map((topic) => ({ ...topic, match: scoreTopic(topic, { goal, language, level }) }))

    return filtered.sort((a, b) => {
      if (sort === 'rating') {
        const aRating = Math.max(
          ...a.teacherIds.map((id) => teachersById[id].rating),
        )
        const bRating = Math.max(
          ...b.teacherIds.map((id) => teachersById[id].rating),
        )
        return bRating - aRating
      }
      if (sort === 'lessons') return b.lessons - a.lessons
      return b.match - a.match
    })
  }, [query, subject, classFilter, level, language, goal, sort])

  function resetFilters() {
    setSubject('all')
    setClassFilter('all')
    setLevel('all')
    setLanguage('all')
    setGoal('all')
    setQuery('')
    setSort('match')
  }

  return (
    <div className="container page disc">
      <header className="page-head">
        <div>
          <span className="eyebrow">Smart topic search</span>
          <h1 className="page-title">Find the exact help you need.</h1>
          <p>
            Search any topic, tell us how you learn, and we’ll rank teachers,
            lessons and resources by how well they fit you — not by who paid for
            placement.
          </p>
        </div>
        <span className="badge badge--teal">
          <Sparkles size={13} /> AI matching is on
        </span>
      </header>

      {/* Search panel ------------------------------------------------- */}
      <section className="disc-search card">
        <form
          className="disc-search__bar"
          onSubmit={(event) => {
            event.preventDefault()
            setSuggestOpen(false)
          }}
          role="search"
        >
          <div className="disc-search__input">
            <Search size={19} aria-hidden="true" />
            <label htmlFor="disc-topic" className="sr-only">
              Search a subject or topic
            </label>
            <input
              id="disc-topic"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setSuggestOpen(true)
              }}
              onFocus={() => setSuggestOpen(true)}
              onBlur={() => setSuggestOpen(false)}
              placeholder="Search a topic — quadratic equations, chemical bonding, probability…"
              autoComplete="off"
            />
            {query ? (
              <button
                type="button"
                className="disc-search__clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            ) : null}

            {suggestOpen && suggestions.length ? (
              <div className="suggest-list">
                <span className="suggest-list__label">Topics</span>
                {suggestions.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault()
                      setQuery(topic.name)
                      setSubject(topic.subjectId)
                      setSuggestOpen(false)
                    }}
                  >
                    <SubjectTile subjectId={topic.subjectId} size={30} />
                    <span>
                      <strong>{topic.name}</strong>
                      <small>
                        {subjectsById[topic.subjectId].name} · {topic.classLevel}
                      </small>
                    </span>
                    <ArrowRight size={14} />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <button type="submit" className="btn btn--primary btn--lg">
            Search topics
          </button>
        </form>

        <div className="disc-search__controls">
          <label className="field">
            <span className="field-label">Class / grade</span>
            <select
              className="select"
              value={classFilter}
              onChange={(event) => setClassFilter(event.target.value)}
            >
              <option value="all">All classes</option>
              {CLASS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Difficulty</span>
            <select
              className="select"
              value={level}
              onChange={(event) => setLevel(event.target.value)}
            >
              <option value="all">Any difficulty</option>
              {difficultyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Language</span>
            <select
              className="select"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option value="all">Any language</option>
              {languageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">I need help with</span>
            <select
              className="select"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            >
              <option value="all">Everything</option>
              {goalOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="disc-search__try">
          <span>Try:</span>
          {TRY_TOPICS.map((name) => (
            <button key={name} type="button" className="chip" onClick={() => setQuery(name)}>
              {name}
            </button>
          ))}
        </div>
      </section>

      <div className="disc-layout">
        {/* Filters --------------------------------------------------- */}
        <aside className={`disc-filters card ${filtersOpen ? 'is-open' : ''}`}>
          <div className="disc-filters__head">
            <strong>Refine results</strong>
            <button type="button" className="link-button" onClick={resetFilters}>
              Clear all
            </button>
          </div>

          <div className="filter-group">
            <span className="filter-group__label">Subject</span>
            <div className="filter-list">
              <button
                type="button"
                className={`filter-option ${subject === 'all' ? 'is-active' : ''}`}
                onClick={() => setSubject('all')}
              >
                <span className="filter-option__dot" />
                All subjects
                <em>{topics.length}</em>
              </button>
              {subjects.map((item) => {
                const count = topics.filter((topic) => topic.subjectId === item.id).length
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`filter-option ${subject === item.id ? 'is-active' : ''}`}
                    onClick={() => setSubject(item.id)}
                  >
                    <SubjectIcon subjectId={item.id} size={15} />
                    {item.name}
                    <em>{count}</em>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-group__label">Difficulty</span>
            <div className="chip-row">
              <button
                type="button"
                className={`chip ${level === 'all' ? 'is-active' : ''}`}
                onClick={() => setLevel('all')}
              >
                Any
              </button>
              {difficultyOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`chip ${level === item ? 'is-active' : ''}`}
                  onClick={() => setLevel(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-group__label">Learning goal</span>
            <div className="chip-row">
              <button
                type="button"
                className={`chip ${goal === 'all' ? 'is-active' : ''}`}
                onClick={() => setGoal('all')}
              >
                Any
              </button>
              {goalOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`chip ${goal === item.id ? 'is-active' : ''}`}
                  onClick={() => setGoal(item.id)}
                >
                  {item.short}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-group__label">Language</span>
            <div className="chip-row">
              <button
                type="button"
                className={`chip ${language === 'all' ? 'is-active' : ''}`}
                onClick={() => setLanguage('all')}
              >
                Any
              </button>
              {languageOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`chip ${language === item ? 'is-active' : ''}`}
                  onClick={() => setLanguage(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-profile">
            <span className="filter-profile__label">Matching against</span>
            <div className="row" style={{ gap: 8 }}>
              <Avatar name="Aarav Mehta" initials="AM" size={30} />
              <div>
                <strong className="small">Aarav · Class 10</strong>
                <p className="tiny muted">English · Intermediate</p>
              </div>
            </div>
            <Link to="/profile" className="text-link" style={{ marginTop: 10 }}>
              Adjust preferences <ArrowRight size={13} />
            </Link>
          </div>
        </aside>

        {/* Results -------------------------------------------------- */}
        <section className="disc-results">
          <div className="results-bar">
            <div className="results-bar__text">
              <div className="row wrap" style={{ gap: 10 }}>
                <button
                  type="button"
                  className="btn btn--secondary btn--sm disc-filter-toggle"
                  onClick={() => setFiltersOpen((open) => !open)}
                  aria-expanded={filtersOpen}
                >
                  <SlidersHorizontal size={15} />
                  Filters
                  {activeFilters ? <span className="count-dot">{activeFilters}</span> : null}
                </button>
                <h2>
                  {results.length} topic{results.length === 1 ? '' : 's'}
                  {query.trim() ? <> for “{query.trim()}”</> : ' matched to you'}
                </h2>
              </div>
              <p className="tiny muted">
                Ranked by AI match with your level, language and learning goal.
              </p>
            </div>
            <label className="sort-field">
              <span className="tiny muted">Sort by</span>
              <select
                className="select select--sm"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="match">Best match</option>
                <option value="rating">Teacher rating</option>
                <option value="lessons">Most lessons</option>
              </select>
            </label>
          </div>

          {!query.trim() ? (
            <div className="disc-insight">
              <Sparkles size={16} />
              <p>
                <strong>Personalised for your gaps:</strong> algebra factorisation and
                bonding diagrams are your two lowest mastery areas. The topics below
                are ordered to fix those first.
              </p>
            </div>
          ) : null}

          {results.length ? (
            <div className="results-list">
              {results.map((topic, index) => {
                const subjectMeta = subjectsById[topic.subjectId]
                return (
                  <article
                    className="topic-card card card--hover rise"
                    key={topic.id}
                    style={{ '--delay': `${Math.min(index, 5) * 50}ms` }}
                  >
                    <div className="topic-card__head">
                      <SubjectTile subjectId={topic.subjectId} size={46} />
                      <div className="grow">
                        <div className="row wrap" style={{ gap: 8 }}>
                          <h3>{topic.name}</h3>
                          <Badge variant="sage">{topic.classLevel}</Badge>
                          <Badge variant="outline">{topic.level}</Badge>
                          {topic.featured ? (
                            <Badge variant="gold" icon={Sparkles}>
                              Recommended
                            </Badge>
                          ) : null}
                        </div>
                        <p className="tiny muted">
                          {subjectMeta.name} · {topic.lessons} lessons · {topic.hours}h of guided study
                        </p>
                      </div>
                      <div className="match-block">
                        <ProgressRing
                          value={topic.match}
                          size={62}
                          stroke={6}
                          label={`${topic.match}%`}
                          sublabel="match"
                        />
                      </div>
                    </div>

                    <p className="topic-card__blurb">{topic.blurb}</p>

                    <div className="topic-why">
                      <Sparkles size={14} />
                      <p>{topic.why}</p>
                    </div>

                    <div className="topic-teachers">
                      <span className="topic-teachers__label">Recommended teachers</span>
                      {topic.teacherIds.map((id) => {
                        const teacher = teachersById[id]
                        return (
                          <div className="mini-teacher" key={id}>
                            <Avatar
                              name={teacher.name}
                              initials={teacher.initials}
                              tint={teacher.tint}
                              size={34}
                              online
                            />
                            <div className="grow">
                              <Link to={`/teachers/${teacher.id}`} className="mini-teacher__name">
                                {teacher.name}
                              </Link>
                              <p className="tiny muted">
                                {teacher.style} · {teacher.experience} yrs
                              </p>
                            </div>
                            <Rating value={teacher.rating} count={teacher.reviews} />
                          </div>
                        )
                      })}
                    </div>

                    <div className="topic-resources">
                      <span>
                        <Video size={14} /> {topic.videos} video lessons
                      </span>
                      <span>
                        <FileText size={14} /> {topic.notes} note sets
                      </span>
                      <span>
                        <ListChecks size={14} /> {topic.quizzes} quizzes
                      </span>
                      <span>
                        <Clock size={14} /> {topic.hours}h path
                      </span>
                      <span className="topic-resources__langs">
                        {topic.languages.slice(0, 2).join(' · ')}
                      </span>
                    </div>

                    <div className="topic-card__foot">
                      <div className="topic-mastery">
                        <span className="tiny muted">Your mastery</span>
                        <div className="row" style={{ gap: 8 }}>
                          <Bar
                            value={topic.mastery}
                            size="sm"
                            tone={topic.mastery < 50 ? 'danger' : 'teal'}
                          />
                          <strong className="tiny">{topic.mastery}%</strong>
                        </div>
                      </div>
                      <div className="row wrap">
                        <Link to="/teachers" className="btn btn--secondary btn--sm">
                          View teachers
                        </Link>
                        <Link to="/learning" className="btn btn--primary btn--sm">
                          Start learning <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <EmptyState
              icon={Compass}
              title="No topics match those filters yet"
              action={
                <button type="button" className="btn btn--primary btn--sm" onClick={resetFilters}>
                  Reset search
                </button>
              }
            >
              Try a broader keyword, or remove your class and difficulty filters. You
              can always ask the AI for a custom learning path.
            </EmptyState>
          )}

          <div className="disc-footer-note">
            <Star size={15} />
            <p>
              Match scores are computed from your profile, not sponsored. Teachers
              cannot pay to rank higher.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
