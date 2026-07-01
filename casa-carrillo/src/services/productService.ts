import { api } from './api/client'
import type { Paginated, Product, ProductFilters } from '@/types'

export const productService = {
  async list(filters: ProductFilters): Promise<Paginated<Product>> {
    const { data } = await api.get<Paginated<Product>>('/products', { params: filters })
    return data
  },
  async getBySlug(slug: string): Promise<Product> {
    const { data } = await api.get<Product>(`/products/${slug}`)
    return data
  },
  async getRelated(slug: string): Promise<Product[]> {
    const { data } = await api.get<Product[]>(`/products/${slug}/related`)
    return data
  },
}
