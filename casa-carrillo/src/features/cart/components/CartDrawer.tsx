import { useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { Drawer } from '@/components/ui/Drawer'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatCurrency } from '@/utils/format'
import { paths } from '@/routes/paths'
import { useUiStore } from '@/store/uiStore'
import { useCartStore } from '@/store/cartStore'
import { useCartTotals } from '@/hooks/useCartTotals'
import { CartItemRow } from './CartItemRow'

/** Drawer lateral del carrito. Vive en el layout, se abre desde la Navbar. */
export function CartDrawer() {
  const open = useUiStore((s) => s.cartOpen)
  const closeCart = useUiStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const totals = useCartTotals()
  const navigate = useNavigate()

  const goTo = (path: string) => {
    closeCart()
    navigate(path)
  }

  return (
    <Drawer open={open} onClose={closeCart} title={`Tu carrito (${totals.itemCount})`}>
      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Tu carrito está vacío"
          description="Descubre piezas únicas hechas a mano."
          action={<Button onClick={() => goTo(paths.catalog)}>Ver catálogo</Button>}
        />
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex-1 divide-y divide-sand-200 overflow-y-auto px-5">
            {items.map((item) => (
              <CartItemRow key={item.key} item={item} compact />
            ))}
          </div>

          <div className="border-t border-sand-200 bg-cream-50 p-5">
            <div className="mb-4 flex items-baseline justify-between">
              <span className="font-serif text-lg">Total</span>
              <span className="font-serif text-2xl font-semibold">
                {formatCurrency(totals.total)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Button fullWidth onClick={() => goTo(paths.checkout)}>
                Finalizar compra
              </Button>
              <Button variant="ghost" fullWidth onClick={() => goTo(paths.cart)}>
                Ver carrito
              </Button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  )
}
