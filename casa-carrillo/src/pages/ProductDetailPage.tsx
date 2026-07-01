import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, Heart, PackageX, ShoppingBag, Truck } from 'lucide-react'
import toast from 'react-hot-toast'
import type { ProductVariant } from '@/types'
import { Seo } from '@/components/common/Seo'
import { Spinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PriceTag } from '@/components/ui/PriceTag'
import { Rating } from '@/components/ui/Rating'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { ProductGallery } from '@/features/products/components/ProductGallery'
import { ProductGrid } from '@/features/products/components/ProductGrid'
import { useProduct, useRelatedProducts } from '@/features/products/hooks/useProduct'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { cn } from '@/utils/cn'
import { finalPrice } from '@/utils/format'
import { paths } from '@/routes/paths'

export default function ProductDetailPage() {
  const { slug = '' } = useParams()
  const { data: product, isLoading, isError } = useProduct(slug)
  const { data: related } = useRelatedProducts(slug)

  const addItem = useCartStore((s) => s.addItem)
  const toggleWishlist = useWishlistStore((s) => s.toggle)
  const inWishlist = useWishlistStore((s) => (product ? s.items.some((p) => p.id === product.id) : false))

  const [variant, setVariant] = useState<ProductVariant | undefined>(undefined)
  const [quantity, setQuantity] = useState(1)

  if (isLoading) return <Spinner label="Cargando producto…" />

  if (isError || !product) {
    return (
      <div className="container-page">
        <EmptyState
          icon={PackageX}
          title="Producto no encontrado"
          description="La pieza que buscas no existe o fue retirada."
          action={
            <Link to={paths.catalog}>
              <Button>Volver al catálogo</Button>
            </Link>
          }
        />
      </div>
    )
  }

  // Si el producto tiene variantes, se debe elegir una antes de agregar.
  const hasVariants = product.variants.length > 0
  const selected = variant ?? (hasVariants ? undefined : undefined)
  const stock = selected ? selected.stock : product.stock
  const outOfStock = hasVariants ? !selected || selected.stock === 0 : product.stock === 0
  const unitPrice = finalPrice(
    product.price + (selected?.priceDelta ?? 0),
    product.discount,
  )

  const handleAdd = () => {
    if (hasVariants && !selected) {
      toast.error('Selecciona una variante')
      return
    }
    addItem(product, quantity, selected)
    toast.success(`${product.name} agregado al carrito`)
  }

  return (
    <>
      <Seo
        title={product.name}
        description={product.description.slice(0, 155)}
        image={product.images[0].url}
        path={paths.product(product.slug)}
        type="product"
      />

      <div className="container-page py-10">
        <nav className="mb-6 text-sm text-brown-600" aria-label="Migas de pan">
          <Link to={paths.catalog} className="hover:text-terracotta-600">
            Catálogo
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brown-800">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} />

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-terracotta-500">
              {product.origin}
            </p>
            <h1 className="text-3xl md:text-4xl">{product.name}</h1>

            <div className="mt-3 flex items-center gap-3">
              <Rating value={product.rating} count={product.reviewsCount} />
            </div>

            <div className="mt-5 flex items-center gap-3">
              <PriceTag price={product.price + (selected?.priceDelta ?? 0)} discount={product.discount} size="lg" />
              {product.discount > 0 && <Badge tone="terracotta">-{product.discount}%</Badge>}
            </div>

            <p className="mt-5 leading-relaxed text-brown-700">{product.description}</p>

            {/* Materiales */}
            <div className="mt-6 flex flex-wrap gap-2">
              {product.materials.map((m) => (
                <span key={m} className="rounded-full bg-sand-100 px-3 py-1 text-sm text-brown-700">
                  {m}
                </span>
              ))}
            </div>

            {/* Variantes */}
            {hasVariants && (
              <fieldset className="mt-6">
                <legend className="mb-2 text-sm font-bold text-brown-700">
                  {product.variants[0].name}
                </legend>
                <div className="flex flex-wrap gap-2" role="radiogroup">
                  {product.variants.map((v) => {
                    const disabled = v.stock === 0
                    const active = selected?.id === v.id
                    return (
                      <button
                        key={v.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        disabled={disabled}
                        onClick={() => {
                          setVariant(v)
                          setQuantity(1)
                        }}
                        className={cn(
                          'rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors',
                          active
                            ? 'border-terracotta-500 bg-sand-100 text-brown-900'
                            : 'border-sand-200 text-brown-700 hover:border-sand-300',
                          disabled && 'cursor-not-allowed line-through opacity-40',
                        )}
                      >
                        {v.value}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            )}

            {/* Stock */}
            <p className="mt-5 flex items-center gap-2 text-sm">
              {outOfStock ? (
                <Badge tone="danger">Agotado</Badge>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-green-700">
                  <Check className="h-4 w-4" aria-hidden />
                  {stock <= 5 ? `¡Solo quedan ${stock}!` : 'En stock'}
                </span>
              )}
            </p>

            {/* Acciones */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <QuantitySelector value={quantity} onChange={setQuantity} max={Math.max(1, stock)} />
              <Button size="lg" onClick={handleAdd} disabled={outOfStock} className="min-w-48 flex-1">
                <ShoppingBag className="h-5 w-5" aria-hidden />
                Agregar al carrito · {new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  maximumFractionDigits: 0,
                }).format(unitPrice * quantity)}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => toggleWishlist(product)}
                aria-pressed={inWishlist}
                aria-label="Agregar a favoritos"
                className="w-13 px-0"
              >
                <Heart className={cn('h-5 w-5', inWishlist && 'fill-terracotta-500 text-terracotta-500')} aria-hidden />
              </Button>
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm text-brown-600">
              <Truck className="h-4 w-4" aria-hidden /> Envío gratis en compras superiores a $150.000
            </p>
          </div>
        </div>

        {/* Relacionados */}
        {related && related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-title">
            <h2 id="related-title" className="mb-6 text-2xl md:text-3xl">
              También te puede gustar
            </h2>
            <ProductGrid products={related} />
          </section>
        )}
      </div>
    </>
  )
}
