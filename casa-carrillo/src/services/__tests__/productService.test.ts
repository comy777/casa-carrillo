import { describe, expect, it } from 'vitest'
import { productService } from '../productService'

describe('productService (mock API)', () => {
  it('lista productos paginados', async () => {
    const res = await productService.list({ page: 1, pageSize: 9 })
    expect(res.total).toBeGreaterThan(0)
    expect(res.items.length).toBeLessThanOrEqual(9)
    expect(res.page).toBe(1)
  })

  it('filtra por búsqueda', async () => {
    const res = await productService.list({ search: 'mochila' })
    expect(res.items.length).toBeGreaterThan(0)
    expect(res.items.every((p) => /mochila/i.test(p.name + p.description))).toBe(true)
  })

  it('ordena por precio ascendente', async () => {
    const res = await productService.list({ sort: 'price-asc', pageSize: 50 })
    const prices = res.items.map((p) => Math.round(p.price * (1 - p.discount / 100)))
    const sorted = [...prices].sort((a, b) => a - b)
    expect(prices).toEqual(sorted)
  })

  it('obtiene un producto por slug', async () => {
    const product = await productService.getBySlug('mochila-wayuu-tejida')
    expect(product.name).toContain('Mochila')
  })
})
