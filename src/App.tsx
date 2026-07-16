import { useEffect } from 'react'
import { AmbientBackground } from './components/AmbientBackground'
import { ChatWidget } from './components/ChatWidget'
import { Cursor } from './components/Cursor'
import { EasterEgg } from './components/EasterEgg'
import { FloatingOrbs } from './components/FloatingOrbs'
import { Footer } from './components/Footer'
import { Background, Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { ScrollSpy } from './components/ScrollSpy'
import { ACoreSection } from './components/sections/ACore'
import { AIProductsSection } from './components/sections/AIProducts'
import { CTASection } from './components/sections/CTA'
import { DepartmentsSection } from './components/sections/Departments'
import { FAQSection } from './components/sections/FAQSection'
import { HowItWorksSection } from './components/sections/HowItWorks'
import { IndustriesSection } from './components/sections/Industries'
import { IntegrationsSection } from './components/sections/Integrations'
import { PricingSection } from './components/sections/Pricing'
import { ProblemSection } from './components/sections/Problem'
import { QuoteSection } from './components/sections/Quote'
import { ServicesSection } from './components/sections/ServicesSection'
import { WorkflowDemo } from './components/sections/WorkflowDemo'

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: '#08090c', color: '#f5f5f7', fontFamily: "'Inter', sans-serif" }}
    >
      <Background />
      <AmbientBackground />
      <Cursor />
      <ScrollProgress />
      <ScrollSpy />

      <div className="relative z-10">
        <Navbar />
        <Hero />

        <ServicesSection />
        <FloatingOrbs />
        <div className="section-divider my-0" />
        <ProblemSection />
        <div className="section-divider my-0" />
        <DepartmentsSection />
        <div className="section-divider my-0" />
        <WorkflowDemo />
        <div className="section-divider my-0" />
        <QuoteSection />
        <div className="section-divider my-0" />
        <ACoreSection />
        <div className="section-divider my-0" />
        <HowItWorksSection />
        <div className="section-divider my-0" />
        <IndustriesSection />
        <div className="section-divider my-0" />
        <IntegrationsSection />
        <div className="section-divider my-0" />
        <PricingSection />
        <div className="section-divider my-0" />
        <AIProductsSection />
        <div className="section-divider my-0" />
        <FAQSection />
        <div className="section-divider my-0" />
        <CTASection />
        <Footer />
      </div>

      <ChatWidget />
      <EasterEgg />
    </div>
  )
}