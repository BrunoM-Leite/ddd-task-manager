import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow)]', className)}>{children}</div>
}

