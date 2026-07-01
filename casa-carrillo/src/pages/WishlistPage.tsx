import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { ProductGrid } from '@/features/products/components/ProductGrid'
import { useWishlistStore } from '@/store/wishlistStore'
import { paths } from '@/routes/paths'

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items)

  return (
    <>
      <Seo title="Favoritos" path="/favoritos" />
      <div className="container-page py-10">
        <h1 className="mb-8 text-3xl md:text-4xl">Tus favoritos</h1>
        {items.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Aún no tienes favoritos"
            description="Guarda las piezas que más te gusten para encontrarlas fácilmente."
            action={
              <Link to={paths.catalog}>
                <Button>Descubrir artesanías</Button>
              </Link>
            }
          />
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </>
  )
}
