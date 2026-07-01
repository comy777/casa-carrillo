import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string
}

/**
 * Imagen con lazy loading nativo + fade-in al cargar y placeholder shimmer.
 * `alt` es obligatorio a nivel de uso para accesibilidad.
 */
export function LazyImage({ className, wrapperClassName, alt, ...props }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-sand-100', wrapperClassName)}>
      {!loaded && <div className="absolute inset-0 shimmer" aria-hidden />}
      <img
        loading="lazy"
        decoding="async"
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        {...props}
      />
    </div>
  )
}
