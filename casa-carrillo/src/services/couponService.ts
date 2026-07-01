import { api } from './api/client'
import type { Coupon } from '@/types'

export const couponService = {
  async validate(code: string): Promise<Coupon> {
    const { data } = await api.post<Coupon>('/coupons/validate', { code })
    return data
  },
}
