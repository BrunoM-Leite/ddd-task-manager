import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { useTasksStore } from '../stores/tasks.store'
import { useHabitsStore } from '../stores/habits.store'
import { Calendar } from '../components/Calendar'

export function HomePage() {
  const { items, add, update, remove, toggleDone } = useTasksStore()
  const habits = useHabitsStore((s) => s.items)
  const addHabit = useHabitsStore((s) => s.add)
  const toggleHabit = useHabitsStore((s) => s.toggleDoneToday)
  const inbox = useMemo(() => items.filter((t) => t.bucket === 'inbox'), [items])
  const [title, setTitle] = useState('')
  const [due, setDue] = useState<string>('')
  const [habitTitle, setHabitTitle] = useState('')
  const [habitFreq, setHabitFreq] = useState(3)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    add({ title: title.trim(), dueDate: due || undefined })
    setTitle('')
    setDue('')
  }

  function addHabitSubmit(e: FormEvent) {
    e.preventDefault()
    if (!habitTitle.trim()) return
    addHabit({ title: habitTitle.trim(), frequencyPerWeek: habitFreq })
    setHabitTitle('')
    setHabitFreq(3)
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <h1 className="text-xl font-semibold">Caixa de Entrada</h1>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 px-3 py-2 rounded border border-[var(--muted)] bg-transparent" placeholder="Nova tarefa" />
        <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="px-3 py-2 rounded border border-[var(--muted)] bg-transparent" />
        <button className="px-3 py-2 rounded bg-[var(--primary)] text-white">Adicionar</button>
      </form>

      <ul className="space-y-2">
        {inbox.map((t) => (
          <li key={t.id} className="border border-[var(--muted)] rounded p-3 flex items-center gap-3">
            <input type="checkbox" checked={t.status === 'done'} onChange={() => toggleDone(t.id)} />
            <input
              value={t.title}
              onChange={(e) => update(t.id, { title: e.target.value })}
              className="flex-1 bg-transparent border-none outline-none"
            />
            {t.dueDate ? <span className="text-xs opacity-70">{t.dueDate}</span> : null}
            <button onClick={() => remove(t.id)} className="text-red-500 text-sm">Excluir</button>
          </li>
        ))}
      </ul>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Hábitos</h2>
          <form onSubmit={addHabitSubmit} className="flex gap-2">
            <input value={habitTitle} onChange={(e) => setHabitTitle(e.target.value)} className="flex-1 px-3 py-2 rounded border border-[var(--muted)] bg-transparent" placeholder="Novo hábito" />
            <input type="number" min={1} max={7} value={habitFreq} onChange={(e) => setHabitFreq(Number(e.target.value))} className="w-24 px-3 py-2 rounded border border-[var(--muted)] bg-transparent" />
            <button className="px-3 py-2 rounded bg-[var(--primary)] text-white">Adicionar</button>
          </form>
          <ul className="space-y-2">
            {habits.map((h) => (
              <li key={h.id} className="border border-[var(--muted)] rounded p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{h.title}</div>
                  <div className="text-xs opacity-70">Freq/semana: {h.frequencyPerWeek} • Streak: {h.streak}</div>
                </div>
                <button onClick={() => toggleHabit(h.id)} className="px-2 py-1 rounded border border-[var(--muted)]">Marcar hoje</button>
              </li>
            ))}
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Calendário</h2>
          <Calendar />
        </section>
      </div>
    </div>
  )
}

