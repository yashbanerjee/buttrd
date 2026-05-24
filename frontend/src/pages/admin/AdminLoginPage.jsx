import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getAdminToken, loginAdmin, setAdminToken } from '../../api/adminApi.js'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (getAdminToken()) {
    return <Navigate to="/admin" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const { token } = await loginAdmin(password)
      setAdminToken(token)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-login-card">
        <img src="/assets/buttrd-logo.png" alt="Buttrd" className="admin-login-logo" />
        <h1>Admin</h1>
        <p className="admin-login-sub">Manage hero banners, offers, and social images.</p>
        <form onSubmit={handleSubmit} className="admin-form">
          <label className="admin-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="admin-error">{error}</p> : null}
          <button type="submit" className="admin-btn admin-btn--primary" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
