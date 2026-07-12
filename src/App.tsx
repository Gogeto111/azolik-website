import { useEffect } from 'react'
import { Background, Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { AmbientBackground } from './components/AmbientBackground'
import { ProblemSection } from './components/sections/Problem'
import { DepartmentsSection } from './components/sections/Departments'
import { WorkflowDemo } from './components/sections/WorkflowDemo'
import { QuoteSection } from './components/sections/Quote'
import { HowItWorksSection } from './components/sections/HowItWorks'
import { IndustriesSection } from './components/sections/Industries'
import { IntegrationsSection } from './components/sections/Integrations'
import { PricingSection } from './components/sections/Pricing'
import { FAQSection } from './components/sections/FAQ'
import { Footer } from './components/Footer'

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

      <div className="relative z-10">
        <Navbar />
        <Hero />

        <ProblemSection />
        <DepartmentsSection />
        <WorkflowDemo />
        <QuoteSection />
        <HowItWorksSection />
        <IndustriesSection />
        <IntegrationsSection />
        <PricingSection />
        <FAQSection />
        <Footer />
      </div>
    </div>
  )
}