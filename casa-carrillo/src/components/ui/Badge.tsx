import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Tone = 'terracotta' | 'brown' | 'sand' | 'success' | 'danger'

const tones: Record<Tone, string> = {
  terracotta: 'bg-terracotta-500 text-cream-50',
  brown: 'bg-brown-800 text-cream-50',
  sand: 'bg-sand-200 text-brown-800',
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-700',
}

export function Badge({
  children,
  tone = 'terracotta',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
