import { beforeEach, describe, expect, it } from 'vitest'
import { useCartStore } from '../cartStore'
import type { Product } from '@/types'

const product: Product = {
  id: 'p1',
  slug: 'p1',
  name: 'Taza',
  description: '',
  price: 38_000,
  discount: 0,
  images: [{ id: 'i', url: 'u', alt: 'a' }],
  categoryId: 'c1',
  stock: 3,
  rating: 5,
  reviewsCount: 1,
  materials: [],
  origin: 'Test',
  variants: [],
  featured: false,
  createdAt: '2026-01-01T00:00:00Z',
}

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clear()
  })

  it('agrega un producto nuevo', () => {
    useCartStore.getState().addItem(product, 1)
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0].quantity).toBe(1)
  })

  it('acumula cantidad para el mismo producto sin exceder el stock', () => {
    const { addItem } = useCartStore.getState()
    addItem(product, 2)
    addItem(product, 5) // pediría 7 pero el stock es 3
    expect(useCartStore.getState().items[0].quantity).toBe(3)
  })

  it('actualiza la cantidad respetando el mínimo 1', () => {
    const { addItem, updateQuantity } = useCartStore.getState()
    addItem(product, 1)
    const key = useCartStore.getState().items[0].key
    updateQuantity(key, 0)
    expect(useCartStore.getState().items[0].quantity).toBe(1)
  })

  it('elimina un producto', () => {
    const { addItem, removeItem } = useCartStore.getState()
    addItem(product, 1)
    const key = useCartStore.getState().items[0].key
    removeItem(key)
    expect(useCartStore.getState().items).toHaveLength(0)
  })
})
