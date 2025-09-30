import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md'
}

export function Button({ className, variant = 'outline', size = 'md', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded transition-shadow'
  const sizes = size === 'sm' ? 'h-8 px-3 text-sm' : 'h-9 px-4'
  const variants =
    variant === 'primary'
      ? 'bg-[var(--primary)] text-black hover:shadow-md'
      : variant === 'ghost'
      ? 'hover:bg-[var(--muted)]/20'
      : 'border border-[var(--border)] hover:bg-[var(--muted)]/10'
  return <button className={cn(base, sizes, variants, className)} {...props} />
}

