/** Resolve admin upload paths to the API media route (works in dev + Railway). */
export function toMediaUrl(src) {
  if (!src) return ''
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('blob:') ||
    src.startsWith('data:')
  ) {
    return src
  }
  if (src.startsWith('/api/media/')) return src.split('?')[0]

  if (src.startsWith('/assets/uploads/')) {
    const filename = src.slice('/assets/uploads/'.length).split('?')[0]
    return `/api/media/${filename}`
  }

  return src.split('?')[0]
}
