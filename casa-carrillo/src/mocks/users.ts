import type { User } from '@/types'

/** Usuario demo. Password: "artesania123" (validado en el mock de auth). */
export const demoUser: User = {
  id: 'u-001',
  name: 'María Fernanda Ruiz',
  email: 'demo@casacarrillo.co',
  avatar:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=70',
  createdAt: '2025-11-20T10:00:00Z',
  addresses: [
    {
      id: 'addr-001',
      label: 'Casa',
      fullName: 'María Fernanda Ruiz',
      phone: '+57 300 123 4567',
      line1: 'Calle 93 # 13-24',
      line2: 'Apto 402',
      city: 'Bogotá',
      state: 'Cundinamarca',
      zip: '110221',
      country: 'Colombia',
      isDefault: true,
    },
  ],
}

export const DEMO_CREDENTIALS = {
  email: 'demo@casacarrillo.co',
  password: 'artesania123',
}
