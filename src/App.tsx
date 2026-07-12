import { useEffect } from 'react'
import { Background, Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { AmbientBackground } from './components/AmbientBackground'
import { FloatingOrbs } from './components/FloatingOrbs'
import { ProblemSection } from './components/sections/Problem'
import { DepartmentsSection } from './components/sections/Departments'
import { FeaturesSection } from './components/sections/Features'
import { WorkflowDemo } from './components/sections/WorkflowDemo'
import { QuoteSection } from './components/sections/Quote'
import { HowItWorksSection } from './components/sections/HowItWorks'
import { StatsSection } from './components/sections/Stats'
import { IndustriesSection } from './components/sections/Industries'
import { IntegrationsSection } from './components/sections/Integrations'
import { TestimonialsSection } from './components/sections/Testimonials'
import { PricingSection } from './components/sections/Pricing'
import { FAQSection } from './components/sections/FAQ'
import { CTASection } from './components/sections/CTA'
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
        <Background />
        <AmbientBackground />
        <Cursor />
        <ScrollProgress />

        <div className="relative z-10">
          <Navbar />
          <Hero />

          <StatsSection />
          <FloatingOrbs />
          <ProblemSection />
          <DepartmentsSection />
          <FloatingOrbs />
          <FeaturesSection />
          <WorkflowDemo />
          <QuoteSection />
          <FloatingOrbs />
          <HowItWorksSection />
          <IndustriesSection />
          <IntegrationsSection />
          <TestimonialsSection />
          <FloatingOrbs />
          <PricingSection />
          <FAQSection />
          <CTASection />
          <Footer />
        </div>
      </div>
    </PageTransition>
  )
}