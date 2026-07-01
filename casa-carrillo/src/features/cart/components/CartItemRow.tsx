import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import type { CartItem } from '@/types'
import { paths } from '@/routes/paths'
import { formatCurrency } from '@/utils/format'
import { itemUnitPrice } from '@/utils/cart'
import { LazyImage } from '@/components/common/LazyImage'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { useCartStore } from '@/store/cartStore'

export function CartItemRow({ item, compact = false }: { item: CartItem; compact?: boolean }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const unit = itemUnitPrice(item)

  return (
    <div className="flex gap-4 py-4">
      <Link
        to={paths.product(item.product.slug)}
        className="h-20 w-20 shrink-0 overflow-hidden rounded-xl"
      >
        <LazyImage
          src={item.product.images[0].url}
          alt={item.product.images[0].alt}
          wrapperClassName="h-full w-full"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={paths.product(item.product.slug)}
              className="line-clamp-1 font-serif font-semibold hover:text-terracotta-600"
            >
              {item.product.name}
            </Link>
            {item.variant && (
              <p className="text-xs text-brown-600">
                {item.variant.name}: {item.variant.value}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.key)}
            aria-label={`Eliminar ${item.product.name} del carrito`}
            className="shrink-0 rounded-full p-1.5 text-brown-600 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4.5 w-4.5" aria-hidden />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <QuantitySelector
            value={item.quantity}
            onChange={(q) => updateQuantity(item.key, q)}
            max={item.variant?.stock ?? item.product.stock}
            className={compact ? 'scale-90' : undefined}
          />
          <span className="font-serif font-semibold text-brown-900">
            {formatCurrency(unit * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}
