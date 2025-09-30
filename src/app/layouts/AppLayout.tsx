import { Outlet, NavLink } from 'react-router-dom'
import { ThemeToggle } from '../../components/ThemeToggle'
import { Sidebar } from '../../components/Sidebar'
import { useState } from 'react'

export function AppLayout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex">
      {open && (
        <div className="fixed inset-0 bg-black/30 md:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}
      <div className={`fixed md:static z-20 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform`}> 
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-[var(--muted)] flex items-center justify-between px-4 gap-2">
          <div className="flex items-center gap-2">
            <button className="md:hidden px-2 py-1 rounded border border-[var(--muted)]" onClick={() => setOpen((v) => !v)} aria-label="Abrir menu">☰</button>
            <nav className="hidden sm:flex gap-4 text-sm" aria-label="Navegação principal">
              <NavLink to="/" className={({ isActive }: { isActive: boolean }) => isActive ? 'font-semibold' : ''}>Home</NavLink>
              <NavLink to="/estatisticas" className={({ isActive }: { isActive: boolean }) => isActive ? 'font-semibold' : ''}>Estatísticas</NavLink>
              <NavLink to="/ddd" className={({ isActive }: { isActive: boolean }) => isActive ? 'font-semibold' : ''}>DDD</NavLink>
              <NavLink to="/bau" className={({ isActive }: { isActive: boolean }) => isActive ? 'font-semibold' : ''}>Baú</NavLink>
              <NavLink to="/pomodoro" className={({ isActive }: { isActive: boolean }) => isActive ? 'font-semibold' : ''}>Pomodoro</NavLink>
            </nav>
          </div>
          <ThemeToggle />
        </header>
        <main className="p-4"><Outlet /></main>
      </div>
    </div>
  )
}

