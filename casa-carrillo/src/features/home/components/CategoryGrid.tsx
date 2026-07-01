import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCategories } from '@/features/products/hooks/useCategories'
import { LazyImage } from '@/components/common/LazyImage'
import { Skeleton } from '@/components/ui/Skeleton'
import { paths } from '@/routes/paths'

export function CategoryGrid() {
  const { data: categories, isLoading } = useCategories()

  return (
    <section className="container-page py-16" aria-labelledby="cat-title">
      <div className="mb-8 text-center">
        <h2 id="cat-title" className="text-3xl md:text-4xl">
          Explora por categoría
        </h2>
        <p className="mt-2 text-brown-600">Encuentra la pieza perfecta para cada rincón</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))
          : categories?.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={paths.category(cat.slug)}
                  className="group relative block aspect-square overflow-hidden rounded-2xl shadow-soft"
                >
                  <LazyImage
                    src={cat.image}
                    alt={cat.name}
                    wrapperClassName="h-full w-full"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/70 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-3 text-center font-serif text-lg font-semibold text-cream-50">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
      </div>
    </section>
  )
}
