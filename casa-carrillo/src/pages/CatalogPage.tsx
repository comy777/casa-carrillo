import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import type { ProductFilters as Filters, ProductSort } from '@/types'
import { Seo } from '@/components/common/Seo'
import { Select } from '@/components/ui/Select'
import { Pagination } from '@/components/ui/Pagination'
import { Drawer } from '@/components/ui/Drawer'
import { ProductGrid } from '@/features/products/components/ProductGrid'
import { ProductFilters } from '@/features/products/components/ProductFilters'
import { useProducts } from '@/features/products/hooks/useProducts'
import { useCategories } from '@/features/products/hooks/useCategories'
import { useDebounce } from '@/hooks/useDebounce'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: 'popularity', label: 'Más populares' },
  { value: 'newest', label: 'Novedades' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
]

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: categories } = useCategories()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [filters, setFilters] = useState<Filters>({
    sort: 'popularity',
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  // Sincroniza ?categoria=slug -> categoryId cuando llegan las categorías.
  useEffect(() => {
    const slug = searchParams.get('categoria')
    const id = categories?.find((c) => c.slug === slug)?.id
    setFilters((f) => ({ ...f, categoryId: id, page: 1 }))
  }, [searchParams, categories])

  const debouncedSearch = useDebounce(filters.search, 350)
  const queryFilters = useMemo<Filters>(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch],
  )

  const { data, isLoading, isFetching } = useProducts(queryFilters)

  const patch = (p: Partial<Filters>) => setFilters((f) => ({ ...f, ...p }))

  const reset = () => {
    setFilters({ sort: 'popularity', page: 1, pageSize: DEFAULT_PAGE_SIZE })
    setSearchParams({})
  }

  const filtersPanel = (
    <ProductFilters
      filters={filters}
      categories={categories}
      onChange={patch}
      onReset={reset}
    />
  )

  return (
    <>
      <Seo
        title="Catálogo"
        description="Explora todas nuestras artesanías: cerámica, tejidos, joyería y decoración hechas a mano."
        path="/catalogo"
      />
      <div className="container-page py-10">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl">Catálogo</h1>
          <p className="mt-2 text-brown-600">
            {data ? `${data.total} piezas artesanales` : 'Cargando piezas…'}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block">{filtersPanel}</aside>

          <div>
            {/* Toolbar */}
            <div className="mb-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-sand-300 px-4 py-2 text-sm font-semibold text-brown-700 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden /> Filtros
              </button>
              <div className="ml-auto w-56">
                <Select
                  aria-label="Ordenar por"
                  options={SORT_OPTIONS}
                  value={filters.sort}
                  onChange={(e) => patch({ sort: e.target.value as ProductSort, page: 1 })}
                />
              </div>
            </div>

            <div className={isFetching && !isLoading ? 'opacity-60 transition-opacity' : undefined}>
              <ProductGrid products={data?.items} loading={isLoading} skeletonCount={DEFAULT_PAGE_SIZE} />
            </div>

            {data && data.totalPages > 1 && (
              <div className="mt-10">
                <Pagination
                  page={data.page}
                  totalPages={data.totalPages}
                  onChange={(page) => patch({ page })}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filtros mobile en drawer */}
      <Drawer open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} title="Filtros">
        <div className="p-5">{filtersPanel}</div>
      </Drawer>
    </>
  )
}
