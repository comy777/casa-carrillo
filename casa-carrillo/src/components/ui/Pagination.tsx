import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Paginación">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
        className="flex h-10 w-10 items-center justify-center rounded-full text-brown-700 transition-colors hover:bg-sand-100 disabled:opacity-40"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={cn(
            'h-10 w-10 rounded-full text-sm font-semibold transition-colors',
            p === page
              ? 'bg-terracotta-500 text-cream-50'
              : 'text-brown-700 hover:bg-sand-100',
          )}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Página siguiente"
        className="flex h-10 w-10 items-center justify-center rounded-full text-brown-700 transition-colors hover:bg-sand-100 disabled:opacity-40"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </nav>
  )
}
