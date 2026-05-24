const TOKEN_KEY = 'buttrd_admin_token'

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) }
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const token = getAdminToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(path, { ...options, headers })
  const data = await res.json().catch(() => ({}))
  if (res.status === 401) {
    setAdminToken(null)
    throw new Error('Session expired. Please sign in again.')
  }
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}

export function fetchPublicContent() {
  return request('/api/content')
}

export function loginAdmin(password) {
  return request('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
}

export function saveSiteContent(content) {
  return request('/api/admin/content', {
    method: 'PUT',
    body: JSON.stringify(content),
  })
}

export function uploadImage(file) {
  const form = new FormData()
  form.append('image', file)
  return request('/api/admin/upload', {
    method: 'POST',
    body: form,
  })
}

export function logoutAdmin() {
  const token = getAdminToken()
  if (!token) return Promise.resolve()
  return request('/api/admin/logout', { method: 'POST' }).finally(() => setAdminToken(null))
}
