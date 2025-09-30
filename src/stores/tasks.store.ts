import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// using zustand/persist version + migrate directly

export type TaskBucket = 'inbox' | 'ddd' | 'bau'
export type TaskStatus = 'scheduled' | 'done'

export type Task = {
  id: string
  title: string
  notes?: string
  dueDate?: string
  tags?: string[]
  bucket: TaskBucket
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

type TasksState = {
  items: Task[]
  add: (t: { title: string; notes?: string; dueDate?: string; tags?: string[]; bucket?: TaskBucket; status?: TaskStatus }) => void
  update: (id: string, changes: Partial<Task>) => void
  remove: (id: string) => void
  move: (id: string, bucket: TaskBucket) => void
  toggleDone: (id: string) => void
}

const SCHEMA_VERSION = 1

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      items: [],
      add: (t) =>
        set(({ items }) => ({
          items: [
            {
              id: crypto.randomUUID(),
              title: t.title,
              notes: t.notes,
              dueDate: t.dueDate,
              tags: t.tags ?? [],
              bucket: t.bucket ?? 'inbox',
              status: t.status ?? 'scheduled',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            ...items,
          ],
        })),
      update: (id, changes) =>
        set(({ items }) => ({
          items: items.map((it) => (it.id === id ? { ...it, ...changes, updatedAt: new Date().toISOString() } : it)),
        })),
      remove: (id) => set(({ items }) => ({ items: items.filter((it) => it.id !== id) })),
      move: (id, bucket) =>
        set(({ items }) => ({ items: items.map((it) => (it.id === id ? { ...it, bucket, updatedAt: new Date().toISOString() } : it)) })),
      toggleDone: (id) =>
        set(({ items }) => ({
          items: items.map((it) => (it.id === id ? { ...it, status: it.status === 'done' ? 'scheduled' : 'done', updatedAt: new Date().toISOString() } : it)),
        })),
    }),
    {
      name: 'tasks',
      version: SCHEMA_VERSION,
      migrate: (persisted: any) => {
        if (persisted && Array.isArray(persisted.items)) return { items: persisted.items as Task[] }
        if (Array.isArray(persisted)) return { items: persisted as Task[] }
        return { items: [] as Task[] }
      },
      partialize: (s) => ({ items: s.items }),
    }
  )
)

