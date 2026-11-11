import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  Check,
  Clock,
  GraduationCap,
  MessageSquare,
  Sparkles,
  Users,
} from 'lucide-react'
import { Link } from '../lib/router'
import { useStore } from '../lib/store'
import { teachers, teachersById } from '../data/content'
import { TeacherMini } from '../components/TeacherCard'
import {
  Avatar,
  Badge,
  Bar,
  EmptyState,
  ProgressRing,
  Rating,
  Stars,
} from '../components/ui'

const RATING_BREAKDOWN = [
  { stars: 5, percent: 82 },
  { stars: 4, percent: 13 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
]

export default function TeacherProfile({ id }) {
  const teacher = teachersById[id]
  const { savedTeachers, toggleSavedTeacher, notify } = useStore()

  if (!teacher) {
    return (
      <div className="container page">
        <EmptyState
          icon={GraduationCap}
          title="Teacher not found"
          action={
            <Link to="/teachers" className="btn btn--primary btn--sm">
              Browse all teachers
            </Link>
          }
        >
          This profile may have moved. Explore the marketplace to find another
          educator.
        </EmptyState>
      </div>
    )
  }

  const saved = savedTeachers.includes(teacher.id)
  const similar = teachers
    .filter(
      (item) =>
        item.id !== teacher.id &&
        item.subjects.some((subject) => teacher.subjects.includes(subject)),
    )
    .slice(0, 2)

  return (
    <div className="container page tp">
      <Link to="/teachers" className="tp-back">
        <ArrowLeft size={15} /> All teachers
      </Link>

      <div className="tp-layout">
        <div className="stack" style={{ gap: 20 }}>
          <section className="card tp-hero">
            <div className="tp-hero__main">
              <Avatar
                name={teacher.name}
                initials={teacher.initials}
                tint={teacher.tint}
                size={88}
                online
              />
              <div className="grow">
                <div className="row wrap" style={{ gap: 8 }}>
                  <h1>{teacher.name}</h1>
                  {teacher.verified ? (
                    <span className="badge badge--teal">
                      <BadgeCheck size={13} /> Verified
                    </span>
                  ) : null}
                  <span className="badge badge--gold">
                    <Sparkles size={12} /> {teacher.compatibility}% match
                  </span>
                </div>
                <p className="tp-hero__qual">{teacher.qualification}</p>
                <p className="tp-hero__headline">{teacher.headline}</p>
                <div className="row wrap" style={{ gap: 14, marginTop: 12 }}>
                  <Rating value={teacher.rating} count={`${teacher.reviews} reviews`} />
                  <span className="tiny muted">·</span>
                  <span className="tiny muted">{teacher.experience} years teaching</span>
                  <span className="tiny muted">·</span>
                  <span className="tiny muted">{teacher.response}</span>
                </div>
                <div className="chip-row" style={{ marginTop: 14 }}>
                  {teacher.subjects.map((subject) => (
                    <span className="tag tag--strong" key={subject}>
                      {subject}
                    </span>
                  ))}
                  {teacher.levels.map((level) => (
                    <span className="tag" key={level}>
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="tp-hero__actions">
              <Link to="/learning" className="btn btn--primary">
                Start learning <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => notify(`Message sent to ${teacher.name.split(' ')[0]} — replies usually arrive within ${teacher.response.replace('Replies in ', '')}.`, 'success')}
              >
                <MessageSquare size={16} /> Message
              </button>
              <button
                type="button"
                className={`btn btn--secondary ${saved ? 'is-saved' : ''}`}
                onClick={() => toggleSavedTeacher(teacher.id)}
                aria-pressed={saved}
              >
                {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>

            <div className="tp-hero__stats">
              <div>
                <strong>{teacher.students}</strong>
                <span>students taught</span>
              </div>
              <div>
                <strong>{teacher.lessons.toLocaleString()}</strong>
                <span>lessons delivered</span>
              </div>
              <div>
                <strong>{teacher.experience} yrs</strong>
                <span>teaching experience</span>
              </div>
              <div>
                <strong>{teacher.languages.length}</strong>
                <span>languages</span>
              </div>
            </div>
          </section>

          <section className="card card--pad">
            <h2 className="tp-section-title">About {teacher.name.split(' ')[0]}</h2>
            <p className="tp-body">{teacher.bio}</p>
            <div className="tp-subjects">
              <span className="filter-group__label">Specialised topics</span>
              <div className="chip-row">
                {teacher.topics.map((topic) => (
                  <span className="tag" key={topic}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="card card--pad">
            <h2 className="tp-section-title">Teaching approach</h2>
            <p className="tp-body">{teacher.approach}</p>
            <div className="tp-highlights">
              {teacher.highlights.map((highlight) => (
                <div key={highlight}>
                  <span className="tp-highlights__check">
                    <Check size={12} />
                  </span>
                  {highlight}
                </div>
              ))}
            </div>
          </section>

          <section className="card card--pad">
            <div className="card-head">
              <h2 className="tp-section-title" style={{ margin: 0 }}>
                Student reviews
              </h2>
              <span className="badge badge--sage">{teacher.reviews} verified</span>
            </div>

            <div className="tp-reviews">
              <div className="tp-reviews__summary">
                <div className="tp-reviews__score">
                  {teacher.rating}
                  <span>/ 5</span>
                </div>
                <Stars value={Math.round(teacher.rating)} size={16} />
                <p className="tiny muted">Based on {teacher.reviews} reviews</p>
              </div>
              <div className="tp-reviews__breakdown">
                {RATING_BREAKDOWN.map((row) => (
                  <div className="tp-reviews__row" key={row.stars}>
                    <span>{row.stars}</span>
                    <Bar value={row.percent} size="sm" tone="gold" />
                    <em>{row.percent}%</em>
                  </div>
                ))}
              </div>
            </div>

            <div className="review-list">
              {teacher.testimonials.map((review) => (
                <article className="review" key={review.name}>
                  <div className="between">
                    <div className="row" style={{ gap: 10 }}>
                      <Avatar name={review.name} size={34} tint={['#E9F1EC', '#4a7a68']} />
                      <div>
                        <strong className="small">{review.name}</strong>
                        <p className="tiny muted">{review.grade}</p>
                      </div>
                    </div>
                    <div className="row" style={{ gap: 8 }}>
                      <Stars value={Math.round(review.rating)} size={12} />
                      <span className="tiny muted">{review.when}</span>
                    </div>
                  </div>
                  <p className="review__text">{review.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="card card--pad">
            <div className="card-head">
              <h2 className="tp-section-title" style={{ margin: 0 }}>
                Availability this week
              </h2>
              <span className="badge badge--teal">
                <CalendarDays size={12} /> 3 slots left
              </span>
            </div>
            <div className="tp-availability">
              {teacher.availability.map((day) => (
                <div className="tp-slot" key={day.day}>
                  <span>{day.day}</span>
                  <div className="chip-row">
                    {day.slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className="chip"
                        onClick={() =>
                          notify(`Hold placed for ${day.day}, ${slot}. Confirm in your learning plan.`, 'success')
                        }
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="tiny muted" style={{ marginTop: 14 }}>
              <Clock size={12} /> All times are in IST. Free rescheduling up to 4 hours
              before a session.
            </p>
          </section>

          {similar.length ? (
            <section className="card card--pad">
              <h2 className="tp-section-title">Similar teachers</h2>
              <div className="grid grid-2" style={{ gap: 14 }}>
                {similar.map((item) => (
                  <TeacherMini key={item.id} teacher={item} note={item.style} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {/* Sidebar ---------------------------------------------------- */}
        <aside className="stack tp-sidebar">
          <section className="card card--pad tp-summary">
            <div className="between">
              <span className="filter-group__label">AI compatibility</span>
              <Badge variant="teal">Top 4%</Badge>
            </div>
            <div className="tp-summary__score">
              <ProgressRing
                value={teacher.compatibility}
                size={112}
                stroke={9}
                label={`${teacher.compatibility}%`}
                sublabel="match"
              />
              <div>
                <strong>Strong fit</strong>
                <p className="tiny muted">for your algebra gaps</p>
              </div>
            </div>
            <ul className="tp-summary__reasons">
              <li>
                <Check size={13} /> Explains factorisation visually — your preferred style
              </li>
              <li>
                <Check size={13} /> Teaches Class 10 CBSE in English
              </li>
              <li>
                <Check size={13} /> 96% of similar students improved within 4 weeks
              </li>
            </ul>
            <div className="tp-summary__price">
              <div>
                <span className="tiny muted">1:1 session</span>
                <strong>₹650 <small>/ 45 min</small></strong>
              </div>
              <span className="badge badge--gold">First session free</span>
            </div>
            <Link
              to="/learning"
              className="btn btn--primary btn--block btn--lg"
              style={{ marginTop: 14 }}
            >
              Start learning <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              className="btn btn--secondary btn--block"
              style={{ marginTop: 8 }}
              onClick={() =>
                notify(`Availability for ${teacher.name.split(' ')[0]} sent to your inbox.`, 'success')
              }
            >
              Request a different time
            </button>
            <p className="tiny muted center" style={{ marginTop: 10 }}>
              Free cancellation up to 4 hours before
            </p>
          </section>

          <section className="card card--pad tp-quote">
            <Users size={18} />
            <p>“{teacher.testimonials[0]?.text}”</p>
            <span className="tiny muted">— {teacher.testimonials[0]?.name}</span>
          </section>

          <section className="card card--sage tp-side-note">
            <Sparkles size={17} />
            <div>
              <strong>Not sure yet?</strong>
              <p>
                Take the 8-minute diagnostic and we’ll tell you whether{' '}
                {teacher.name.split(' ')[0]} is the right fit for your gaps.
              </p>
              <Link to="/assessment" className="text-link">
                Start diagnostic <ArrowRight size={13} />
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
