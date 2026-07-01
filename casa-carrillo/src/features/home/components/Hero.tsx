import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { paths } from '@/routes/paths'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream-100 to-sand-100">
      <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full bg-terracotta-500/10 px-4 py-1.5 text-sm font-semibold text-terracotta-600">
            Hecho a mano en Colombia 🇨🇴
          </span>
          <h1 className="text-balance text-4xl leading-tight md:text-6xl">
            Artesanías con alma para tu hogar
          </h1>
          <p className="mt-5 max-w-md text-lg text-brown-600">
            Cerámica, tejidos, joyería y decoración creados por manos artesanas.
            Cada pieza cuenta una historia de cultura y tradición.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={paths.catalog}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-terracotta-500 px-7 font-semibold text-cream-50 shadow-soft transition-colors hover:bg-terracotta-600"
            >
              Explorar catálogo <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=75"
            alt="Vasijas de cerámica artesanal"
            className="aspect-4/5 w-full rounded-3xl object-cover shadow-card"
          />
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-4 shadow-card sm:block">
            <p className="font-serif text-2xl font-semibold text-terracotta-600">+120</p>
            <p className="text-sm text-brown-600">piezas únicas</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
