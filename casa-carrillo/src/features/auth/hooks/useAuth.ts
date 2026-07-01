import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { authService } from '@/services/authService'
import { getErrorMessage } from '@/services/api/client'
import { useAuthStore } from '@/store/authStore'
import type { LoginPayload, RegisterPayload } from '@/types'

/** Encapsula login/registro/logout conectando el service con el store. */
export function useAuth() {
  const setSession = useAuthStore((s) => s.setSession)
  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: ({ user, token }) => {
      setSession(user, token)
      toast.success(`¡Bienvenida de nuevo, ${user.name.split(' ')[0]}!`)
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: ({ user, token }) => {
      setSession(user, token)
      toast.success('Cuenta creada con éxito 🎉')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    logout: () => {
      logout()
      toast('Sesión cerrada')
    },
  }
}
