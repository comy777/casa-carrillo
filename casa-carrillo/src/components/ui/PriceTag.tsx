import { cn } from '@/utils/cn'
import { finalPrice, formatCurrency } from '@/utils/format'

/** Muestra el precio con descuento aplicado y el precio tachado si aplica. */
export function PriceTag({
  price,
  discount,
  size = 'md',
  className,
}: {
  price: number
  discount: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const final = finalPrice(price, discount)
  const sizes = { sm: 'text-base', md: 'text-lg', lg: 'text-3xl' }

  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span className={cn('font-serif font-semibold text-brown-900', sizes[size])}>
        {formatCurrency(final)}
      </span>
      {discount > 0 && (
        <span className="text-sm text-brown-600/60 line-through">{formatCurrency(price)}</span>
      )}
    </div>
  )
}
