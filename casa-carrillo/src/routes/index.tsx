import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { paths } from './paths'

// Code splitting: cada página es un chunk que se carga bajo demanda.
const HomePage = lazy(() => import('@/pages/HomePage'))
const CatalogPage = lazy(() => import('@/pages/CatalogPage'))
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'))
const CartPage = lazy(() => import('@/pages/CartPage'))
const WishlistPage = lazy(() => import('@/pages/WishlistPage'))
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: paths.home, element: <HomePage /> },
      { path: paths.catalog, element: <CatalogPage /> },
      { path: '/producto/:slug', element: <ProductDetailPage /> },
      { path: paths.cart, element: <CartPage /> },
      { path: paths.wishlist, element: <WishlistPage /> },
      { path: paths.login, element: <LoginPage /> },
      { path: paths.register, element: <RegisterPage /> },

      // Rutas privadas protegidas.
      {
        element: <ProtectedRoute />,
        children: [
          { path: paths.checkout, element: <CheckoutPage /> },
          { path: paths.profile, element: <ProfilePage /> },
        ],
      },

      { path: paths.notFound, element: <NotFoundPage /> },
    ],
  },
])
