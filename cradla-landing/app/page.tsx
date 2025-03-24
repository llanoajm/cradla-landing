// @ts-nocheck
import { DemoVariant1 } from '@/components/demo-variant'
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects'

export default function Home() {
  return (
    <>
      <DemoVariant1 />
      <div className="py-24 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Cradla
          </h2>
          <FeaturesSectionWithHoverEffects />
        </div>
      </div>
    </>
  )
}