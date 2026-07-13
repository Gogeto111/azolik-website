import { useEffect, useState } from 'react'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { AmbientBackground } from './components/AmbientBackground'
import { FloatingOrbs } from './components/FloatingOrbs'
import { StatsSection } from './components/sections/StatsSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { WorkSection } from './components/sections/WorkSection'
import { ResultsSection } from './components/sections/ResultsSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { FAQSection } from './components/sections/FAQSection'
import { CTASection } from './components/sections/CTASection'
import { Footer } from './components/Footer'
import { PageTransition } from './components/AnimatedComponents'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <PageTransition isLoading={isLoading}>
      <div
        className="min-h-screen overflow-x-hidden"
        style={{ backgroundColor: '#08090c', color: '#f5f5f7', fontFamily: "'Inter', sans-serif" }}
      >
        <AmbientBackground />
        <Cursor />
        <ScrollProgress />

        <div className="relative z-10">
          <Navbar />
          <Hero />

          <StatsSection />
          <FloatingOrbs />
          <ServicesSection />
          <FloatingOrbs />
          <WorkSection />
          <FloatingOrbs />
          <ResultsSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
          <Footer />
        </div>
      </div>
    </PageTransition>
  )
}