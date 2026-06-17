export async function submitFormSubmission(payload) {
  const res = await fetch('/api/form-submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Unable to submit form')
  }

  return data
}
