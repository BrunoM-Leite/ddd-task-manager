import { useTasksStore } from '../stores/tasks.store'

export function BauPage() {
  const { items, move } = useTasksStore()
  const bau = items.filter((t) => t.bucket === 'bau')

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Baú</h1>
      <ul className="space-y-2">
        {bau.map((t) => (
          <li key={t.id} className="border border-[var(--muted)] rounded p-3 flex items-center justify-between">
            <span>{t.title}</span>
            <button className="text-sm" onClick={() => move(t.id, 'inbox')}>Mover para Inbox</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

