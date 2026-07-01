/** URLs amigables centralizadas. Evita strings mágicos repartidos por la app. */
export const paths = {
  home: '/',
  catalog: '/catalogo',
  category: (slug: string) => `/catalogo?categoria=${slug}`,
  product: (slug: string) => `/producto/${slug}`,
  cart: '/carrito',
  wishlist: '/favoritos',
  checkout: '/checkout',
  login: '/ingresar',
  register: '/registro',
  profile: '/perfil',
  notFound: '*',
} as const
