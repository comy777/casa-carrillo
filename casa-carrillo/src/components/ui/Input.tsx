import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const autoId = useId()
    const inputId = id ?? autoId
    const errorId = `${inputId}-error`

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-semibold text-brown-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'h-11 w-full rounded-xl border bg-white px-4 text-brown-900 placeholder:text-brown-600/50',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta-500/40',
            error ? 'border-red-400' : 'border-sand-300 focus:border-terracotta-500',
            className,
          )}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
