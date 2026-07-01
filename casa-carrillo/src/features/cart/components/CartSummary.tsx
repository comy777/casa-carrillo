import { useState } from 'react'
import { Tag, X } from 'lucide-react'
import { formatCurrency } from '@/utils/format'
import { FREE_SHIPPING_THRESHOLD } from '@/utils/constants'
import { useCartTotals } from '@/hooks/useCartTotals'
import { useCoupon } from '../hooks/useCoupon'
import { Button } from '@/components/ui/Button'

interface Props {
  /** Muestra el bloque de cupón (oculto en checkout donde ya está aplicado). */
  showCoupon?: boolean
  footer?: React.ReactNode
}

export function CartSummary({ showCoupon = true, footer }: Props) {
  const totals = useCartTotals()
  const { coupon, applyCode, isValidating, removeCoupon } = useCoupon()
  const [code, setCode] = useState('')

  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - (totals.subtotal - totals.discount)

  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft">
      <h3 className="mb-4 text-lg">Resumen</h3>

      {showCoupon && (
        <div className="mb-4">
          {coupon ? (
            <div className="flex items-center justify-between rounded-xl bg-sand-100 px-3 py-2">
              <span className="flex items-center gap-2 text-sm font-semibold text-brown-800">
                <Tag className="h-4 w-4 text-terracotta-500" aria-hidden /> {coupon.code}
              </span>
              <button
                type="button"
                onClick={removeCoupon}
                aria-label="Quitar cupón"
                className="text-brown-600 hover:text-red-600"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (code.trim()) applyCode(code)
              }}
              className="flex gap-2"
            >
              <label htmlFor="coupon" className="sr-only">
                Código de cupón
              </label>
              <input
                id="coupon"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Cupón"
                className="h-10 flex-1 rounded-full border border-sand-300 bg-white px-4 text-sm focus:border-terracotta-500 focus:outline-none"
              />
              <Button type="submit" size="sm" variant="outline" loading={isValidating}>
                Aplicar
              </Button>
            </form>
          )}
        </div>
      )}

      <dl className="space-y-2 border-t border-sand-200 pt-4 text-sm">
        <Row label="Subtotal" value={formatCurrency(totals.subtotal)} />
        {totals.discount > 0 && (
          <Row label="Descuento" value={`- ${formatCurrency(totals.discount)}`} tone="text-terracotta-600" />
        )}
        <Row
          label="Envío"
          value={totals.shipping === 0 ? 'Gratis' : formatCurrency(totals.shipping)}
        />
      </dl>

      {remainingForFreeShipping > 0 && totals.itemCount > 0 && (
        <p className="mt-3 rounded-lg bg-sand-100 px-3 py-2 text-xs text-brown-700">
          Te faltan <strong>{formatCurrency(remainingForFreeShipping)}</strong> para envío gratis 🚚
        </p>
      )}

      <div className="mt-4 flex items-baseline justify-between border-t border-sand-200 pt-4">
        <span className="font-serif text-lg">Total</span>
        <span className="font-serif text-2xl font-semibold text-brown-900">
          {formatCurrency(totals.total)}
        </span>
      </div>

      {footer && <div className="mt-5">{footer}</div>}
    </div>
  )
}

function Row({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-brown-600">{label}</dt>
      <dd className={tone ?? 'font-semibold text-brown-800'}>{value}</dd>
    </div>
  )
}
