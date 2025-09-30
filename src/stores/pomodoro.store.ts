import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type PomodoroSettings = {
  focusMinutes: number
  breakMinutes: number
  longBreakMinutes: number
  cyclesUntilLongBreak: number
  soundEnabled: boolean
}

type PomodoroState = PomodoroSettings & {
  isRunning: boolean
  secondsLeft: number
  mode: 'focus' | 'break' | 'longBreak'
  start: () => void
  pause: () => void
  reset: () => void
  setSettings: (s: Partial<PomodoroSettings>) => void
}

const initial: PomodoroSettings = {
  focusMinutes: 25,
  breakMinutes: 5,
  longBreakMinutes: 15,
  cyclesUntilLongBreak: 4,
  soundEnabled: false,
}

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      ...initial,
      isRunning: false,
      secondsLeft: initial.focusMinutes * 60,
      mode: 'focus',
      start: () => set({ isRunning: true }),
      pause: () => set({ isRunning: false }),
      reset: () => set({ isRunning: false, secondsLeft: get().focusMinutes * 60, mode: 'focus' }),
      setSettings: (s) => set({ ...s }),
    }),
    { name: 'pomodoro-settings' }
  )
)

