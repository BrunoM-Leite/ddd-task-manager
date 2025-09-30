import { useEffect } from 'react'
import { useSettingsStore } from '../stores/settings.store'
import * as Switch from '@radix-ui/react-switch'

export function ThemeToggle() {
  const theme = useSettingsStore(s => s.theme)
  const toggle = useSettingsStore(s => s.toggleTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('theme-light', 'theme-dark')
    root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light')
  }, [theme])

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm opacity-70">Escuro</span>
      <Switch.Root checked={theme === 'dark'} onCheckedChange={toggle} className="w-10 h-6 rounded-full bg-[var(--muted)]/40 relative">
        <Switch.Thumb className={`block w-5 h-5 bg-white rounded-full transition-transform translate-x-[2px] ${theme === 'dark' ? 'translate-x-[22px]' : ''}`} />
      </Switch.Root>
    </div>
  )
}

