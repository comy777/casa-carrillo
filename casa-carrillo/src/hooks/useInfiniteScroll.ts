import { useEffect, useRef } from 'react'

interface Options {
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
}

/**
 * Observa un elemento centinela y dispara `onLoadMore` al entrar en viewport.
 * Devuelve la ref a colocar en el elemento centinela.
 */
export function useInfiniteScroll({ hasMore, loading, onLoadMore }: Options) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) onLoadMore()
      },
      { rootMargin: '200px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, loading, onLoadMore])

  return sentinelRef
}
