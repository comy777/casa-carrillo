import { Link, NavLink } from 'react-router-dom'
import { Heart, Menu, ShoppingBag, User, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { paths } from '@/routes/paths'
import { cn } from '@/utils/cn'
import { useUiStore } from '@/store/uiStore'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useAuthStore } from '@/store/authStore'

const NAV_LINKS = [
  { to: paths.home, label: 'Inicio' },
  { to: paths.catalog, label: 'Catálogo' },
  { to: paths.wishlist, label: 'Favoritos' },
]

export function Navbar() {
  const openCart = useUiStore((s) => s.openCart)
  const mobileOpen = useUiStore((s) => s.mobileMenuOpen)
  const toggleMobile = useUiStore((s) => s.toggleMobileMenu)
  const closeMobile = useUiStore((s) => s.closeMobileMenu)

  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <header className="sticky top-0 z-30 border-b border-sand-200 bg-cream-50/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        {/* Mobile toggle */}
        <button
          type="button"
          onClick={toggleMobile}
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full text-brown-800 hover:bg-sand-100 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to={paths.home} className="font-serif text-xl font-bold text-brown-900">
          Casa <span className="text-terracotta-500">Carrillo</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-semibold transition-colors hover:text-terracotta-600',
                    isActive ? 'text-terracotta-600' : 'text-brown-700',
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <Link
            to={paths.wishlist}
            aria-label={`Favoritos (${wishlistCount})`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-brown-800 hover:bg-sand-100"
          >
            <Heart className="h-5 w-5" aria-hidden />
            {wishlistCount > 0 && <CountBadge count={wishlistCount} />}
          </Link>

          <Link
            to={isAuthenticated ? paths.profile : paths.login}
            aria-label={isAuthenticated ? 'Mi perfil' : 'Ingresar'}
            className="flex h-10 w-10 items-center justify-center rounded-full text-brown-800 hover:bg-sand-100"
          >
            <User className="h-5 w-5" aria-hidden />
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Carrito (${cartCount})`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-brown-800 hover:bg-sand-100"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            {cartCount > 0 && <CountBadge count={cartCount} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-sand-200 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    cn(
                      'block px-6 py-3 font-semibold',
                      isActive ? 'bg-sand-100 text-terracotta-600' : 'text-brown-700',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta-500 px-1 text-xs font-bold text-cream-50">
      {count}
    </span>
  )
}
