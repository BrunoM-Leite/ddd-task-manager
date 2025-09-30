import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UISettings = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useSettingsStore = create<UISettings>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
    }),
    { name: 'ui-settings' }
  )
)

