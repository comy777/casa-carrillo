import { Quote } from 'lucide-react'
import { Rating } from '@/components/ui/Rating'

const TESTIMONIALS = [
  {
    name: 'Laura Gómez',
    city: 'Medellín',
    rating: 5,
    text: 'La mochila Wayúu superó mis expectativas. Se nota el trabajo y el amor en cada detalle.',
  },
  {
    name: 'Andrés Peña',
    city: 'Bogotá',
    rating: 5,
    text: 'Compré una vasija de regalo y llegó impecable. El empaque también es hermoso y sostenible.',
  },
  {
    name: 'Valentina Ríos',
    city: 'Cali',
    rating: 4,
    text: 'Me encanta saber el origen de cada pieza. Es comprar con conciencia y con gusto.',
  },
]

export function Testimonials() {
  return (
    <section className="bg-sand-100 py-16" aria-labelledby="testi-title">
      <div className="container-page">
        <div className="mb-10 text-center">
          <h2 id="testi-title" className="text-3xl md:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-2xl bg-white p-6 shadow-soft">
              <Quote className="mb-3 h-8 w-8 text-terracotta-500/40" aria-hidden />
              <blockquote className="flex-1 text-brown-700">{t.text}</blockquote>
              <figcaption className="mt-4 border-t border-sand-200 pt-4">
                <Rating value={t.rating} size={14} className="mb-1" />
                <p className="font-serif font-semibold">{t.name}</p>
                <p className="text-sm text-brown-600">{t.city}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
