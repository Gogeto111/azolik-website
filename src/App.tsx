import { Background, Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { AmbientBackground } from './components/AmbientBackground'
import { ScrollSpy } from './components/ScrollSpy'
import { ChatWidget } from './components/ChatWidget'
import { EasterEgg } from './components/EasterEgg'
import { StatsSection } from './components/sections/Stats'
import { ServicesSection } from './components/sections/ServicesSection'
import { ProblemSection } from './components/sections/Problem'
import { DepartmentsSection } from './components/sections/Departments'
import { WorkflowDemo } from './components/sections/WorkflowDemo'
import { FloatingOrbs } from './components/FloatingOrbs'
import { QuoteSection } from './components/sections/Quote'
import { HowItWorksSection } from './components/sections/HowItWorks'
import { IndustriesSection } from './components/sections/Industries'
import { IntegrationsSection } from './components/sections/Integrations'
import { PricingSection } from './components/sections/Pricing'
import { TestimonialsSection } from './components/sections/Testimonials'
import { FAQSection } from './components/sections/FAQSection'
import { CTASection } from './components/sections/CTA'
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
      <ScrollSpy />

      <div className="relative z-10">
        <Navbar />
        <Hero />

        <StatsSection />
        <div className="section-divider my-0" />
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
        <HowItWorksSection />
        <div className="section-divider my-0" />
        <IndustriesSection />
        <div className="section-divider my-0" />
        <IntegrationsSection />
        <div className="section-divider my-0" />
        <PricingSection />
        <div className="section-divider my-0" />
        <TestimonialsSection />
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
