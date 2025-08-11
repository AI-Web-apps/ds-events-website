import { Button } from "@/components/ui/enhanced-button";
import { PlayCircle, Zap, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-drones.jpg";
import { ClaimKitDialog } from "@/components/ui/claim-kit-dialog";
export function HeroSection() {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95 bg-black"></div>
      </div>

      {/* Floating Elements */}
      
      

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center slide-up">
        {/* Partnership Badge */}
        <div className="inline-flex items-center gap-2 neumorphic-elevated px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
          <div className="w-2 h-2 bg-primary rounded-full pulse-glow"></div>
          <a 
            href="https://www.technoxian.com/drone-soccer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wider hover:text-primary transition-colors cursor-pointer text-center"
          >
            Drone Soccer Challenge by Technoxian • 30th Aug to 02nd Sep, 2025
          </a>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-6 sm:mb-8 leading-tight tracking-wide px-2">
          <span className="gradient-text font-medium">Get The Ultimate</span>
          <br />
          <span className="text-foreground">Drone Soccer Experience</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed px-4">
          Join the thrilling Drone Soccer Challenge without buying expensive equipment. 
          We provide professional Grade drone soccers on rent for the complete event experience.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
          <ClaimKitDialog>
            <Button 
              variant="hero" 
              size="lg" 
              className="group font-light w-full sm:w-auto"
            >
              Claim Your Kit
            </Button>
          </ClaimKitDialog>
          <Button variant="neumorphic" size="lg" className="font-light w-full sm:w-auto" onClick={scrollToPricing}>
            View Pricing
          </Button>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4">
          <div className="neumorphic p-4 sm:p-6 rounded-2xl">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">₹3,999</div>
            <div className="text-sm sm:text-base text-muted-foreground">Early Bird Price</div>
            <div className="text-xs sm:text-sm text-muted-foreground line-through">₹5,999</div>
          </div>
          <div className="neumorphic p-4 sm:p-6 rounded-2xl">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">4</div>
            <div className="text-sm sm:text-base text-muted-foreground">Drone Soccer Kit</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Complete Package</div>
          </div>
          <div className="neumorphic p-4 sm:p-6 rounded-2xl">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">FREE</div>
            <div className="text-sm sm:text-base text-muted-foreground">Training Session</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Before Match</div>
          </div>
        </div>
      </div>
    </section>;
}