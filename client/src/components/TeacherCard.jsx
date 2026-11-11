import { Bookmark, BookmarkCheck, BadgeCheck, Star } from 'lucide-react'
import { Link } from '../lib/router'
import { useStore } from '../lib/store'
import { Avatar, Rating } from './ui'

export function TeacherCard({ teacher }) {
  const { savedTeachers, toggleSavedTeacher } = useStore()
  const saved = savedTeachers.includes(teacher.id)

  return (
    <article className="teacher-card card card--hover">
      <div className="teacher-card__head">
        <Avatar
          name={teacher.name}
          initials={teacher.initials}
          tint={teacher.tint}
          size={58}
          online
        />
        <div className="grow">
          <div className="row wrap" style={{ gap: 7 }}>
            <h3>{teacher.name}</h3>
            {teacher.verified ? (
              <BadgeCheck size={16} className="verified-icon" aria-label="Verified teacher" />
            ) : null}
          </div>
          <p className="tiny muted">{teacher.qualification}</p>
          <div className="row" style={{ marginTop: 5, gap: 8 }}>
            <Rating value={teacher.rating} count={teacher.reviews} />
            <span className="tiny muted">· {teacher.experience} yrs experience</span>
          </div>
        </div>
        <button
          type="button"
          className={`save-btn ${saved ? 'is-saved' : ''}`}
          onClick={() => toggleSavedTeacher(teacher.id)}
          aria-pressed={saved}
          aria-label={saved ? 'Remove from shortlist' : 'Save teacher to shortlist'}
          title={saved ? 'Saved to shortlist' : 'Save to shortlist'}
        >
          {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
        </button>
      </div>

      <p className="teacher-card__headline">{teacher.headline}</p>

      <div className="chip-row">
        {teacher.topics.slice(0, 3).map((topic) => (
          <span className="tag" key={topic}>
            {topic}
          </span>
        ))}
        {teacher.topics.length > 3 ? (
          <span className="tag tag--more">+{teacher.topics.length - 3}</span>
        ) : null}
      </div>

      <div className="teacher-card__details">
        <div>
          <span>Teaching style</span>
          <strong>{teacher.style}</strong>
        </div>
        <div>
          <span>Languages</span>
          <strong>{teacher.languages.join(', ')}</strong>
        </div>
        <div>
          <span>Levels</span>
          <strong>{teacher.levels.join(' · ')}</strong>
        </div>
      </div>

      <div className="teacher-card__match">
        <div className="compat-score">
          <Star size={12} />
          {teacher.compatibility}%
        </div>
        <div className="grow">
          <strong>Strong fit for your learning profile</strong>
          <p>Visual explanations · Class 10 · English · concept-first</p>
        </div>
      </div>

      <div className="teacher-card__actions">
        <Link to={`/teachers/${teacher.id}`} className="btn btn--secondary btn--sm">
          View profile
        </Link>
        <Link to="/learning" className="btn btn--primary btn--sm">
          Start learning
        </Link>
      </div>
    </article>
  )
}

export function TeacherMini({ teacher, note = 'Recommended for your weak topics' }) {
  return (
    <article className="teacher-mini">
      <Avatar
        name={teacher.name}
        initials={teacher.initials}
        tint={teacher.tint}
        size={40}
        online
      />
      <div className="grow">
        <Link to={`/teachers/${teacher.id}`} className="teacher-mini__name">
          {teacher.name}
        </Link>
        <p className="tiny muted">
          {teacher.style} · {teacher.experience} yrs
        </p>
        <div className="row" style={{ gap: 6, marginTop: 3 }}>
          <Rating value={teacher.rating} />
          <span className="badge badge--teal" style={{ fontSize: 10 }}>
            {teacher.compatibility}% match
          </span>
        </div>
        <p className="teacher-mini__note">{note}</p>
      </div>
    </article>
  )
}
