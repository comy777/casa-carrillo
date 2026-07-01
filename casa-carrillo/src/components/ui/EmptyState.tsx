import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-sand-100">
        <Icon className="h-9 w-9 text-terracotta-500" aria-hidden />
      </div>
      <h3 className="mb-2 text-xl">{title}</h3>
      {description && <p className="mb-6 max-w-sm text-brown-600">{description}</p>}
      {action}
    </div>
  )
}
