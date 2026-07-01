import { describe, expect, it } from 'vitest'
import { calculateTotals, cartItemKey, itemUnitPrice } from '../cart'
import { FLAT_SHIPPING } from '../constants'
import type { CartItem, Coupon, Product } from '@/types'

const baseProduct: Product = {
  id: 'p1',
  slug: 'p1',
  name: 'Vasija',
  description: '',
  price: 100_000,
  discount: 0,
  images: [{ id: 'i', url: 'u', alt: 'a' }],
  categoryId: 'c1',
  stock: 10,
  rating: 5,
  reviewsCount: 1,
  materials: [],
  origin: 'Test',
  variants: [],
  featured: false,
  createdAt: '2026-01-01T00:00:00Z',
}

const makeItem = (over: Partial<Product> = {}, quantity = 1): CartItem => ({
  key: 'k',
  product: { ...baseProduct, ...over },
  quantity,
})

describe('itemUnitPrice', () => {
  it('aplica el descuento del producto', () => {
    expect(itemUnitPrice(makeItem({ discount: 20 }))).toBe(80_000)
  })

  it('suma el priceDelta de la variante', () => {
    const item: CartItem = {
      ...makeItem(),
      variant: { id: 'v', name: 'Tamaño', value: 'Grande', priceDelta: 25_000, stock: 3 },
    }
    expect(itemUnitPrice(item)).toBe(125_000)
  })
})

describe('calculateTotals', () => {
  it('devuelve ceros con carrito vacío', () => {
    const totals = calculateTotals([], null)
    expect(totals).toMatchObject({ subtotal: 0, total: 0, itemCount: 0, shipping: 0 })
  })

  it('cobra envío plano bajo el umbral de envío gratis', () => {
    const totals = calculateTotals([makeItem({ price: 50_000 }, 1)], null)
    expect(totals.subtotal).toBe(50_000)
    expect(totals.shipping).toBe(FLAT_SHIPPING)
    expect(totals.total).toBe(50_000 + FLAT_SHIPPING)
  })

  it('da envío gratis al superar el umbral', () => {
    const totals = calculateTotals([makeItem({ price: 100_000 }, 2)], null)
    expect(totals.shipping).toBe(0)
    expect(totals.total).toBe(200_000)
  })

  it('aplica cupón porcentual', () => {
    const coupon: Coupon = { code: 'X', type: 'percent', value: 10, minPurchase: 0, description: '' }
    const totals = calculateTotals([makeItem({ price: 100_000 }, 2)], coupon)
    expect(totals.discount).toBe(20_000)
    expect(totals.total).toBe(180_000)
  })

  it('ignora el cupón si no alcanza la compra mínima', () => {
    const coupon: Coupon = { code: 'X', type: 'fixed', value: 20_000, minPurchase: 300_000, description: '' }
    const totals = calculateTotals([makeItem({ price: 100_000 }, 1)], coupon)
    expect(totals.discount).toBe(0)
  })
})

describe('cartItemKey', () => {
  it('combina producto y variante', () => {
    expect(cartItemKey('p1')).toBe('p1')
    expect(cartItemKey('p1', 'v2')).toBe('p1::v2')
  })
})
