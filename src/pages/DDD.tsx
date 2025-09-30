import { useTasksStore } from '../stores/tasks.store'

export function DDDPage() {
  const { items, move } = useTasksStore()
  const ddd = items.filter((t) => t.bucket === 'ddd')
  const inbox = items.filter((t) => t.bucket === 'inbox')

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Depósito de Demandas</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <section>
          <h2 className="font-medium mb-2">Inbox</h2>
          <ul className="space-y-2">
            {inbox.map((t) => (
              <li key={t.id} className="border border-[var(--muted)] rounded p-3 flex items-center justify-between">
                <span>{t.title}</span>
                <button className="text-sm" onClick={() => move(t.id, 'ddd')}>Enviar para DDD</button>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-medium mb-2">DDD</h2>
          <ul className="space-y-2">
            {ddd.map((t) => (
              <li key={t.id} className="border border-[var(--muted)] rounded p-3 flex items-center justify-between">
                <span>{t.title}</span>
                <button className="text-sm" onClick={() => move(t.id, 'bau')}>Arquivar no Baú</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

