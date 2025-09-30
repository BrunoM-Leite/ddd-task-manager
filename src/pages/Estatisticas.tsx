import { useTasksStore } from '../stores/tasks.store'
import { useHabitsStore } from '../stores/habits.store'

export function EstatisticasPage() {
  const { items } = useTasksStore()
  const { items: habits } = useHabitsStore()
  const doneTasks = items.filter((t) => t.status === 'done').length
  const totalTasks = items.length
  const avgStreak = habits.length ? Math.round(habits.reduce((a, h) => a + h.streak, 0) / habits.length) : 0

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Estatísticas</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="border border-[var(--muted)] rounded p-4">
          <div className="text-sm opacity-70">Tarefas concluídas</div>
          <div className="text-2xl font-semibold">{doneTasks}</div>
        </div>
        <div className="border border-[var(--muted)] rounded p-4">
          <div className="text-sm opacity-70">Total de tarefas</div>
          <div className="text-2xl font-semibold">{totalTasks}</div>
        </div>
        <div className="border border-[var(--muted)] rounded p-4">
          <div className="text-sm opacity-70">Streak médio (hábitos)</div>
          <div className="text-2xl font-semibold">{avgStreak}</div>
        </div>
      </div>
    </div>
  )
}

