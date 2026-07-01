import { useQuery } from '@tanstack/react-query'
import { categoryService } from '@/services/categoryService'
import { queryKeys } from '@/services/queryClient'

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories(),
    queryFn: () => categoryService.list(),
    staleTime: Infinity, // las categorías no cambian en la sesión
  })
}
