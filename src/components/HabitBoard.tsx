import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useHabitsStore } from '../stores/habits.store'
import { Card } from './ui/Card'
import { CheckCell } from './CheckCell'

export function HabitBoard() {
  const { items, toggleAtDate, seedDefaults } = useHabitsStore()
  const start = startOfWeek(new Date(), { weekStartsOn: 1 })
  const end = endOfWeek(start, { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start, end })

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="px-2 py-1 rounded border border-[var(--border)] bg-[var(--card)]">{format(start, 'dd/MM')} - {format(end, 'dd/MM')}</div>
        <button className="px-3 py-1 rounded border border-[var(--border)] hover:bg-[var(--muted)]/10">Hoje</button>
        <button onClick={seedDefaults} className="px-3 py-1 rounded border border-[var(--border)] hover:bg-[var(--muted)]/10">Novo Hábito</button>
      </div>
      <Card>
        <div className="grid grid-cols-[minmax(220px,1fr)_repeat(7,124px)]">
          <div className="px-5 py-4 text-sm opacity-70 border-b border-[var(--border)]">Hábito</div>
          {days.map((d) => (
            <div key={d.toISOString()} className="px-5 py-4 text-xs opacity-70 text-center border-b border-[var(--border)]">
              {format(d, 'eee', { locale: ptBR })}
              <div className="mt-1 text-[10px]">{format(d, 'd', { locale: ptBR })}</div>
            </div>
          ))}
          {items.map((h) => (
            <>
              <div key={h.id + '-name'} className="px-5 py-4 border-b border-[var(--border)] flex items-center gap-3 bg-[var(--card)]/60">
                <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                <span className="font-medium">{h.title}</span>
              </div>
              {days.map((d, idx) => (
                <button
                  key={h.id + '-' + idx}
                  onClick={() => toggleAtDate(h.id, d.toISOString())}
                  className={`border-b border-[var(--border)] flex items-center justify-center py-4 hover:bg-[var(--muted)]/10`}
                >
                  <CheckCell checked={h.history.some((i) => i.slice(0,10) === d.toISOString().slice(0,10))} />
                </button>
              ))}
            </>
          ))}
        </div>
      </Card>
    </div>
  )
}

