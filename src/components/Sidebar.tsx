import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BarChart3, Boxes, Archive, Timer, Disc } from 'lucide-react'

export function Sidebar() {
  const baseItem = 'flex items-center gap-3 px-3 py-2 rounded-xl my-1 text-sm transition-colors'
  return (
    <aside className="hidden md:flex w-60 shrink-0 border-r border-[var(--border)] px-3 pt-5 pb-4 flex-col bg-[var(--card)]">
      <div className="flex items-center gap-3 px-2 pb-4 mb-3 border-b border-[var(--border)]">
        <div className="w-9 h-9 rounded-full bg-[var(--muted)]/20 flex items-center justify-center">
          <Disc size={18} />
        </div>
        <div className="font-semibold">HabitFlow</div>
      </div>
      <nav className="flex-1">
        <NavLink
          to="/"
          className={({ isActive }: { isActive: boolean }) =>
            `${baseItem} ${isActive ? 'bg-[var(--muted)]/30 text-[var(--primary)]' : 'hover:bg-[var(--muted)]/10'}`
          }
        >
          <LayoutDashboard size={16} /> <span>Home</span>
        </NavLink>
        <NavLink
          to="/estatisticas"
          className={({ isActive }: { isActive: boolean }) =>
            `${baseItem} ${isActive ? 'bg-[var(--muted)]/30 text-[var(--primary)]' : 'hover:bg-[var(--muted)]/10'}`
          }
        >
          <BarChart3 size={16} /> <span>Estatísticas</span>
        </NavLink>
        <NavLink
          to="/ddd"
          className={({ isActive }: { isActive: boolean }) =>
            `${baseItem} ${isActive ? 'bg-[var(--muted)]/30 text-[var(--primary)]' : 'hover:bg-[var(--muted)]/10'}`
          }
        >
          <Boxes size={16} /> <span>DDD</span>
        </NavLink>
        <NavLink
          to="/bau"
          className={({ isActive }: { isActive: boolean }) =>
            `${baseItem} ${isActive ? 'bg-[var(--muted)]/30 text-[var(--primary)]' : 'hover:bg-[var(--muted)]/10'}`
          }
        >
          <Archive size={16} /> <span>Baú</span>
        </NavLink>
        <NavLink
          to="/pomodoro"
          className={({ isActive }: { isActive: boolean }) =>
            `${baseItem} ${isActive ? 'bg-[var(--muted)]/30 text-[var(--primary)]' : 'hover:bg-[var(--muted)]/10'}`
          }
        >
          <Timer size={16} /> <span>Pomodoro</span>
        </NavLink>
      </nav>
    </aside>
  )
}

