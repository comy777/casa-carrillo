import { useState } from 'react'
import { LogOut, MapPin, Package, User as UserIcon } from 'lucide-react'
import type { OrderStatus } from '@/types'
import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useOrders } from '@/features/orders/hooks/useOrders'
import { formatCurrency, formatDate } from '@/utils/format'
import { cn } from '@/utils/cn'

type Tab = 'orders' | 'profile' | 'addresses'

const STATUS_META: Record<OrderStatus, { label: string; tone: 'success' | 'terracotta' | 'sand' | 'danger' | 'brown' }> = {
  pending: { label: 'Pendiente', tone: 'sand' },
  processing: { label: 'Procesando', tone: 'terracotta' },
  shipped: { label: 'Enviado', tone: 'brown' },
  delivered: { label: 'Entregado', tone: 'success' },
  cancelled: { label: 'Cancelado', tone: 'danger' },
}

const TABS: { id: Tab; label: string; icon: typeof Package }[] = [
  { id: 'orders', label: 'Mis pedidos', icon: Package },
  { id: 'profile', label: 'Datos personales', icon: UserIcon },
  { id: 'addresses', label: 'Direcciones', icon: MapPin },
]

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [tab, setTab] = useState<Tab>('orders')

  if (!user) return null

  return (
    <>
      <Seo title="Mi perfil" path="/perfil" />
      <div className="container-page py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {user.avatar && (
              <img src={user.avatar} alt="" className="h-14 w-14 rounded-full object-cover" />
            )}
            <div>
              <h1 className="text-2xl">Hola, {user.name.split(' ')[0]}</h1>
              <p className="text-sm text-brown-600">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4" aria-hidden /> Cerrar sesión
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Secciones del perfil">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                aria-current={tab === id ? 'page' : undefined}
                className={cn(
                  'flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors',
                  tab === id ? 'bg-terracotta-500 text-cream-50' : 'text-brown-700 hover:bg-sand-100',
                )}
              >
                <Icon className="h-4.5 w-4.5" aria-hidden /> {label}
              </button>
            ))}
          </nav>

          <div>
            {tab === 'orders' && <OrdersTab />}
            {tab === 'profile' && <ProfileTab name={user.name} email={user.email} />}
            {tab === 'addresses' && <AddressesTab />}
          </div>
        </div>
      </div>
    </>
  )
}

function OrdersTab() {
  const { data: orders, isLoading } = useOrders()

  if (isLoading) return <Spinner />
  if (!orders || orders.length === 0) {
    return <EmptyState icon={Package} title="Aún no tienes pedidos" description="Cuando compres, verás tu historial aquí." />
  }

  return (
    <ul className="space-y-4">
      {orders.map((order) => {
        const meta = STATUS_META[order.status]
        return (
          <li key={order.id} className="rounded-2xl bg-white p-5 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-200 pb-3">
              <div>
                <p className="font-serif font-semibold">{order.id}</p>
                <p className="text-sm text-brown-600">{formatDate(order.createdAt)}</p>
              </div>
              <Badge tone={meta.tone}>{meta.label}</Badge>
            </div>
            <ul className="mt-3 space-y-2">
              {order.lines.map((line) => (
                <li key={line.productId + line.variantLabel} className="flex items-center gap-3">
                  <img src={line.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-semibold">{line.name}</p>
                    <p className="text-xs text-brown-600">
                      {line.quantity} × {formatCurrency(line.price)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-sand-200 pt-3 text-sm">
              <span className="text-brown-600">Total</span>
              <span className="font-serif font-semibold">{formatCurrency(order.total)}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function ProfileTab({ name, email }: { name: string; email: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft">
      <dl className="space-y-4">
        <div>
          <dt className="text-sm text-brown-600">Nombre</dt>
          <dd className="font-semibold">{name}</dd>
        </div>
        <div>
          <dt className="text-sm text-brown-600">Correo</dt>
          <dd className="font-semibold">{email}</dd>
        </div>
      </dl>
    </div>
  )
}

function AddressesTab() {
  const { user } = useAuth()
  if (!user) return null

  if (user.addresses.length === 0) {
    return <EmptyState icon={MapPin} title="Sin direcciones guardadas" description="Tus direcciones aparecerán al comprar." />
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {user.addresses.map((addr) => (
        <li key={addr.id} className="rounded-2xl bg-white p-5 shadow-soft">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-serif font-semibold">{addr.label}</span>
            {addr.isDefault && <Badge tone="sand">Principal</Badge>}
          </div>
          <p className="text-sm text-brown-700">{addr.fullName}</p>
          <p className="text-sm text-brown-600">
            {addr.line1}
            {addr.line2 ? `, ${addr.line2}` : ''}
          </p>
          <p className="text-sm text-brown-600">
            {addr.city}, {addr.state}
          </p>
          <p className="text-sm text-brown-600">{addr.phone}</p>
        </li>
      ))}
    </ul>
  )
}
