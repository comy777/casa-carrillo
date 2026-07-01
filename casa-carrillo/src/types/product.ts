export interface ProductImage {
  id: string
  url: string
  alt: string
}

export interface ProductVariant {
  id: string
  /** Ej: "Color", "Talla" */
  name: string
  /** Ej: "Terracota", "Grande" */
  value: string
  /** Ajuste de precio opcional respecto al base. */
  priceDelta?: number
  stock: number
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  /** Precio base en la moneda de la tienda (COP). */
  price: number
  /** Porcentaje de descuento 0–100. 0 = sin descuento. */
  discount: number
  images: ProductImage[]
  categoryId: string
  stock: number
  rating: number
  reviewsCount: number
  materials: string[]
  /** Origen artesanal, ej: "Ráquira, Boyacá". */
  origin: string
  variants: ProductVariant[]
  featured: boolean
  createdAt: string
}

export type ProductSort =
  | 'popularity'
  | 'price-asc'
  | 'price-desc'
  | 'newest'

export interface ProductFilters {
  categoryId?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  sort?: ProductSort
  page?: number
  pageSize?: number
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
