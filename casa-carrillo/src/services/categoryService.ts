import { api } from './api/client'
import type { Category } from '@/types'

export const categoryService = {
  async list(): Promise<Category[]> {
    const { data } = await api.get<Category[]>('/categories')
    return data
  },
}
