import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Address, User } from '@/types'
import { STORAGE_KEYS } from '@/utils/storage'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setSession: (user: User, token: string) => void
  logout: () => void
  addAddress: (address: Address) => void
  updateProfile: (patch: Partial<Pick<User, 'name' | 'email'>>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setSession: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),

      addAddress: (address) =>
        set((state) =>
          state.user
            ? {
                user: {
                  ...state.user,
                  addresses: [...state.user.addresses, address],
                },
              }
            : state,
        ),

      updateProfile: (patch) =>
        set((state) =>
          state.user ? { user: { ...state.user, ...patch } } : state,
        ),
    }),
    {
      name: STORAGE_KEYS.auth,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
