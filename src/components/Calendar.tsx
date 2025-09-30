import { useMemo, useState } from 'react'
import { addMonths, addWeeks, format, isSameDay, subMonths, subWeeks } from 'date-fns'
import { getMonthDays, getWeekDays } from '../lib/dates'
import { useTasksStore } from '../stores/tasks.store'
import { useHabitsStore } from '../stores/habits.store'

type View = 'month' | 'week'

export function Calendar() {
  const [view, setView] = useState<View>('month')
  const [cursor, setCursor] = useState<Date>(new Date())
  const { items: tasks } = useTasksStore()
  const { items: habits } = useHabitsStore()

  const days = useMemo(() => (view === 'month' ? getMonthDays(cursor) : getWeekDays(cursor)), [view, cursor])

  const title = useMemo(() => (view === 'month' ? format(cursor, 'MMMM yyyy') : `Semana de ${format(cursor, 'dd/MM')}`), [view, cursor])

  function prev() {
    setCursor((d) => (view === 'month' ? subMonths(d, 1) : subWeeks(d, 1)))
  }
  function next() {
    setCursor((d) => (view === 'month' ? addMonths(d, 1) : addWeeks(d, 1)))
  }
  function today() {
    setCursor(new Date())
  }

  return (
    <div className="border border-[var(--muted)] rounded">
      <div className="flex items-center justify-between p-3 border-b border-[var(--muted)]">
        <div className="flex items-center gap-2">
          <button onClick={prev} className="px-2 py-1 rounded border border-[var(--muted)]">◀</button>
          <button onClick={today} className="px-2 py-1 rounded border border-[var(--muted)]">Hoje</button>
          <button onClick={next} className="px-2 py-1 rounded border border-[var(--muted)]">▶</button>
        </div>
        <div className="font-medium">{title}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setView('week')} className={`px-2 py-1 rounded border border-[var(--muted)] ${view === 'week' ? 'bg-[var(--muted)]/20' : ''}`}>Semana</button>
          <button onClick={() => setView('month')} className={`px-2 py-1 rounded border border-[var(--muted)] ${view === 'month' ? 'bg-[var(--muted)]/20' : ''}`}>Mês</button>
        </div>
      </div>

      <div className={`grid ${view === 'month' ? 'grid-cols-7' : 'grid-cols-7'} gap-px bg-[var(--muted)]/60`}>
        {days.map((day) => {
          const dayTasks = tasks.filter((t) => t.dueDate && isSameDay(new Date(t.dueDate), day))
          const doneHabits = habits.filter((h) => h.history.some((d) => isSameDay(new Date(d), day)))
          return (
            <div key={day.toISOString()} className="bg-[var(--bg)] p-2 min-h-[84px]">
              <div className="text-xs opacity-70">{format(day, 'dd/MM')}</div>
              <div className="mt-2 flex flex-col gap-1">
                {dayTasks.length > 0 && (
                  <span className="text-[10px] inline-block px-2 py-0.5 rounded bg-[var(--primary)]/15 text-[var(--primary)]">
                    {dayTasks.length} tarefas
                  </span>
                )}
                {doneHabits.length > 0 && (
                  <span className="text-[10px] inline-block px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500">
                    {doneHabits.length} hábitos
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

