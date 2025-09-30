type Props = { checked: boolean }

export function CheckCell({ checked }: Props) {
  return (
    <span
      className={
        'inline-block w-5 h-5 rounded-md border transition-colors ' +
        (checked ? 'bg-emerald-500 border-emerald-500' : 'border-[var(--border)]')
      }
    />
  )
}

