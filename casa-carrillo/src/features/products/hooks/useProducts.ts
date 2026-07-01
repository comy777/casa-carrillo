import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import { queryKeys } from '@/services/queryClient'
import type { ProductFilters } from '@/types'

/** Lista paginada de productos según filtros. Mantiene datos previos al pasar de página. */
export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: queryKeys.products(filters),
    queryFn: () => productService.list(filters),
    placeholderData: keepPreviousData,
  })
}
