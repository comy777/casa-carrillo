import type { Order } from '@/types'
import { demoUser } from './users'

export const orders: Order[] = [
  {
    id: 'ORD-20260612',
    userId: demoUser.id,
    status: 'delivered',
    createdAt: '2026-06-12T14:30:00Z',
    address: demoUser.addresses[0],
    paymentMethod: 'card',
    lines: [
      {
        productId: 'p-002',
        name: 'Mochila Wayuú tejida a mano',
        image:
          'https://images.unsplash.com/photo-1528732263440-5344a1a86723?auto=format&fit=crop&w=200&q=70',
        variantLabel: 'Color: Multicolor',
        price: 165_000,
        quantity: 1,
      },
      {
        productId: 'p-008',
        name: 'Taza de gres artesanal',
        image:
          'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=200&q=70',
        variantLabel: 'Color: Terracota',
        price: 38_000,
        quantity: 2,
      },
    ],
    subtotal: 241_000,
    discount: 0,
    shipping: 0,
    total: 241_000,
  },
  {
    id: 'ORD-20260628',
    userId: demoUser.id,
    status: 'shipped',
    createdAt: '2026-06-28T09:10:00Z',
    address: demoUser.addresses[0],
    paymentMethod: 'pse',
    lines: [
      {
        productId: 'p-007',
        name: 'Lámpara de fique tejido',
        image:
          'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=200&q=70',
        price: 124_960,
        quantity: 1,
      },
    ],
    subtotal: 124_960,
    discount: 12_496,
    shipping: 12_000,
    total: 124_464,
    couponCode: 'ARTESANO10',
  },
]
