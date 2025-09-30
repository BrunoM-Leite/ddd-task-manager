import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { useTasksStore } from '../stores/tasks.store'
import { Calendar } from '../components/Calendar'
import { HabitBoard } from '../components/HabitBoard'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/PageHeader'

export function HomePage() {
  const { items, add, update, remove, toggleDone } = useTasksStore()
  // habits store is used by HabitBoard internally
  const inbox = useMemo(() => items.filter((t) => t.bucket === 'inbox'), [items])
  const [title, setTitle] = useState('')
  const [due, setDue] = useState<string>('')
  

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    add({ title: title.trim(), dueDate: due || undefined })
    setTitle('')
    setDue('')
  }

  

  return (
    <div className="space-y-6 max-w-6xl">
      <PageHeader title="Meus Hábitos" subtitle="Construa uma rotina consistente" />
      <HabitBoard />

      <h2 className="text-xl font-semibold">DDD - Depósito De Demandas</h2>
      <Card className="p-3">
      <form onSubmit={onSubmit} className="flex gap-2">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1" placeholder="To-do" />
        <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
        <Button variant="primary">Adicionar</Button>
      </form>
      </Card>

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
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Calendário</h2>
        <Calendar />
      </section>
    </div>
  )
}

