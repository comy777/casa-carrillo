import type { Address } from './user'

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type PaymentMethod = 'card' | 'pse' | 'cash'

export interface OrderLine {
  productId: string
  name: string
  image: string
  variantLabel?: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  userId: string
  lines: OrderLine[]
  address: Address
  paymentMethod: PaymentMethod
  status: OrderStatus
  subtotal: number
  discount: number
  shipping: number
  total: number
  couponCode?: string
  createdAt: string
}

export interface CreateOrderPayload {
  lines: OrderLine[]
  address: Address
  paymentMethod: PaymentMethod
  subtotal: number
  discount: number
  shipping: number
  total: number
  couponCode?: string
}
