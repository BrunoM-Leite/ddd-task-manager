import { Outlet, useLocation } from 'react-router-dom'
import { ThemeToggle } from '../../components/ThemeToggle'
import { Sidebar } from '../../components/Sidebar'
import { useState } from 'react'

export function AppLayout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const title = pathname === '/'
    ? 'Home'
    : pathname.startsWith('/estatisticas')
    ? 'Estatísticas'
    : pathname.startsWith('/ddd')
    ? 'DDD'
    : pathname.startsWith('/bau')
    ? 'Baú'
    : pathname.startsWith('/pomodoro')
    ? 'Pomodoro'
    : ''
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex">
      {open && (
        <div className="fixed inset-0 bg-black/30 md:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}
      <div className={`fixed md:static z-20 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform`}> 
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-[var(--border)] flex items-center justify-between px-4 gap-2">
          <div className="flex items-center gap-2">
            <button className="md:hidden px-2 py-1 rounded border border-[var(--border)]" onClick={() => setOpen((v) => !v)} aria-label="Abrir menu">☰</button>
            <div className="text-lg font-semibold">{title}</div>
          </div>
          <ThemeToggle />
        </header>
        <main className="px-4 md:px-6 py-4">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

