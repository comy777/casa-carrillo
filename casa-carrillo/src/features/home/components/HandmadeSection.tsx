import { motion } from 'framer-motion'
import { Hand, Leaf, HeartHandshake } from 'lucide-react'

const PILLARS = [
  {
    icon: Hand,
    title: 'Hecho a mano',
    text: 'Cada pieza es moldeada, tejida o tallada por artesanos, sin producción en masa.',
  },
  {
    icon: Leaf,
    title: 'Materiales nobles',
    text: 'Barro, fibras naturales y metales nobles trabajados con técnicas ancestrales.',
  },
  {
    icon: HeartHandshake,
    title: 'Comercio justo',
    text: 'Pagamos un precio justo que dignifica el trabajo de cada comunidad.',
  },
]

export function HandmadeSection() {
  return (
    <section className="container-page py-16" aria-labelledby="handmade-title">
      <div className="overflow-hidden rounded-3xl bg-brown-800 text-cream-50">
        <div className="grid md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=75"
            alt="Artesano trabajando el barro"
            className="h-64 w-full object-cover md:h-full"
          />
          <div className="p-8 md:p-12">
            <h2 id="handmade-title" className="text-3xl text-cream-50 md:text-4xl">
              El arte de lo hecho a mano
            </h2>
            <p className="mt-3 text-cream-100/80">
              Detrás de cada producto hay una persona, una historia y horas de dedicación.
            </p>
            <div className="mt-8 space-y-6">
              {PILLARS.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-terracotta-500">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-cream-50">{title}</h3>
                    <p className="text-sm text-cream-100/70">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
