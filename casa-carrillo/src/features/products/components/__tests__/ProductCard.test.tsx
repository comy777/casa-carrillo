import { beforeEach, describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, screen } from '@/test/test-utils'
import { ProductCard } from '../ProductCard'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import type { Product } from '@/types'

const product: Product = {
  id: 'p1',
  slug: 'vasija',
  name: 'Vasija de terracota',
  description: 'Una vasija',
  price: 100_000,
  discount: 15,
  images: [{ id: 'i', url: 'http://img', alt: 'Vasija' }],
  categoryId: 'c1',
  stock: 5,
  rating: 4.8,
  reviewsCount: 42,
  materials: ['Barro'],
  origin: 'Ráquira, Boyacá',
  variants: [],
  featured: true,
  createdAt: '2026-01-01T00:00:00Z',
}

describe('ProductCard', () => {
  beforeEach(() => {
    useCartStore.getState().clear()
    useWishlistStore.getState().clear()
  })

  it('muestra nombre, origen y descuento', () => {
    renderWithProviders(<ProductCard product={product} />)
    expect(screen.getByText('Vasija de terracota')).toBeInTheDocument()
    expect(screen.getByText('Ráquira, Boyacá')).toBeInTheDocument()
    expect(screen.getByText('-15%')).toBeInTheDocument()
  })

  it('agrega el producto al carrito al hacer click', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProductCard product={product} />)

    await user.click(screen.getByLabelText(/agregar vasija de terracota al carrito/i))

    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0].product.id).toBe('p1')
  })

  it('alterna el estado de favoritos', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProductCard product={product} />)

    await user.click(screen.getByLabelText(/agregar a favoritos/i))
    expect(useWishlistStore.getState().has('p1')).toBe(true)
  })
})
