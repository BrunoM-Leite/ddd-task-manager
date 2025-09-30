import { NavLink } from 'react-router-dom'

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-56 shrink-0 border-r border-[var(--muted)] p-4 flex-col gap-2">
      <NavLink to="/" className={({ isActive }: { isActive: boolean }) => isActive ? 'font-semibold' : ''}>Home</NavLink>
      <NavLink to="/estatisticas" className={({ isActive }: { isActive: boolean }) => isActive ? 'font-semibold' : ''}>Estatísticas</NavLink>
      <NavLink to="/ddd" className={({ isActive }: { isActive: boolean }) => isActive ? 'font-semibold' : ''}>DDD</NavLink>
      <NavLink to="/bau" className={({ isActive }: { isActive: boolean }) => isActive ? 'font-semibold' : ''}>Baú</NavLink>
      <NavLink to="/pomodoro" className={({ isActive }: { isActive: boolean }) => isActive ? 'font-semibold' : ''}>Pomodoro</NavLink>
    </aside>
  )
}

