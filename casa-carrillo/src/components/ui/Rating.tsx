import { Star } from 'lucide-react'
import { cn } from '@/utils/cn'

export function Rating({
  value,
  count,
  size = 16,
  className,
}: {
  value: number
  count?: number
  size?: number
  className?: string
}) {
  const rounded = Math.round(value)
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex" role="img" aria-label={`${value} de 5 estrellas`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={i < rounded ? 'fill-clay-400 text-clay-400' : 'text-sand-300'}
            aria-hidden
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-brown-700">{value.toFixed(1)}</span>
      {count != null && <span className="text-sm text-brown-600/70">({count})</span>}
    </div>
  )
}
