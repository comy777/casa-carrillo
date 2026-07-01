import { useMemo } from 'react'
import { useCartStore } from '@/store/cartStore'
import { calculateTotals } from '@/utils/cart'
import type { CartTotals } from '@/types'

/** Deriva los totales del carrito de forma memoizada. */
export function useCartTotals(): CartTotals {
  const items = useCartStore((s) => s.items)
  const coupon = useCartStore((s) => s.coupon)
  return useMemo(() => calculateTotals(items, coupon), [items, coupon])
}
