import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { paths } from './paths'

/** Protege rutas privadas: redirige a login guardando el destino previo. */
export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={paths.login} state={{ from: location.pathname }} replace />
  }
  return <Outlet />
}
