import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard, Landmark, Wallet } from 'lucide-react'
import type { PaymentMethod } from '@/types'
import { checkoutSchema, type CheckoutFormValues } from '../schemas'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import { useAuthStore } from '@/store/authStore'

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { value: 'card', label: 'Tarjeta', icon: CreditCard },
  { value: 'pse', label: 'PSE', icon: Landmark },
  { value: 'cash', label: 'Contra entrega', icon: Wallet },
]

export function CheckoutForm({
  onSubmit,
  loading,
}: {
  onSubmit: (values: CheckoutFormValues) => void
  loading?: boolean
}) {
  const user = useAuthStore((s) => s.user)
  const defaultAddress = user?.addresses.find((a) => a.isDefault)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: defaultAddress?.fullName ?? user?.name ?? '',
      email: user?.email ?? '',
      phone: defaultAddress?.phone ?? '',
      line1: defaultAddress?.line1 ?? '',
      line2: defaultAddress?.line2 ?? '',
      city: defaultAddress?.city ?? '',
      state: defaultAddress?.state ?? '',
      zip: defaultAddress?.zip ?? '',
      paymentMethod: 'card',
    },
  })

  const paymentMethod = watch('paymentMethod')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <section className="rounded-2xl bg-white p-5 shadow-soft">
        <h2 className="mb-4 text-lg">Datos de contacto</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Nombre completo" error={errors.fullName?.message} {...register('fullName')} />
          <Input label="Teléfono" error={errors.phone?.message} {...register('phone')} />
          <div className="sm:col-span-2">
            <Input label="Correo" type="email" error={errors.email?.message} {...register('email')} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-soft">
        <h2 className="mb-4 text-lg">Dirección de envío</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input label="Dirección" error={errors.line1?.message} {...register('line1')} />
          </div>
          <div className="sm:col-span-2">
            <Input label="Apartamento / referencia (opcional)" {...register('line2')} />
          </div>
          <Input label="Ciudad" error={errors.city?.message} {...register('city')} />
          <Input label="Departamento" error={errors.state?.message} {...register('state')} />
          <Input label="Código postal" error={errors.zip?.message} {...register('zip')} />
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-soft">
        <h2 className="mb-4 text-lg">Método de pago</h2>
        <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Método de pago">
          {PAYMENT_OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={paymentMethod === value}
              onClick={() => setValue('paymentMethod', value)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-semibold transition-colors',
                paymentMethod === value
                  ? 'border-terracotta-500 bg-sand-100 text-brown-900'
                  : 'border-sand-200 text-brown-600 hover:border-sand-300',
              )}
            >
              <Icon className="h-6 w-6" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </section>

      <Button type="submit" size="lg" fullWidth loading={loading}>
        Confirmar pedido
      </Button>
    </form>
  )
}
