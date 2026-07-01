import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Seo } from '@/components/common/Seo'
import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { useAuthStore } from '@/store/authStore'
import { paths } from '@/routes/paths'

export default function RegisterPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const navigate = useNavigate()

  if (isAuthenticated) return <Navigate to={paths.profile} replace />

  return (
    <>
      <Seo title="Crear cuenta" path="/registro" />
      <div className="container-page flex justify-center py-16">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-card">
          <h1 className="text-center text-3xl">Crea tu cuenta</h1>
          <p className="mt-2 text-center text-brown-600">Únete a la comunidad Casa Carrillo</p>
          <div className="mt-8">
            <RegisterForm onSuccess={() => navigate(paths.profile, { replace: true })} />
          </div>
          <p className="mt-6 text-center text-sm text-brown-600">
            ¿Ya tienes cuenta?{' '}
            <Link to={paths.login} className="font-semibold text-terracotta-600 hover:underline">
              Ingresa
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
