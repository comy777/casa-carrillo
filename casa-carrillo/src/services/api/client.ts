import axios from 'axios'
import { mockAdapter } from './mockAdapter'
import { storage, STORAGE_KEYS } from '@/utils/storage'
import type { AuthResponse } from '@/types'

/**
 * Instancia central de Axios. Toda la app consume la API a través de aquí.
 * Hoy usa `mockAdapter`; para conectar un backend real basta con quitar
 * la línea `adapter` y definir `baseURL`.
 */
export const api = axios.create({
  baseURL: '/api',
  adapter: mockAdapter,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor: adjunta el token de sesión si existe.
api.interceptors.request.use((config) => {
  const auth = storage.get<AuthResponse | null>(STORAGE_KEYS.auth, null)
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

/** Extrae un mensaje de error legible de cualquier error de Axios. */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as { message?: string })?.message ?? error.message
  }
  if (error instanceof Error) return error.message
  return 'Ocurrió un error inesperado'
}
