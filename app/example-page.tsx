"use client"
import { GlossyMonochromeCard } from "@/components/ui/glossy-monochrome-card"
import { GlossyMonochromeButton } from "@/components/ui/glossy-monochrome-button"
import { SectionTitle } from "@/components/section-title"
import { HeroSection } from "@/components/hero-section"

export default function ExamplePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Monochromatic Design System"
            subtitle="Explore our sleek black and white design system with glossy gradients"
            centered={true}
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Light Card */}
            <GlossyMonochromeCard variant="light" className="p-6">
              <h3 className="text-xl font-medium mb-4">Light Card</h3>
              <p className="text-gray-600 mb-6">
                This card uses a light background with subtle glossy gradient effects.
              </p>
              <GlossyMonochromeButton variant="default" className="w-full">
                Primary Action
              </GlossyMonochromeButton>
            </GlossyMonochromeCard>

            {/* Dark Card */}
            <GlossyMonochromeCard variant="dark" className="p-6">
              <h3 className="text-xl font-medium mb-4">Dark Card</h3>
              <p className="text-gray-300 mb-6">
                This card uses a dark background with subtle glossy gradient effects.
              </p>
              <GlossyMonochromeButton variant="secondary" className="w-full">
                Secondary Action
              </GlossyMonochromeButton>
            </GlossyMonochromeCard>

            {/* Glass Card */}
            <GlossyMonochromeCard variant="glass" className="p-6">
              <h3 className="text-xl font-medium mb-4">Glass Card</h3>
              <p className="text-gray-600 mb-6">This card uses a glass morphism effect with subtle glossy gradient.</p>
              <GlossyMonochromeButton variant="outline" className="w-full">
                Outline Action
              </GlossyMonochromeButton>
            </GlossyMonochromeCard>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-medium mb-6 text-center">Button Variants</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <GlossyMonochromeButton variant="default">Default Button</GlossyMonochromeButton>

              <GlossyMonochromeButton variant="secondary">Secondary Button</GlossyMonochromeButton>

              <GlossyMonochromeButton variant="outline">Outline Button</GlossyMonochromeButton>

              <GlossyMonochromeButton variant="ghost">Ghost Button</GlossyMonochromeButton>

              <GlossyMonochromeButton variant="glass">Glass Button</GlossyMonochromeButton>

              <GlossyMonochromeButton variant="link">Link Button</GlossyMonochromeButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
