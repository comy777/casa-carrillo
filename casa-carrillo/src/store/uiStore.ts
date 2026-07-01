import { create } from 'zustand'

interface UiState {
  cartOpen: boolean
  mobileMenuOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
}

/** Estado efímero de UI (no persiste). Drawers, menús, etc. */
export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  mobileMenuOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}))
