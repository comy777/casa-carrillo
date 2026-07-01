# 🏺 Casa Carrillo

Tienda virtual de **artesanías hechas a mano** (cerámica, tejidos, joyería, decoración y personalizados). SPA en React construida con una arquitectura escalable *feature-based*, lista para producción.

> Objetivo de marca: transmitir autenticidad, cultura y confianza con un diseño cálido de tonos tierra.

---

## 🧱 Stack

| Área | Tecnología |
|---|---|
| Core | React 19 · TypeScript · Vite 8 |
| Estilos | TailwindCSS v4 (tokens `@theme`) |
| Ruteo | React Router DOM v7 (lazy + code splitting) |
| Estado de cliente | Zustand (persistente en `localStorage`) |
| Estado de servidor | React Query (caché, revalidación, paginación) |
| HTTP | Axios (con **mock adapter** intercambiable) |
| Formularios | React Hook Form + Zod |
| Animación | Framer Motion |
| Iconos | Lucide React |
| SEO | react-helmet-async |
| Notificaciones | react-hot-toast |
| Testing | Vitest + Testing Library · Playwright (E2E) |

---

## 🗂️ Arquitectura (feature-based)

```
src/
├── components/
│   ├── ui/          # Primitivos reutilizables (Button, Input, Rating, Skeleton…)
│   └── common/      # Seo, ErrorBoundary, LazyImage, ScrollToTop
├── features/        # Dominios: cada uno con sus components/hooks/schemas
│   ├── home/        # Hero, CategoryGrid, Featured, Handmade, Testimonials, Newsletter
│   ├── products/    # ProductCard, ProductGrid, Gallery, Filters + hooks React Query
│   ├── cart/        # CartItemRow, CartSummary, CartDrawer + useCoupon
│   ├── checkout/    # CheckoutForm + schema Zod
│   ├── auth/        # LoginForm, RegisterForm + schema + useAuth
│   └── orders/      # useOrders / useCreateOrder
├── hooks/           # useDebounce, useMediaQuery, useInfiniteScroll, useCartTotals
├── store/           # Zustand: cart, wishlist, auth, ui
├── services/        # Capa de API: client Axios + módulos por dominio + queryClient
│   └── api/         # mockAdapter (backend fake, frontera DIP)
├── mocks/           # Datos fake realistas: products, categories, users, orders, coupons
├── types/           # Contratos del dominio (product, cart, order, user, category)
├── utils/           # cn, format, storage, cart (cálculos puros), constants
├── layouts/         # RootLayout, Navbar, Footer
├── routes/          # Router + paths + ProtectedRoute
└── pages/           # Un componente por ruta (lazy-loaded)
```

### Principios aplicados
- **SOLID / SRP:** cada módulo de `services` habla con un solo dominio; los hooks orquestan; la UI solo pinta.
- **DIP:** la UI depende de `services`, no de Axios. El backend real se conecta quitando el `mockAdapter` en `services/api/client.ts` — **nada más cambia**.
- **DRY:** cálculo de totales (`utils/cart.ts`), formato (`utils/format.ts`), claves de caché (`queryClient.ts`) y rutas (`routes/paths.ts`) centralizados.
- **Separación server-state / client-state:** React Query para datos remotos, Zustand para carrito/wishlist/sesión.

### Flujo de datos
```
Componente → hook (useProducts) → React Query → service → axios → mockAdapter
Componente → useCartStore (Zustand) → persist → localStorage
Formulario → schema Zod → React Hook Form → service → toast
```

---

## ✨ Funcionalidades

- 🛒 Carrito persistente (localStorage) con drawer animado y variantes
- ❤️ Wishlist / favoritos persistente
- 🎟️ Cupones (`ARTESANO10`, `HECHOAMANO`, `ENVIO20`) con compra mínima
- 🚚 Envío gratis sobre umbral + barra de progreso
- 🔍 Catálogo con filtros (categoría, precio), búsqueda *debounced*, orden y paginación
- ♻️ Scroll infinito opcional (`useInfiniteProducts`)
- 🔐 Rutas privadas protegidas (checkout, perfil)
- 💀 Skeleton loaders, empty states, spinners y toasts
- 🧭 SEO: meta tags dinámicos + Open Graph por página, URLs amigables
- ♿ Accesibilidad: ARIA labels, navegación por teclado (Escape en drawer), `focus-visible`, contraste
- ⚡ Lazy loading de páginas e imágenes, code splitting por vendor
- 🛡️ Error boundaries a nivel app y por ruta

### Credenciales demo
```
Correo:      demo@casacarrillo.co
Contraseña:  artesania123
```

---

## 🚀 Scripts

```bash
pnpm install          # instalar dependencias
pnpm dev              # desarrollo (http://localhost:5173)
pnpm build            # typecheck + build de producción
pnpm preview          # servir el build

pnpm test             # unit + component tests (Vitest)
pnpm coverage         # cobertura
pnpm e2e              # E2E (requiere: pnpm exec playwright install)
pnpm lint             # ESLint
```

---

## 🧪 Testing

- **Unit:** cálculos de carrito, formato, mock API (`src/**/__tests__`)
- **Store:** lógica de Zustand (stock, cantidades, remove)
- **Component:** `ProductCard` (render, agregar al carrito, wishlist) con Testing Library
- **E2E:** flujos clave en `e2e/` (home→catálogo, búsqueda, carrito, login) con Playwright

Antes de correr E2E por primera vez:
```bash
pnpm exec playwright install
```

---

## 🔌 Conectar un backend real

En `src/services/api/client.ts`:
```ts
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // tu API real
  // adapter: mockAdapter,  ← eliminar esta línea
})
```
Los módulos de `services/` y todos los hooks siguen funcionando sin cambios.
```
