/**
 * Wrapper tipado y seguro sobre localStorage.
 * Centraliza el acceso para no repetir try/catch por toda la app (DRY).
 */
export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : fallback
    } catch {
      return fallback
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* cuota llena o modo privado: se ignora silenciosamente */
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch {
      /* noop */
    }
  },
}

export const STORAGE_KEYS = {
  cart: 'cc:cart',
  wishlist: 'cc:wishlist',
  auth: 'cc:auth',
  coupon: 'cc:coupon',
} as const
