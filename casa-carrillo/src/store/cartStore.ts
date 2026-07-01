import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, Coupon, Product, ProductVariant } from '@/types'
import { cartItemKey } from '@/utils/cart'
import { STORAGE_KEYS } from '@/utils/storage'

interface CartState {
  items: CartItem[]
  coupon: Coupon | null
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  clear: () => void
  applyCoupon: (coupon: Coupon) => void
  removeCoupon: () => void
}

/** Stock disponible de un item (según variante o producto). */
const availableStock = (product: Product, variant?: ProductVariant): number =>
  variant ? variant.stock : product.stock

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      coupon: null,

      addItem: (product, quantity = 1, variant) =>
        set((state) => {
          const key = cartItemKey(product.id, variant?.id)
          const existing = state.items.find((i) => i.key === key)
          const max = availableStock(product, variant)

          if (existing) {
            const nextQty = Math.min(existing.quantity + quantity, max)
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: nextQty } : i,
              ),
            }
          }
          return {
            items: [
              ...state.items,
              { key, product, variant, quantity: Math.min(quantity, max) },
            ],
          }
        }),

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => {
              if (i.key !== key) return i
              const max = availableStock(i.product, i.variant)
              return { ...i, quantity: Math.max(1, Math.min(quantity, max)) }
            })
            .filter((i) => i.quantity > 0),
        })),

      clear: () => set({ items: [], coupon: null }),
      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),
    }),
    {
      name: STORAGE_KEYS.cart,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
