import { Button } from "@/components/ui/enhanced-button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { usePayment } from "@/hooks/usePayment";
export function CTASection() {
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
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <div className="neumorphic p-12 rounded-3xl text-center mb-12 glow-primary">
          <h2 className="text-3xl md:text-5xl font-light mb-6 tracking-wide">
            Ready to <span className="gradient-text font-medium">Compete</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-light">
            Join Technoxian championship with professional equipment. 
            Limited early bird slots available.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button variant="hero" size="lg" className="group font-light" onClick={handlePayment} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Claim Your Kit'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
          </div>

          <div className="flex justify-center">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <Mail className="w-5 h-5 text-primary" />
              <span>contact@dronesoccers.com</span>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="neumorphic p-6 rounded-2xl text-center">
            <h3 className="text-xl font-bold mb-3 text-primary">Event Duration</h3>
            <p className="text-muted-foreground">Full event rental period included in all packages</p>
          </div>
          <div className="neumorphic p-6 rounded-2xl text-center">
            <h3 className="text-xl font-bold mb-3 text-primary">Early Bird Deadline</h3>
            <p className="text-muted-foreground">Limited time offer - book before slots fill up</p>
          </div>
          <div className="neumorphic p-6 rounded-2xl text-center">
            <h3 className="text-xl font-bold mb-3 text-primary">Payment</h3>
            <p className="text-muted-foreground">Secure payment options available</p>
          </div>
        </div>
      </div>
    </section>;
}