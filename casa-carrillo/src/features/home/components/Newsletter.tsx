import { useState } from 'react'
import { Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/common/Reveal'

const emailSchema = z.string().email()

export function Newsletter() {
  const [email, setEmail] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailSchema.safeParse(email).success) {
      toast.error('Ingresa un correo válido')
      return
    }
    toast.success('¡Gracias por suscribirte! 🎉')
    setEmail('')
  }

  return (
    <section className="container-page py-16">
      <Reveal className="rounded-3xl bg-gradient-to-br from-terracotta-500 to-terracotta-700 p-8 text-center text-cream-50 md:p-14">
        <Mail className="mx-auto mb-4 h-10 w-10" aria-hidden />
        <h2 className="text-3xl text-cream-50 md:text-4xl">Únete a nuestra comunidad</h2>
        <p className="mx-auto mt-3 max-w-md text-cream-100/90">
          Recibe historias de artesanos, lanzamientos y un 10% en tu primera compra.
        </p>
        <form onSubmit={onSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className="h-12 flex-1 rounded-full px-5 text-brown-900 focus:outline-none focus:ring-2 focus:ring-cream-50"
          />
          <Button type="submit" variant="secondary" size="lg" className="shrink-0">
            Suscribirme
          </Button>
        </form>
      </Reveal>
    </section>
  )
}
