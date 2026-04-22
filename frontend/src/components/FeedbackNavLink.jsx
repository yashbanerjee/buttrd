import { Link, useLocation } from 'react-router-dom'

const PATHS_WITH_FEEDBACK = ['/', '/catering', '/our-story']

export function FeedbackNavLink({ onNavigate, className, activeClassName = 'active', children = 'FEEDBACK' }) {
  const location = useLocation()
  const onFeedbackPage = PATHS_WITH_FEEDBACK.includes(location.pathname)
  const linkTo = onFeedbackPage ? `${location.pathname}#feedback` : '/#feedback'
  const feedbackSectionActive = location.hash === '#feedback' && PATHS_WITH_FEEDBACK.includes(location.pathname)
  const mergedClass = [className, feedbackSectionActive ? activeClassName : ''].filter(Boolean).join(' ') || undefined

  return (
    <Link
      to={linkTo}
      className={mergedClass}
      onClick={(e) => {
        onNavigate?.()
        const el = document.getElementById('feedback')
        if (el) {
          e.preventDefault()
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          window.history.replaceState(null, '', `${location.pathname}${location.search}#feedback`)
        }
      }}
    >
      {children}
    </Link>
  )
}
