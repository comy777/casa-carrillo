import type { Coupon } from '@/types'

export const coupons: Coupon[] = [
  {
    code: 'ARTESANO10',
    type: 'percent',
    value: 10,
    minPurchase: 0,
    description: '10% de descuento en toda la tienda',
  },
  {
    code: 'HECHOAMANO',
    type: 'percent',
    value: 15,
    minPurchase: 150_000,
    description: '15% en compras superiores a $150.000',
  },
  {
    code: 'ENVIO20',
    type: 'fixed',
    value: 20_000,
    minPurchase: 100_000,
    description: '$20.000 de descuento desde $100.000',
  },
]

export const findCoupon = (code: string): Coupon | undefined =>
  coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase())
