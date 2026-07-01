import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { couponService } from '@/services/couponService'
import { getErrorMessage } from '@/services/api/client'
import { useCartStore } from '@/store/cartStore'
import { useCartTotals } from '@/hooks/useCartTotals'

/** Valida un cupón contra el service y lo aplica al carrito. */
export function useCoupon() {
  const applyCoupon = useCartStore((s) => s.applyCoupon)
  const removeCoupon = useCartStore((s) => s.removeCoupon)
  const coupon = useCartStore((s) => s.coupon)
  const { subtotal } = useCartTotals()

  const mutation = useMutation({
    mutationFn: (code: string) => couponService.validate(code),
    onSuccess: (coupon) => {
      if (subtotal < coupon.minPurchase) {
        toast.error(
          `Este cupón requiere una compra mínima de $${coupon.minPurchase.toLocaleString('es-CO')}`,
        )
        return
      }
      applyCoupon(coupon)
      toast.success(`Cupón ${coupon.code} aplicado`)
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  return {
    coupon,
    applyCode: mutation.mutate,
    isValidating: mutation.isPending,
    removeCoupon: () => {
      removeCoupon()
      toast('Cupón removido')
    },
  }
}
