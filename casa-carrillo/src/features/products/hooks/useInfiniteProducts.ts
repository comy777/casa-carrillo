import { useInfiniteQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import type { ProductFilters } from '@/types'

/**
 * Variante con scroll infinito (opcional). Acumula páginas.
 * `filters` no debe incluir `page` — lo maneja el hook.
 */
export function useInfiniteProducts(filters: Omit<ProductFilters, 'page'>) {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', filters],
    queryFn: ({ pageParam }) => productService.list({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  })
}
