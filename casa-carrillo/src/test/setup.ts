import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Limpia el DOM entre tests para aislarlos.
afterEach(() => {
  cleanup()
  localStorage.clear()
})

// jsdom no implementa matchMedia; lo mockeamos para useMediaQuery.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
})

// IntersectionObserver para useInfiniteScroll.
class IOStub {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
  root = null
  rootMargin = ''
  thresholds = []
}
vi.stubGlobal('IntersectionObserver', IOStub)

// scrollTo no existe en jsdom.
window.scrollTo = vi.fn()
