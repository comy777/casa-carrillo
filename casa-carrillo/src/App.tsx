import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { queryClient } from '@/services/queryClient'
import { router } from '@/routes'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'

/**
 * Composición de providers globales:
 * - HelmetProvider: meta tags dinámicos (SEO)
 * - QueryClientProvider: caché de datos de servidor (React Query)
 * - RouterProvider: enrutamiento con lazy loading
 * - Toaster: notificaciones toast
 * - ErrorBoundary: red de seguridad ante crashes
 */
export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#43301f',
                color: '#fbf8f3',
                borderRadius: '9999px',
                fontSize: '14px',
              },
            }}
          />
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}
