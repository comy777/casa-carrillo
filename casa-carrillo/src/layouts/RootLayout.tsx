import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { CartDrawer } from '@/features/cart/components/CartDrawer'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { Spinner } from '@/components/ui/Spinner'

/** Shell de la app: navbar + contenido (rutas) + footer + drawer del carrito. */
export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main id="contenido" className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<Spinner label="Cargando página…" />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
