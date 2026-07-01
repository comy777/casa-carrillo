import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormValues } from '../schemas'
import { useAuth } from '../hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { DEMO_CREDENTIALS } from '@/mocks/users'

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const { login, isLoggingIn } = useAuth()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login(values)
      onSuccess?.()
    } catch {
      /* el error ya se muestra vía toast en useAuth */
    }
  })

  const fillDemo = () => {
    setValue('email', DEMO_CREDENTIALS.email)
    setValue('password', DEMO_CREDENTIALS.password)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Input
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" fullWidth loading={isLoggingIn}>
        Ingresar
      </Button>
      <button
        type="button"
        onClick={fillDemo}
        className="w-full text-center text-sm text-brown-600 hover:text-terracotta-600 hover:underline"
      >
        Usar credenciales de demo
      </button>
    </form>
  )
}
