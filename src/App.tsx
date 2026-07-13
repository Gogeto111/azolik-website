import { Background, Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { AmbientBackground } from './components/AmbientBackground'
import { StatsSection } from './components/sections/StatsSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { ProblemSection } from './components/sections/Problem'
import { DepartmentsSection } from './components/sections/Departments'
import { WorkflowDemo } from './components/sections/WorkflowDemo'
import { FloatingOrbs } from './components/FloatingOrbs'
import { QuoteSection } from './components/sections/Quote'
import { WorkSection } from './components/sections/WorkSection'
import { ResultsSection } from './components/sections/ResultsSection'
import { HowItWorksSection } from './components/sections/HowItWorks'
import { IndustriesSection } from './components/sections/Industries'
import { IntegrationsSection } from './components/sections/Integrations'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { PricingSection } from './components/sections/Pricing'
import { FAQSection } from './components/sections/FAQSection'
import { CTASection } from './components/sections/CTASection'
import { Footer } from './components/Footer'

export default function App() {
  return (
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
        <ServicesSection />
        <FloatingOrbs />
        <ProblemSection />
        <DepartmentsSection />
        <WorkflowDemo />
        <QuoteSection />
        <WorkSection />
        <FloatingOrbs />
        <ResultsSection />
        <HowItWorksSection />
        <IndustriesSection />
        <IntegrationsSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  )
}
