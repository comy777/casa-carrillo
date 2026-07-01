import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '@/features/products/hooks/useProducts'
import { ProductGrid } from '@/features/products/components/ProductGrid'
import { paths } from '@/routes/paths'

export function FeaturedProducts() {
  // Reutilizamos el listado ordenado por popularidad como "destacados".
  const { data, isLoading } = useProducts({ sort: 'popularity', pageSize: 6 })

  return (
    <section className="bg-cream-100 py-16" aria-labelledby="featured-title">
      <div className="container-page">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 id="featured-title" className="text-3xl md:text-4xl">
              Piezas destacadas
            </h2>
            <p className="mt-2 text-brown-600">Las favoritas de nuestra comunidad</p>
          </div>
          <Link
            to={paths.catalog}
            className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-terracotta-600 hover:underline"
          >
            Ver todo <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ProductGrid products={data?.items} loading={isLoading} skeletonCount={6} />
      </div>
    </section>
  )
}
