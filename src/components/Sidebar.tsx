import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BarChart3, Boxes, Archive, Timer, Disc } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-56 shrink-0 border-r border-[var(--border)] p-4 flex-col gap-1 bg-[var(--card)]">
      <div className="flex items-center gap-3 px-2 pb-3 mb-3 border-b border-[var(--border)]">
        <div className="w-8 h-8 rounded-full bg-[var(--muted)]/20 flex items-center justify-center">
          <Disc size={16} />
        </div>
        <div className="font-semibold">HabitFlow</div>
      </div>
      <NavLink to="/" className={({ isActive }: { isActive: boolean }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-[var(--muted)]/10 ${isActive ? 'bg-[var(--muted)]/10 text-[var(--primary)]' : ''}`}>
        <LayoutDashboard size={16} /> Home
      </NavLink>
      <NavLink to="/estatisticas" className={({ isActive }: { isActive: boolean }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-[var(--muted)]/10 ${isActive ? 'bg-[var(--muted)]/10 text-[var(--primary)]' : ''}`}>
        <BarChart3 size={16} /> Estatísticas
      </NavLink>
      <NavLink to="/ddd" className={({ isActive }: { isActive: boolean }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-[var(--muted)]/10 ${isActive ? 'bg-[var(--muted)]/10 text-[var(--primary)]' : ''}`}>
        <Boxes size={16} /> DDD
      </NavLink>
      <NavLink to="/bau" className={({ isActive }: { isActive: boolean }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-[var(--muted)]/10 ${isActive ? 'bg-[var(--muted)]/10 text-[var(--primary)]' : ''}`}>
        <Archive size={16} /> Baú
      </NavLink>
      <NavLink to="/pomodoro" className={({ isActive }: { isActive: boolean }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-[var(--muted)]/10 ${isActive ? 'bg-[var(--muted)]/10 text-[var(--primary)]' : ''}`}>
        <Timer size={16} /> Pomodoro
      </NavLink>
    </aside>
  )
}

