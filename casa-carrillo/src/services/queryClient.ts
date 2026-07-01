import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000, // 1 min: los datos del mock cambian poco
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

/** Claves de caché centralizadas para evitar strings mágicos (DRY). */
export const queryKeys = {
  products: (filters?: unknown) => ['products', filters] as const,
  product: (slug: string) => ['product', slug] as const,
  relatedProducts: (slug: string) => ['product', slug, 'related'] as const,
  categories: () => ['categories'] as const,
  orders: () => ['orders'] as const,
}
