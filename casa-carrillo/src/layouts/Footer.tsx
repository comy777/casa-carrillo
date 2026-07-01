import { Link } from 'react-router-dom'
import { AtSign, Globe, Send } from 'lucide-react'
import { paths } from '@/routes/paths'

const COLUMNS = [
  {
    title: 'Tienda',
    links: [
      { label: 'Catálogo', to: paths.catalog },
      { label: 'Favoritos', to: paths.wishlist },
      { label: 'Carrito', to: paths.cart },
    ],
  },
  {
    title: 'Cuenta',
    links: [
      { label: 'Ingresar', to: paths.login },
      { label: 'Registrarse', to: paths.register },
      { label: 'Mi perfil', to: paths.profile },
    ],
  },
]

export function Footer() {
  return (
    <footer className="mt-auto bg-brown-900 text-cream-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-xl font-bold text-cream-50">
            Casa <span className="text-terracotta-400">Carrillo</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-cream-100/70">
            Artesanías hechas a mano que celebran la cultura y el trabajo de comunidades
            colombianas. Autenticidad en cada pieza.
          </p>
          <div className="mt-5 flex gap-3">
            {[AtSign, Globe, Send].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Red social"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brown-800 text-cream-100 transition-colors hover:bg-terracotta-500"
              >
                <Icon className="h-4.5 w-4.5" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 font-serif text-lg text-cream-50">{col.title}</h3>
            <ul className="space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-cream-100/70 transition-colors hover:text-terracotta-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-brown-800 py-5 text-center text-sm text-cream-100/60">
        © {new Date().getFullYear()} Casa Carrillo. Hecho a mano con ♥ en Colombia.
      </div>
    </footer>
  )
}
