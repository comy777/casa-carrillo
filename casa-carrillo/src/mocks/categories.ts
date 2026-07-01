import type { Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'cat-ceramica',
    slug: 'ceramica',
    name: 'Cerámica',
    description:
      'Vasijas, platos y tazas moldeados a mano con técnicas ancestrales.',
    image:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=70',
    icon: 'Coffee',
  },
  {
    id: 'cat-tejidos',
    slug: 'tejidos',
    name: 'Tejidos',
    description: 'Mochilas, ruanas y textiles tejidos con fibras naturales.',
    image:
      'https://images.unsplash.com/photo-1528732263440-5344a1a86723?auto=format&fit=crop&w=800&q=70',
    icon: 'Shirt',
  },
  {
    id: 'cat-joyeria',
    slug: 'joyeria',
    name: 'Joyería artesanal',
    description: 'Piezas únicas en filigrana, semillas y metales nobles.',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=70',
    icon: 'Gem',
  },
  {
    id: 'cat-decoracion',
    slug: 'decoracion',
    name: 'Decoración',
    description: 'Objetos que dan calidez y carácter a tu hogar.',
    image:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=800&q=70',
    icon: 'Home',
  },
  {
    id: 'cat-personalizados',
    slug: 'personalizados',
    name: 'Personalizados',
    description: 'Piezas hechas a tu medida, con tu historia grabada.',
    image:
      'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=800&q=70',
    icon: 'Sparkles',
  },
]

export const categoryById = (id: string): Category | undefined =>
  categories.find((c) => c.id === id)

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug)
