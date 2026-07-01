import { Seo } from '@/components/common/Seo'
import { Hero } from '@/features/home/components/Hero'
import { CategoryGrid } from '@/features/home/components/CategoryGrid'
import { FeaturedProducts } from '@/features/home/components/FeaturedProducts'
import { HandmadeSection } from '@/features/home/components/HandmadeSection'
import { Testimonials } from '@/features/home/components/Testimonials'
import { Newsletter } from '@/features/home/components/Newsletter'

export default function HomePage() {
  return (
    <>
      <Seo
        title="Artesanías hechas a mano"
        description="Cerámica, tejidos, joyería artesanal y decoración con alma. Piezas únicas hechas a mano por artesanos colombianos."
        path="/"
      />
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <HandmadeSection />
      <Testimonials />
      <Newsletter />
    </>
  )
}
