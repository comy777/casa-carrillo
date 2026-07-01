import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Product } from '@/types'
import { paths } from '@/routes/paths'
import { cn } from '@/utils/cn'
import { LazyImage } from '@/components/common/LazyImage'
import { Badge } from '@/components/ui/Badge'
import { PriceTag } from '@/components/ui/PriceTag'
import { Rating } from '@/components/ui/Rating'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

interface ProductCardProps {
  product: Product
}

function ProductCardBase({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const toggleWishlist = useWishlistStore((s) => s.toggle)
  const inWishlist = useWishlistStore((s) => s.items.some((p) => p.id === product.id))

  const outOfStock = product.stock === 0

  const handleAdd = () => {
    addItem(product, 1)
    toast.success(`${product.name} agregado al carrito`)
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow hover:shadow-card"
    >
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        {product.discount > 0 && <Badge tone="terracotta">-{product.discount}%</Badge>}
        {outOfStock && <Badge tone="danger">Agotado</Badge>}
      </div>

      {/* Wishlist */}
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-label={inWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        aria-pressed={inWishlist}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brown-700 shadow-soft backdrop-blur transition-colors hover:text-terracotta-500"
      >
        <Heart className={cn('h-4.5 w-4.5', inWishlist && 'fill-terracotta-500 text-terracotta-500')} aria-hidden />
      </button>

      <Link to={paths.product(product.slug)} className="block" aria-label={product.name}>
        <LazyImage
          src={product.images[0].url}
          alt={product.images[0].alt}
          wrapperClassName="aspect-square"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-terracotta-500">
          {product.origin}
        </p>
        <h3 className="mb-2 line-clamp-2 font-serif text-lg leading-snug">
          <Link to={paths.product(product.slug)} className="hover:text-terracotta-600">
            {product.name}
          </Link>
        </h3>
        <Rating value={product.rating} count={product.reviewsCount} className="mb-3" />

        <div className="mt-auto flex items-center justify-between gap-2">
          <PriceTag price={product.price} discount={product.discount} />
          <button
            type="button"
            onClick={handleAdd}
            disabled={outOfStock}
            aria-label={`Agregar ${product.name} al carrito`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-terracotta-500 text-cream-50 transition-colors hover:bg-terracotta-600 disabled:opacity-40"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

/** Memoizado: evita re-renders al cambiar estado global no relacionado. */
export const ProductCard = memo(ProductCardBase)
