import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Seo } from '@/components/common/Seo'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { useAuthStore } from '@/store/authStore'
import { paths } from '@/routes/paths'

export default function LoginPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const location = useLocation()
  const navigate = useNavigate()
  const from = (location.state as { from?: string } | null)?.from ?? paths.profile

  if (isAuthenticated) return <Navigate to={from} replace />

  return (
    <>
      <Seo title="Ingresar" path="/ingresar" />
      <div className="container-page flex justify-center py-16">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-card">
          <h1 className="text-center text-3xl">Bienvenida de nuevo</h1>
          <p className="mt-2 text-center text-brown-600">Ingresa para continuar tu compra</p>
          <div className="mt-8">
            <LoginForm onSuccess={() => navigate(from, { replace: true })} />
          </div>
          <p className="mt-6 text-center text-sm text-brown-600">
            ¿No tienes cuenta?{' '}
            <Link to={paths.register} className="font-semibold text-terracotta-600 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
