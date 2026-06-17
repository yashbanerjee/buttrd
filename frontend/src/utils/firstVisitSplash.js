export const FIRST_VISIT_SPLASH_STORAGE_KEY = 'buttrd_splash_seen'

export function shouldShowFirstVisitSplash() {
  if (typeof window === 'undefined') return false
  try {
    return !localStorage.getItem(FIRST_VISIT_SPLASH_STORAGE_KEY)
  } catch {
    return true
  }
}
