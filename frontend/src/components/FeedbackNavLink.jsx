import { Link, useLocation } from 'react-router-dom'

const PATHS_WITH_FEEDBACK = ['/', '/catering', '/our-story']

export function FeedbackNavLink({ onNavigate }) {
  const location = useLocation()
  const onFeedbackPage = PATHS_WITH_FEEDBACK.includes(location.pathname)
  const linkTo = onFeedbackPage ? `${location.pathname}#feedback` : '/#feedback'

  return (
    <Link
      to={linkTo}
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
      FEEDBACK
    </Link>
  )
}
