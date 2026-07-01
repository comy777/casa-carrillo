import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormValues } from '../schemas'
import { useAuth } from '../hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const { register: registerUser, isRegistering } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = handleSubmit(async ({ name, email, password }) => {
    try {
      await registerUser({ name, email, password })
      onSuccess?.()
    } catch {
      /* toast maneja el error */
    }
  })

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Input label="Nombre completo" autoComplete="name" error={errors.name?.message} {...register('name')} />
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
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        label="Confirmar contraseña"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Button type="submit" fullWidth loading={isRegistering}>
        Crear cuenta
      </Button>
    </form>
  )
}
