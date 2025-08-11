import { Button } from "@/components/ui/enhanced-button";
import { PlayCircle, Zap, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-drones.jpg";
import { usePayment } from "@/hooks/usePayment";
export function HeroSection() {
  const { processPayment, isProcessing } = usePayment();

  const handlePayment = async () => {
    try {
      await processPayment({
        amount: 3999,
        name: 'Complete Drone Soccer Kit',
        description: 'Complete Drone Soccer Kit - Technoxian Event (30th Aug to 02nd Sep, 2025)'
      });
    } catch (error) {
      // Error handling is done in the hook
    }
  };

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
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center slide-up">
        {/* Partnership Badge */}
        <div className="inline-flex items-center gap-2 neumorphic-elevated px-6 py-3 rounded-full mb-8">
          <div className="w-2 h-2 bg-primary rounded-full pulse-glow"></div>
          <span className="text-sm font-medium text-muted-foreground tracking-wider">Drone Soccer Challenge by Technoxian • 30th Aug to 02nd Sep, 2025</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-wide">
          <span className="gradient-text font-medium">Get The Ultimate</span>
          <br />
          <span className="text-foreground">Drone Soccer Experience</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Join the thrilling Drone Soccer Challenge without buying expensive equipment. 
          We provide professional Grade drone soccers on rent for the complete event experience.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            variant="hero" 
            size="lg" 
            className="group font-light"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Claim Your Kit'}
          </Button>
          <Button variant="neumorphic" size="lg" className="font-light" onClick={scrollToPricing}>
            View Pricing
          </Button>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="neumorphic p-6 rounded-2xl">
            <div className="text-4xl font-bold text-primary mb-2">₹3,999</div>
            <div className="text-muted-foreground">Early Bird Price</div>
            <div className="text-sm text-muted-foreground line-through">₹5,999</div>
          </div>
          <div className="neumorphic p-6 rounded-2xl">
            <div className="text-4xl font-bold text-primary mb-2">4</div>
            <div className="text-muted-foreground">Drone Soccer Kit</div>
            <div className="text-sm text-muted-foreground">Complete Package</div>
          </div>
          <div className="neumorphic p-6 rounded-2xl">
            <div className="text-4xl font-bold text-primary mb-2">FREE</div>
            <div className="text-muted-foreground">Training Session</div>
            <div className="text-sm text-muted-foreground">Before Match</div>
          </div>
        </div>
      </div>
    </section>;
}