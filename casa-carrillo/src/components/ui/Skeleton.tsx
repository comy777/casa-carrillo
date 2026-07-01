import { cn } from '@/utils/cn'

/** Bloque de carga con efecto shimmer. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('shimmer rounded-lg', className)} aria-hidden />
}

/** Skeleton con forma de ProductCard, reutilizado en grids de carga. */
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-soft">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </div>
  )
}
