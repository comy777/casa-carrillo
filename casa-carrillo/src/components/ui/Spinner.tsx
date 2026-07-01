import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

export function Spinner({ className, label = 'Cargando…' }: { className?: string; label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-brown-600" role="status">
      <Loader2 className={cn('h-8 w-8 animate-spin text-terracotta-500', className)} aria-hidden />
      <span className="text-sm">{label}</span>
    </div>
  )
}
