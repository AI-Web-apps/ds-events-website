import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePayment } from "@/hooks/usePayment";
import { useToast } from "@/hooks/use-toast";

interface ClaimKitDialogProps {
  children: React.ReactNode;
}

export function ClaimKitDialog({ children }: ClaimKitDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { processPayment, isProcessing } = usePayment();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Close the dialog
      setOpen(false);
      
      // Process payment with prefilled data
      await processPayment({
        amount: 3999,
        name: 'Complete Drone Soccer Kit',
        description: 'Complete Drone Soccer Kit - Technoxian Event (30th Aug to 02nd Sep, 2025)',
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        }
      });

      // Reset form after successful payment
      setFormData({ name: "", email: "", phone: "" });
      
    } catch (error) {
      // Error is already handled in the payment hook
      setOpen(true); // Reopen dialog if payment failed
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md neumorphic border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold gradient-text text-center">
            Claim Your Drone Soccer Kit
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-1"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="bg-card/50 rounded-xl p-4 border border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">₹3,999</div>
              <div className="text-sm text-muted-foreground line-through">₹5,999</div>
              <div className="text-sm text-primary font-medium">Early Bird Special</div>
            </div>
          </div>

          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting || isProcessing}
          >
            {isSubmitting || isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </form>
        
        <div className="text-xs text-muted-foreground text-center mt-4">
          After payment, you'll receive a confirmation email with all event details.
        </div>
      </DialogContent>
    </Dialog>
  );
}