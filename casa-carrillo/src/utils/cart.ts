import type { CartItem, CartTotals, Coupon } from '@/types'
import { finalPrice } from './format'
import { FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD } from './constants'

/** Precio unitario final de un item (base + variante, con descuento). */
export function itemUnitPrice(item: CartItem): number {
  const base = item.product.price + (item.variant?.priceDelta ?? 0)
  return finalPrice(base, item.product.discount)
}

/** Cálculo puro de totales. Fuente única de verdad para carrito y checkout (DRY). */
export function calculateTotals(
  items: CartItem[],
  coupon: Coupon | null,
): CartTotals {
  const subtotal = items.reduce(
    (acc, item) => acc + itemUnitPrice(item) * item.quantity,
    0,
  )
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  let discount = 0
  if (coupon && subtotal >= coupon.minPurchase) {
    discount =
      coupon.type === 'percent'
        ? Math.round(subtotal * (coupon.value / 100))
        : coupon.value
  }

  const discountedSubtotal = Math.max(subtotal - discount, 0)
  const shipping =
    itemCount === 0 || discountedSubtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : FLAT_SHIPPING

  return {
    subtotal,
    discount,
    shipping,
    total: discountedSubtotal + shipping,
    itemCount,
  }
}

export function cartItemKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}::${variantId}` : productId
}
