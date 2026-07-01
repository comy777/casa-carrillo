import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type {
  AuthResponse,
  Category,
  CreateOrderPayload,
  LoginPayload,
  Order,
  Paginated,
  Product,
  ProductFilters,
  RegisterPayload,
} from '@/types'
import { products } from '@/mocks/products'
import { categories } from '@/mocks/categories'
import { orders as seedOrders } from '@/mocks/orders'
import { findCoupon } from '@/mocks/coupons'
import { DEMO_CREDENTIALS, demoUser } from '@/mocks/users'
import { finalPrice } from '@/utils/format'
import { DEFAULT_PAGE_SIZE, MOCK_LATENCY } from '@/utils/constants'

/** Estado en memoria: permite crear órdenes durante la sesión. */
const ordersDb: Order[] = [...seedOrders]

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

class HttpError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

function ok<T>(data: T, config: InternalAxiosRequestConfig): AxiosResponse<T> {
  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  }
}

function filterProducts(filters: ProductFilters): Paginated<Product> {
  let list = [...products]

  if (filters.categoryId) {
    list = list.filter((p) => p.categoryId === filters.categoryId)
  }
  if (filters.search) {
    const q = filters.search.toLowerCase()
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q)),
    )
  }
  if (filters.minPrice != null) {
    list = list.filter((p) => finalPrice(p.price, p.discount) >= filters.minPrice!)
  }
  if (filters.maxPrice != null) {
    list = list.filter((p) => finalPrice(p.price, p.discount) <= filters.maxPrice!)
  }

  switch (filters.sort) {
    case 'price-asc':
      list.sort((a, b) => finalPrice(a.price, a.discount) - finalPrice(b.price, b.discount))
      break
    case 'price-desc':
      list.sort((a, b) => finalPrice(b.price, b.discount) - finalPrice(a.price, a.discount))
      break
    case 'newest':
      list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      break
    case 'popularity':
    default:
      list.sort((a, b) => b.rating * b.reviewsCount - a.rating * a.reviewsCount)
  }

  const page = filters.page ?? 1
  const pageSize = filters.pageSize ?? DEFAULT_PAGE_SIZE
  const total = list.length
  const start = (page - 1) * pageSize
  const items = list.slice(start, start + pageSize)

  return { items, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) }
}

/**
 * Enrutador del mock. Devuelve la respuesta según método + URL.
 * Cuando exista backend real, se elimina el adapter y los services
 * siguen funcionando sin cambios (Dependency Inversion).
 */
async function route(config: InternalAxiosRequestConfig): Promise<AxiosResponse> {
  await delay(MOCK_LATENCY)

  const method = (config.method ?? 'get').toLowerCase()
  const url = (config.url ?? '').replace(/^\//, '')
  const params = (config.params ?? {}) as Record<string, unknown>
  const body = config.data ? JSON.parse(config.data as string) : {}

  // GET /categories
  if (method === 'get' && url === 'categories') {
    return ok<Category[]>(categories, config)
  }

  // GET /products/:slug/related
  const relatedMatch = url.match(/^products\/([^/]+)\/related$/)
  if (method === 'get' && relatedMatch) {
    const slug = relatedMatch[1]
    const base = products.find((p) => p.slug === slug)
    const related = products
      .filter((p) => p.categoryId === base?.categoryId && p.slug !== slug)
      .slice(0, 4)
    return ok<Product[]>(related, config)
  }

  // GET /products/:slug
  const detailMatch = url.match(/^products\/([^/]+)$/)
  if (method === 'get' && detailMatch) {
    const slug = detailMatch[1]
    const product = products.find((p) => p.slug === slug || p.id === slug)
    if (!product) throw new HttpError(404, 'Producto no encontrado')
    return ok<Product>(product, config)
  }

  // GET /products
  if (method === 'get' && url === 'products') {
    return ok<Paginated<Product>>(filterProducts(params as ProductFilters), config)
  }

  // POST /auth/login
  if (method === 'post' && url === 'auth/login') {
    const { email, password } = body as LoginPayload
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      return ok<AuthResponse>({ user: demoUser, token: 'mock-jwt-token' }, config)
    }
    throw new HttpError(401, 'Correo o contraseña incorrectos')
  }

  // POST /auth/register
  if (method === 'post' && url === 'auth/register') {
    const { name, email } = body as RegisterPayload
    const user = { ...demoUser, id: `u-${Date.now()}`, name, email, addresses: [] }
    return ok<AuthResponse>({ user, token: 'mock-jwt-token' }, config)
  }

  // GET /orders
  if (method === 'get' && url === 'orders') {
    return ok<Order[]>(
      [...ordersDb].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      config,
    )
  }

  // POST /orders
  if (method === 'post' && url === 'orders') {
    const payload = body as CreateOrderPayload
    const order: Order = {
      ...payload,
      id: `ORD-${Date.now()}`,
      userId: demoUser.id,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    ordersDb.unshift(order)
    return ok<Order>(order, config)
  }

  // POST /coupons/validate
  if (method === 'post' && url === 'coupons/validate') {
    const { code } = body as { code: string }
    const coupon = findCoupon(code)
    if (!coupon) throw new HttpError(404, 'Cupón inválido o expirado')
    return ok(coupon, config)
  }

  throw new HttpError(404, `Ruta no encontrada: ${method.toUpperCase()} /${url}`)
}

export const mockAdapter: AxiosAdapter = async (config) => {
  try {
    return await route(config)
  } catch (err) {
    if (err instanceof HttpError) {
      // Emula el shape de error de Axios para que los interceptores lo capturen.
      return Promise.reject({
        isAxiosError: true,
        response: {
          data: { message: err.message },
          status: err.status,
          statusText: 'Error',
          headers: {},
          config,
        },
        config,
        message: err.message,
      })
    }
    throw err
  }
}
