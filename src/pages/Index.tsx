import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/sections/HeroSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { CTASection } from "@/components/sections/CTASection"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div id="pricing">
          <PricingSection />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="contact">
          <CTASection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
