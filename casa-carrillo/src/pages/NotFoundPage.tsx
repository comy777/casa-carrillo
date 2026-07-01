import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { paths } from '@/routes/paths'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Página no encontrada" />
      <div className="container-page">
        <EmptyState
          icon={Compass}
          title="404 — Te perdiste en el taller"
          description="La página que buscas no existe. Volvamos a lo hecho a mano."
          action={
            <Link to={paths.home}>
              <Button>Ir al inicio</Button>
            </Link>
          }
        />
      </div>
    </>
  )
}
