import { Minus, Plus } from 'lucide-react'
import { cn } from '@/utils/cn'

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  className?: string
}) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))

  return (
    <div className={cn('inline-flex items-center rounded-full border border-sand-300', className)}>
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Disminuir cantidad"
        className="flex h-10 w-10 items-center justify-center rounded-full text-brown-700 transition-colors hover:bg-sand-100 disabled:opacity-40"
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>
      <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
        className="flex h-10 w-10 items-center justify-center rounded-full text-brown-700 transition-colors hover:bg-sand-100 disabled:opacity-40"
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  )
}
