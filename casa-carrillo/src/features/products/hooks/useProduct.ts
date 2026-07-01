import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import { queryKeys } from '@/services/queryClient'

export function useProduct(slug: string) {
  return useQuery({
    queryKey: queryKeys.product(slug),
    queryFn: () => productService.getBySlug(slug),
    enabled: Boolean(slug),
  })
}

export function useRelatedProducts(slug: string) {
  return useQuery({
    queryKey: queryKeys.relatedProducts(slug),
    queryFn: () => productService.getRelated(slug),
    enabled: Boolean(slug),
  })
}
