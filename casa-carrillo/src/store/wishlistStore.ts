import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product } from '@/types'
import { STORAGE_KEYS } from '@/utils/storage'

interface WishlistState {
  items: Product[]
  toggle: (product: Product) => void
  remove: (id: string) => void
  has: (id: string) => boolean
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) =>
        set((state) =>
          state.items.some((p) => p.id === product.id)
            ? { items: state.items.filter((p) => p.id !== product.id) }
            : { items: [...state.items, product] },
        ),
      remove: (id) => set((state) => ({ items: state.items.filter((p) => p.id !== id) })),
      has: (id) => get().items.some((p) => p.id === id),
      clear: () => set({ items: [] }),
    }),
    {
      name: STORAGE_KEYS.wishlist,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
