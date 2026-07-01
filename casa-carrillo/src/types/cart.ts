import type { Product, ProductVariant } from './product'

export interface CartItem {
  /** Clave única = productId + variantId (para variantes distintas del mismo producto). */
  key: string
  product: Product
  variant?: ProductVariant
  quantity: number
}

export interface Coupon {
  code: string
  /** 'percent' descuenta un %; 'fixed' descuenta un monto. */
  type: 'percent' | 'fixed'
  value: number
  /** Mínimo de compra para aplicar. */
  minPurchase: number
  description: string
}

export interface CartTotals {
  subtotal: number
  discount: number
  shipping: number
  total: number
  itemCount: number
}
