import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns'
import { useHabitsStore } from '../stores/habits.store'
import { Card } from './ui/Card'

export function HabitBoard() {
  const { items, toggleDoneToday } = useHabitsStore()
  const start = startOfWeek(new Date(), { weekStartsOn: 1 })
  const end = endOfWeek(start, { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start, end })

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="px-2 py-1 rounded border border-[var(--border)] bg-[var(--card)]">{format(start, 'dd/MM')} - {format(end, 'dd/MM')}</div>
        <button className="px-3 py-1 rounded border border-[var(--border)]">Hoje</button>
      </div>
      <Card>
        <div className="grid grid-cols-[minmax(160px,1fr)_repeat(7,minmax(80px,1fr))]">
          <div className="px-4 py-3 text-sm opacity-70 border-b border-[var(--border)]">Hábito</div>
          {days.map((d) => (
            <div key={d.toISOString()} className="px-4 py-3 text-xs opacity-70 text-center border-b border-[var(--border)]">
              {format(d, 'EEE')}
              <div className="mt-1 text-[10px]">{format(d, 'd')}</div>
            </div>
          ))}
          {items.map((h) => (
            <>
              <div key={h.id + '-name'} className="px-4 py-3 border-b border-[var(--border)] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                <span className="font-medium">{h.title}</span>
              </div>
              {days.map((d, idx) => (
                <button
                  key={h.id + '-' + idx}
                  onClick={() => toggleDoneToday(h.id)}
                  className={`border-b border-[var(--border)] flex items-center justify-center p-3 hover:bg-[var(--muted)]/10`}
                >
                  <span className={`inline-block w-4 h-4 rounded ${h.history.some((i) => i.slice(0,10) === d.toISOString().slice(0,10)) ? 'bg-emerald-500' : 'border border-[var(--border)]'}`} />
                </button>
              ))}
            </>
          ))}
        </div>
      </Card>
    </div>
  )
}

