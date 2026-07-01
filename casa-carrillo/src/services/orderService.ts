import { api } from './api/client'
import type { CreateOrderPayload, Order } from '@/types'

export const orderService = {
  async list(): Promise<Order[]> {
    const { data } = await api.get<Order[]>('/orders')
    return data
  },
  async create(payload: CreateOrderPayload): Promise<Order> {
    const { data } = await api.post<Order>('/orders', payload)
    return data
  },
}
