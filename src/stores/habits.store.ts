import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// using zustand/persist version + migrate directly
import { isSameDay, subDays } from 'date-fns'

export type Habit = {
  id: string
  title: string
  frequencyPerWeek: number
  streak: number
  history: string[] // ISO dates of completion
  createdAt: string
  updatedAt: string
}

type HabitsState = {
  items: Habit[]
  add: (h: Omit<Habit, 'id' | 'streak' | 'history' | 'createdAt' | 'updatedAt'>) => void
  toggleDoneToday: (id: string) => void
  toggleAtDate: (id: string, isoDate: string) => void
  update: (id: string, changes: Partial<Habit>) => void
  remove: (id: string) => void
  seedDefaults: () => void
}

const todayIso = () => new Date().toISOString()

const SCHEMA_VERSION = 1

export const useHabitsStore = create<HabitsState>()(
  persist(
    (set) => ({
      items: [],
      add: (h) =>
        set(({ items }) => ({
          items: [
            {
              id: crypto.randomUUID(),
              title: h.title,
              frequencyPerWeek: h.frequencyPerWeek,
              streak: 0,
              history: [],
              createdAt: todayIso(),
              updatedAt: todayIso(),
            },
            ...items,
          ],
        })),
      toggleDoneToday: (id) =>
        set(({ items }) => {
          const date = new Date()
          const iso = date.toISOString()
          return {
            items: items.map((it) => {
              if (it.id !== id) return it
              const hasToday = it.history.some((d) => isSameDay(new Date(d), date))
              const history = hasToday ? it.history.filter((d) => !isSameDay(new Date(d), date)) : [iso, ...it.history]
              const streak = computeStreak(history)
              return { ...it, history, streak, updatedAt: iso }
            }),
          }
        }),
      toggleAtDate: (id, isoDate) =>
        set(({ items }) => {
          const target = new Date(isoDate)
          const iso = new Date().toISOString()
          return {
            items: items.map((it) => {
              if (it.id !== id) return it
              const exists = it.history.some((d) => isSameDay(new Date(d), target))
              const history = exists ? it.history.filter((d) => !isSameDay(new Date(d), target)) : [target.toISOString(), ...it.history]
              const streak = computeStreak(history)
              return { ...it, history, streak, updatedAt: iso }
            }),
          }
        }),
      update: (id, changes) =>
        set(({ items }) => ({ items: items.map((it) => (it.id === id ? { ...it, ...changes, updatedAt: todayIso() } : it)) })),
      remove: (id) => set(({ items }) => ({ items: items.filter((it) => it.id !== id) })),
      seedDefaults: () =>
        set(({ items }) => {
          if (items.length > 0) return { items }
          const now = todayIso()
          const base = (title: string): Habit => ({ id: crypto.randomUUID(), title, frequencyPerWeek: 5, streak: 0, history: [], createdAt: now, updatedAt: now })
          return {
            items: [
              base('Exercitar-se'),
              base('Meditar'),
              base('Ler'),
              base('Beber água'),
              base('Estudar programação'),
            ],
          }
        }),
    }),
    {
      name: 'habits',
      version: SCHEMA_VERSION,
      migrate: (persisted: any) => {
        if (persisted && Array.isArray(persisted.items)) return { items: persisted.items as Habit[] }
        if (Array.isArray(persisted)) return { items: persisted as Habit[] }
        return { items: [] as Habit[] }
      },
      partialize: (s) => ({ items: s.items }),
    }
  )
)

function computeStreak(history: string[]): number {
  let count = 0
  let current = new Date()
  for (;;) {
    const exists = history.some((d) => isSameDay(new Date(d), current))
    if (!exists) break
    count += 1
    current = subDays(current, 1)
  }
  return count
}

