import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BarChart3, Boxes, Archive, Timer } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-56 shrink-0 border-r border-[var(--border)] p-4 flex-col gap-1 bg-[var(--card)]">
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

