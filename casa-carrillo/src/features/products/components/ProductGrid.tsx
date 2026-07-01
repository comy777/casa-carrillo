import { PackageOpen } from 'lucide-react'
import type { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'

interface ProductGridProps {
  products?: Product[]
  loading?: boolean
  skeletonCount?: number
}

/** Grid responsive de productos con estados de carga y vacío. */
export function ProductGrid({ products, loading, skeletonCount = 6 }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon={PackageOpen}
        title="No encontramos productos"
        description="Prueba ajustando los filtros o la búsqueda."
      />
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
