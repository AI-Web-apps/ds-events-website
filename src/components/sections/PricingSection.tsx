import { Button } from "@/components/ui/enhanced-button";
import { Check, Star, Zap } from "lucide-react";
import { usePayment } from "@/hooks/usePayment";
export function PricingSection() {
  const {
    processPayment,
    isProcessing
  } = usePayment();
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
  return <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-6 tracking-wide">
            <span className="gradient-text font-medium">Rental</span> Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-light">
            Professional equipment, transparent pricing, no purchase required.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-3xl mx-auto">
          {/* Complete Package */}
          <div className="neumorphic p-8 rounded-3xl relative border-2 border-primary/30 glow-primary">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase">
                Most Popular
              </div>
            </div>
            
            <div className="mb-6 mt-4">
              <h3 className="text-2xl font-bold mb-2">Complete Team Package</h3>
              <p className="text-muted-foreground">Everything you need for full competition</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-black text-primary">₹3,999</span>
                <span className="text-lg text-muted-foreground line-through">₹5,999</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                Early Bird Offer (First 5 Teams)
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>Complete Drone Soccer Kit (4 Drone Soccer Velocity v2)</span>
              </li>
              
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>Radio Controller & Battery</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>Training Session (29th August)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>Access During Training & Matches</span>
              </li>
            </ul>

            <Button variant="hero" size="lg" className="w-full" onClick={handlePayment} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Claim Your Kit'}
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            * Access to Drone Soccers during both training sessions and matches is included
          </p>
          <p className="text-muted-foreground mt-2">
            * Lost or mishandled items will incur the standard fine
          </p>
        </div>
      </div>
    </section>;
}