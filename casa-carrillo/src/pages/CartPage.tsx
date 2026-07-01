import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { CartItemRow } from '@/features/cart/components/CartItemRow'
import { CartSummary } from '@/features/cart/components/CartSummary'
import { useCartStore } from '@/store/cartStore'
import { paths } from '@/routes/paths'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const clear = useCartStore((s) => s.clear)
  const navigate = useNavigate()

  return (
    <>
      <Seo title="Carrito" path="/carrito" />
      <div className="container-page py-10">
        <h1 className="mb-8 text-3xl md:text-4xl">Tu carrito</h1>

        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Tu carrito está vacío"
            description="Aún no has agregado piezas. Explora nuestro catálogo artesanal."
            action={
              <Link to={paths.catalog}>
                <Button>Ir al catálogo</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="divide-y divide-sand-200 rounded-2xl bg-white px-5 shadow-soft">
                {items.map((item) => (
                  <CartItemRow key={item.key} item={item} />
                ))}
              </div>
              <button
                type="button"
                onClick={clear}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brown-600 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" aria-hidden /> Vaciar carrito
              </button>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <CartSummary
                footer={
                  <Button fullWidth size="lg" onClick={() => navigate(paths.checkout)}>
                    Finalizar compra
                  </Button>
                }
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
