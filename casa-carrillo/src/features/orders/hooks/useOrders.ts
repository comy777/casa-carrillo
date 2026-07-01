import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/services/orderService'
import { queryKeys } from '@/services/queryClient'
import type { CreateOrderPayload } from '@/types'

export function useOrders() {
  return useQuery({
    queryKey: queryKeys.orders(),
    queryFn: () => orderService.list(),
  })
}

export function useCreateOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => orderService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders() })
    },
  })
}
