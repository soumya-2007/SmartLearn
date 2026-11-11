import { useMemo, useState } from 'react'
import {
  ArrowRight,
  GraduationCap,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import { useRouter } from '../lib/router'
import { languageOptions, subjects, teachers } from '../data/content'
import { TeacherCard } from '../components/TeacherCard'
import { EmptyState } from '../components/ui'

const EXPERIENCE_OPTIONS = [
  { id: 'any', label: 'Any experience' },
  { id: '0-5', label: '0–5 years' },
  { id: '5-10', label: '5–10 years' },
  { id: '10+', label: '10+ years' },
]

const RATING_OPTIONS = [
  { id: '0', label: 'Any rating' },
  { id: '4.5', label: '4.5 and above' },
  { id: '4.8', label: '4.8 and above' },
]

const STYLE_OPTIONS = [
  'Visual & conceptual',
  'Step-by-step coaching',
  'Analogy-led & inquiry based',
  'Exam-first & rigorous',
  'Conversational & feedback-driven',
  'Practice-heavy & patient',
  'Diagram-led & conceptual',
  'Mechanism-first & structured',
  'Project-based & playful',
]

export default function Teachers() {
  const { navigate } = useRouter()
  const [query, setQuery] = useState('')
  const [subject, setSubject] = useState('all')
  const [experience, setExperience] = useState('any')
  const [rating, setRating] = useState('0')
  const [language, setLanguage] = useState('all')
  const [style, setStyle] = useState('all')
  const [sort, setSort] = useState('compatibility')

  const activeCount = [
    subject !== 'all',
    experience !== 'any',
    rating !== '0',
    language !== 'all',
    style !== 'all',
    query.trim().length > 0,
  ].filter(Boolean).length

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return teachers
      .filter((teacher) => {
        if (subject !== 'all' && !teacher.subjects.includes(subject)) return false
        if (experience === '0-5' && teacher.experience > 5) return false
        if (experience === '5-10' && (teacher.experience <= 5 || teacher.experience > 10))
          return false
        if (experience === '10+' && teacher.experience <= 10) return false
        if (rating !== '0' && teacher.rating < Number(rating)) return false
        if (language !== 'all' && !teacher.languages.includes(language)) return false
        if (style !== 'all' && teacher.style !== style) return false
        if (needle) {
          const haystack = [
            teacher.name,
            teacher.qualification,
            teacher.headline,
            teacher.style,
            ...teacher.subjects,
            ...teacher.topics,
          ]
            .join(' ')
            .toLowerCase()
          if (!needle.split(/\s+/).every((word) => haystack.includes(word))) return false
        }
        return true
      })
      .sort((a, b) => {
        if (sort === 'rating') return b.rating - a.rating
        if (sort === 'experience') return b.experience - a.experience
        if (sort === 'students') return b.students - a.students
        return b.compatibility - a.compatibility
      })
  }, [query, subject, experience, rating, language, style, sort])

  function clearAll() {
    setQuery('')
    setSubject('all')
    setExperience('any')
    setRating('0')
    setLanguage('all')
    setStyle('all')
    setSort('compatibility')
  }

  return (
    <div className="container page teach">
      <header className="page-head">
        <div>
          <span className="eyebrow">Teacher discovery</span>
          <h1 className="page-title">Find a teacher who teaches the way you learn.</h1>
          <p>
            Browse verified educators by subject, teaching style and language. Every
            profile is scored against your learning profile, not just their popularity.
          </p>
        </div>
        <span className="badge badge--teal">
          <Sparkles size={13} /> 480+ verified educators
        </span>
      </header>

      <section className="teach-stats card">
        <div className="teach-stat">
          <span className="tile-icon tile-icon--navy">
            <GraduationCap size={17} />
          </span>
          <div>
            <strong>480+</strong>
            <span>verified teachers</span>
          </div>
        </div>
        <div className="teach-stat">
          <span className="tile-icon tile-icon--gold">
            <Star size={17} />
          </span>
          <div>
            <strong>4.8 / 5</strong>
            <span>average rating</span>
          </div>
        </div>
        <div className="teach-stat">
          <span className="tile-icon">
            <Users size={17} />
          </span>
          <div>
            <strong>12,400</strong>
            <span>students learning</span>
          </div>
        </div>
        <div className="teach-stat">
          <span className="tile-icon tile-icon--navy">
            <TrendingUp size={17} />
          </span>
          <div>
            <strong>+17%</strong>
            <span>average score lift</span>
          </div>
        </div>
      </section>

      <section className="teach-insight">
        <span className="teach-insight__icon">
          <Sparkles size={18} />
        </span>
        <div>
          <strong>How AI compatibility works</strong>
          <p>
            We weigh subject depth, teaching style, language, class level and the
            specific concepts you struggle with. A 96% match means this teacher has
            repeatedly closed the exact gaps on your diagnostic.
          </p>
        </div>
        <button
          type="button"
          className="btn btn--secondary btn--sm"
          onClick={() => navigate('/assessment')}
        >
          Improve my match <ArrowRight size={14} />
        </button>
      </section>

      {/* Filter bar --------------------------------------------------- */}
      <section className="teach-filters card">
        <div className="teach-search input-icon">
          <Search size={17} />
          <label htmlFor="teacher-search" className="sr-only">
            Search teachers
          </label>
          <input
            id="teacher-search"
            className="input"
            placeholder="Search by name, subject or topic…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="teach-filters__selects">
          <label className="field">
            <span className="field-label">Subject</span>
            <select
              className="select"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              <option value="all">All subjects</option>
              {subjects.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Experience</span>
            <select
              className="select"
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
            >
              {EXPERIENCE_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
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
              {languageOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Teaching style</span>
            <select
              className="select"
              value={style}
              onChange={(event) => setStyle(event.target.value)}
            >
              <option value="all">Any style</option>
              {STYLE_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Rating</span>
            <select
              className="select"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            >
              {RATING_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <div className="results-bar teach-results-bar">
        <div className="results-bar__text">
          <h2>
            {results.length} teacher{results.length === 1 ? '' : 's'} match your filters
          </h2>
          <p className="tiny muted">
            Sorted by AI compatibility with your goals and weak topics.
          </p>
        </div>
        <div className="row wrap" style={{ gap: 10 }}>
          {activeCount ? (
            <button type="button" className="btn btn--ghost btn--sm" onClick={clearAll}>
              <X size={14} /> Clear filters ({activeCount})
            </button>
          ) : null}
          <label className="sort-field">
            <span className="tiny muted">Sort by</span>
            <select
              className="select select--sm"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="compatibility">Compatibility</option>
              <option value="rating">Rating</option>
              <option value="experience">Experience</option>
              <option value="students">Students taught</option>
            </select>
          </label>
        </div>
      </div>

      {results.length ? (
        <div className="teach-grid">
          {results.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No teachers match those filters"
          action={
            <button type="button" className="btn btn--primary btn--sm" onClick={clearAll}>
              Clear all filters
            </button>
          }
        >
          Try widening the experience range or choosing “Any language”. New teachers
          join every week.
        </EmptyState>
      )}

      <div className="teach-footnote">
        <p>
          Every teacher is interviewed, subject-tested and observed before joining.
          Ratings come only from verified students.
        </p>
      </div>
    </div>
  )
}
