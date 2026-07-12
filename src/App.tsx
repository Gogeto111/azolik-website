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
import { FeaturesSection } from './components/sections/Testimonials'
import { PricingSection } from './components/sections/Pricing'
import { FAQSection } from './components/sections/FAQ'
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

      <div className="relative z-10">
        <Navbar />
        <Hero />

        {/* Industry trust bar */}
        <div className="relative z-10 py-7 border-y border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-6">
            <p
              className="text-center text-white/20 text-[10px] tracking-[0.22em] uppercase mb-5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Trusted by growing businesses across
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {[
                'E-commerce', 'Legal', 'Healthcare', 'Real Estate',
                'Marketing Agencies', 'SaaS', 'Consulting', 'Restaurants',
              ].map((ind) => (
                <span
                  key={ind}
                  className="text-white/18 text-sm font-medium hover:text-white/40 transition-colors duration-200 cursor-default"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ProblemSection />
        <DepartmentsSection />
        <WorkflowDemo />
        <QuoteSection />
        <HowItWorksSection />
        <IndustriesSection />
        <IntegrationsSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  )
}
