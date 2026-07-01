import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}
interface State {
  hasError: boolean
}

/** Límite de error que evita que un crash tumbe toda la app. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // En producción aquí se enviaría a un servicio (Sentry, etc.).
    console.error('ErrorBoundary capturó:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-terracotta-500" aria-hidden />
          <h2 className="text-2xl">Algo salió mal</h2>
          <p className="max-w-md text-brown-600">
            Ocurrió un error inesperado. Puedes intentar de nuevo o recargar la página.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Recargar
            </Button>
            <Button onClick={this.handleReset}>Intentar de nuevo</Button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
