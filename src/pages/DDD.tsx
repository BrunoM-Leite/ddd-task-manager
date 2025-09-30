import { useTasksStore } from '../stores/tasks.store'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { format } from 'date-fns'

export function DDDPage() {
  const { items, move } = useTasksStore()
  const ddd = items.filter((t) => t.bucket === 'ddd')
  const inbox = items.filter((t) => t.bucket === 'inbox')

  return (
    <div className="space-y-4 max-w-5xl">
      <h1 className="text-xl font-semibold">Depósito de Demandas</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <section>
          <h2 className="font-medium mb-2">Inbox</h2>
          <Card className="p-3">
          <ul className="space-y-2">
            {inbox.map((t) => (
              <li key={t.id} className="rounded bg-[var(--card)] p-3 border border-[var(--border)] flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[var(--primary)]" />
                  {t.title}
                  {t.dueDate ? <span className="text-xs opacity-70">• {format(new Date(t.dueDate), 'dd/MM/yyyy')}</span> : null}
                </span>
                <Button size="sm" onClick={() => move(t.id, 'ddd')}>Mover</Button>
              </li>
            ))}
          </ul>
          </Card>
        </section>
        <section>
          <h2 className="font-medium mb-2">DDD</h2>
          <Card className="p-3">
          <ul className="space-y-2">
            {ddd.map((t) => (
              <li key={t.id} className="rounded bg-[var(--card)] p-3 border border-[var(--border)] flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[var(--primary)]" />
                  {t.title}
                  {t.dueDate ? <span className="text-xs opacity-70">• {format(new Date(t.dueDate), 'dd/MM/yyyy')}</span> : null}
                </span>
                <Button size="sm" onClick={() => move(t.id, 'bau')}>Arquivar</Button>
              </li>
            ))}
          </ul>
          </Card>
        </section>
      </div>
    </div>
  )
}

