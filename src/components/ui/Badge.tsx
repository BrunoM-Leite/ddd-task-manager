import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('inline-block text-[10px] px-2 py-0.5 rounded bg-[var(--primary)]/15 text-[var(--primary)]', className)}>{children}</span>
}

