import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Props = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn('px-3 py-2 rounded border border-[var(--border)] bg-transparent outline-none focus:ring-2 focus:ring-[var(--primary)]/40', className)}
      {...props}
    />
  )
}

