import { z } from 'zod'

export const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Ingresa tu nombre completo'),
  email: z.string().min(1, 'El correo es obligatorio').email('Correo inválido'),
  phone: z.string().min(7, 'Teléfono inválido'),
  line1: z.string().min(5, 'Ingresa la dirección'),
  line2: z.string().optional(),
  city: z.string().min(2, 'Ingresa la ciudad'),
  state: z.string().min(2, 'Ingresa el departamento'),
  zip: z.string().min(3, 'Código postal inválido'),
  paymentMethod: z.enum(['card', 'pse', 'cash']),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
