import type { ReactNode } from 'react'

type Props = {
  title: string
  subtitle?: string
  actions?: ReactNode
}

export function PageHeader({ title, subtitle, actions }: Props) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subtitle ? <p className="text-sm opacity-70 mt-1">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </div>
  )
}

