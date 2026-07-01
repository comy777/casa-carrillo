import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title: string
  description?: string
  image?: string
  /** Ruta canónica, ej: /catalogo. */
  path?: string
  type?: 'website' | 'product' | 'article'
}

const SITE = 'Casa Carrillo'
const BASE_URL = 'https://casacarrillo.co'

/** Meta tags dinámicos + Open Graph por página. */
export function Seo({ title, description, image, path, type = 'website' }: SeoProps) {
  const fullTitle = `${title} · ${SITE}`
  const url = path ? `${BASE_URL}${path}` : BASE_URL

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}
