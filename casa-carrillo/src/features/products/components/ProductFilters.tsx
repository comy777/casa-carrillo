import { Search, SlidersHorizontal, X } from 'lucide-react'
import type { Category, ProductFilters as Filters } from '@/types'
import { cn } from '@/utils/cn'

interface Props {
  filters: Filters
  categories?: Category[]
  onChange: (patch: Partial<Filters>) => void
  onReset: () => void
}

const PRICE_RANGES: { label: string; min?: number; max?: number }[] = [
  { label: 'Todos', min: undefined, max: undefined },
  { label: 'Menos de $50.000', max: 50_000 },
  { label: '$50.000 – $100.000', min: 50_000, max: 100_000 },
  { label: '$100.000 – $200.000', min: 100_000, max: 200_000 },
  { label: 'Más de $200.000', min: 200_000 },
]

export function ProductFilters({ filters, categories, onChange, onReset }: Props) {
  const activeRange = PRICE_RANGES.find(
    (r) => r.min === filters.minPrice && r.max === filters.maxPrice,
  )

  return (
    <div className="space-y-8">
      {/* Búsqueda */}
      <div>
        <label htmlFor="filter-search" className="sr-only">
          Buscar productos
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-brown-600/60" aria-hidden />
          <input
            id="filter-search"
            type="search"
            value={filters.search ?? ''}
            onChange={(e) => onChange({ search: e.target.value, page: 1 })}
            placeholder="Buscar artesanías…"
            className="h-11 w-full rounded-full border border-sand-300 bg-white pl-11 pr-4 focus:border-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500/30"
          />
        </div>
      </div>

      {/* Categorías */}
      <fieldset>
        <legend className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brown-700">
          <SlidersHorizontal className="h-4 w-4" aria-hidden /> Categorías
        </legend>
        <ul className="space-y-1">
          <li>
            <FilterPill
              active={!filters.categoryId}
              onClick={() => onChange({ categoryId: undefined, page: 1 })}
            >
              Todas
            </FilterPill>
          </li>
          {categories?.map((c) => (
            <li key={c.id}>
              <FilterPill
                active={filters.categoryId === c.id}
                onClick={() => onChange({ categoryId: c.id, page: 1 })}
              >
                {c.name}
              </FilterPill>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* Precio */}
      <fieldset>
        <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-brown-700">Precio</legend>
        <ul className="space-y-1">
          {PRICE_RANGES.map((r) => (
            <li key={r.label}>
              <FilterPill
                active={activeRange?.label === r.label}
                onClick={() => onChange({ minPrice: r.min, maxPrice: r.max, page: 1 })}
              >
                {r.label}
              </FilterPill>
            </li>
          ))}
        </ul>
      </fieldset>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta-600 hover:underline"
      >
        <X className="h-4 w-4" aria-hidden /> Limpiar filtros
      </button>
    </div>
  )
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
        active ? 'bg-terracotta-500 font-semibold text-cream-50' : 'text-brown-700 hover:bg-sand-100',
      )}
    >
      {children}
    </button>
  )
}
