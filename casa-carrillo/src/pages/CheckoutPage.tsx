import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Address, CreateOrderPayload, Order, OrderLine } from '@/types'
import type { CheckoutFormValues } from '@/features/checkout/schemas'
import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { CheckoutForm } from '@/features/checkout/components/CheckoutForm'
import { CartSummary } from '@/features/cart/components/CartSummary'
import { useCartStore } from '@/store/cartStore'
import { useCartTotals } from '@/hooks/useCartTotals'
import { useCreateOrder } from '@/features/orders/hooks/useOrders'
import { useAuthStore } from '@/store/authStore'
import { itemUnitPrice } from '@/utils/cart'
import { getErrorMessage } from '@/services/api/client'
import { paths } from '@/routes/paths'

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items)
  const coupon = useCartStore((s) => s.coupon)
  const clear = useCartStore((s) => s.clear)
  const totals = useCartTotals()
  const addAddress = useAuthStore((s) => s.addAddress)
  const { mutateAsync, isPending } = useCreateOrder()
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null)

  // Sin items y sin orden confirmada: no hay nada que pagar.
  if (items.length === 0 && !confirmedOrder) {
    return <Navigate to={paths.cart} replace />
  }

  const handleSubmit = async (values: CheckoutFormValues) => {
    const address: Address = {
      id: `addr-${Date.now()}`,
      label: 'Envío',
      fullName: values.fullName,
      phone: values.phone,
      line1: values.line1,
      line2: values.line2,
      city: values.city,
      state: values.state,
      zip: values.zip,
      country: 'Colombia',
      isDefault: false,
    }

    const lines: OrderLine[] = items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      image: item.product.images[0].url,
      variantLabel: item.variant ? `${item.variant.name}: ${item.variant.value}` : undefined,
      price: itemUnitPrice(item),
      quantity: item.quantity,
    }))

    const payload: CreateOrderPayload = {
      lines,
      address,
      paymentMethod: values.paymentMethod,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      total: totals.total,
      couponCode: coupon?.code,
    }

    try {
      const order = await mutateAsync(payload)
      addAddress(address)
      clear()
      setConfirmedOrder(order)
      toast.success('¡Pedido confirmado!')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  if (confirmedOrder) {
    return (
      <>
        <Seo title="Pedido confirmado" path="/checkout" />
        <div className="container-page flex flex-col items-center py-20 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-600" aria-hidden />
          <h1 className="mt-4 text-3xl">¡Gracias por tu compra!</h1>
          <p className="mt-2 text-brown-600">
            Tu pedido <strong>{confirmedOrder.id}</strong> fue recibido. Te enviamos un correo con
            los detalles.
          </p>
          <div className="mt-8 flex gap-3">
            <Link to={paths.profile}>
              <Button variant="outline">Ver mis pedidos</Button>
            </Link>
            <Link to={paths.catalog}>
              <Button>Seguir comprando</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Seo title="Checkout" path="/checkout" />
      <div className="container-page py-10">
        <h1 className="mb-8 text-3xl md:text-4xl">Finalizar compra</h1>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <CheckoutForm onSubmit={handleSubmit} loading={isPending} />
          <div className="lg:sticky lg:top-24 lg:self-start">
            <CartSummary showCoupon={false} />
          </div>
        </div>
      </div>
    </>
  )
}
