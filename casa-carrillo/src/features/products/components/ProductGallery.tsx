import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ProductImage } from '@/types'
import { LazyImage } from '@/components/common/LazyImage'
import { cn } from '@/utils/cn'

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        key={active}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        className="overflow-hidden rounded-2xl shadow-soft"
      >
        <LazyImage
          src={images[active].url}
          alt={images[active].alt}
          wrapperClassName="aspect-square"
        />
      </motion.div>

      {images.length > 1 && (
        <div className="flex gap-3" role="tablist" aria-label="Miniaturas del producto">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Ver imagen ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                'h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors',
                i === active ? 'border-terracotta-500' : 'border-transparent opacity-70 hover:opacity-100',
              )}
            >
              <LazyImage src={image.url} alt={image.alt} wrapperClassName="h-full w-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
