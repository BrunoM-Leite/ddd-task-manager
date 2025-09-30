import { useEffect } from 'react'
import { usePomodoroStore } from '../stores/pomodoro.store'
import * as Dialog from '@radix-ui/react-dialog'

export function PomodoroPage() {
  const { isRunning, secondsLeft, start, pause, reset, focusMinutes, breakMinutes, longBreakMinutes, soundEnabled, setSettings } = usePomodoroStore()

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => {
      usePomodoroStore.setState((s) => {
        if (s.secondsLeft > 1) return { secondsLeft: s.secondsLeft - 1 }
        const audioPlay = () => {
          if (s.soundEnabled) new Audio('/beep.mp3').play().catch(() => {})
        }
        audioPlay()
        if (s.mode === 'focus') return { mode: 'break', secondsLeft: s.breakMinutes * 60, isRunning: false }
        if (s.mode === 'break') return { mode: 'focus', secondsLeft: s.focusMinutes * 60, isRunning: false }
        return { secondsLeft: s.focusMinutes * 60, isRunning: false }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning])

  const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0')
  const s = Math.floor(secondsLeft % 60).toString().padStart(2, '0')

  return (
    <div className="space-y-4 max-w-xl">
      <h1 className="text-xl font-semibold">Pomodoro</h1>
      <div className="text-5xl font-mono text-center">{m}:{s}</div>
      <div className="flex gap-2 justify-center">
        <button onClick={start} className="px-3 py-2 rounded border border-[var(--muted)]">Start</button>
        <button onClick={pause} className="px-3 py-2 rounded border border-[var(--muted)]">Pause</button>
        <button onClick={reset} className="px-3 py-2 rounded border border-[var(--muted)]">Reset</button>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="px-3 py-2 rounded border border-[var(--muted)]">⚙️</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md rounded border border-[var(--border)] bg-[var(--card)] p-4">
              <Dialog.Title className="text-lg font-semibold mb-3">Configurações</Dialog.Title>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="text-sm">Foco (min)
                  <input type="number" value={focusMinutes} onChange={(e) => setSettings({ focusMinutes: Number(e.target.value) })} className="w-full px-3 py-2 rounded border border-[var(--muted)] bg-transparent" />
                </label>
                <label className="text-sm">Pausa (min)
                  <input type="number" value={breakMinutes} onChange={(e) => setSettings({ breakMinutes: Number(e.target.value) })} className="w-full px-3 py-2 rounded border border-[var(--muted)] bg-transparent" />
                </label>
                <label className="text-sm">Pausa longa (min)
                  <input type="number" value={longBreakMinutes} onChange={(e) => setSettings({ longBreakMinutes: Number(e.target.value) })} className="w-full px-3 py-2 rounded border border-[var(--muted)] bg-transparent" />
                </label>
                <label className="text-sm flex items-center gap-2">Som
                  <input type="checkbox" checked={soundEnabled} onChange={(e) => setSettings({ soundEnabled: e.target.checked })} />
                </label>
              </div>
              <div className="flex justify-end mt-4">
                <Dialog.Close asChild>
                  <button className="px-3 py-2 rounded border border-[var(--muted)]">Fechar</button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

    </div>
  )
}

