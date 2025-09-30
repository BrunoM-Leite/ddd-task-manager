import { useEffect } from 'react'
import { useSettingsStore } from '../stores/settings.store'

export function ThemeToggle() {
  const theme = useSettingsStore(s => s.theme)
  const toggle = useSettingsStore(s => s.toggleTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('theme-light', 'theme-dark')
    root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light')
  }, [theme])

  return (
    <button onClick={toggle} className="px-3 py-1 rounded border border-[var(--muted)]">
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}

