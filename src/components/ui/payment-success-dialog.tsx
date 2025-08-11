import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/enhanced-button";
import { CheckCircle, Download, Calendar, MapPin } from "lucide-react";

interface PaymentSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentDetails?: {
    paymentId: string;
    orderId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
  };
}

export function PaymentSuccessDialog({ 
  open, 
  onOpenChange, 
  paymentDetails 
}: PaymentSuccessDialogProps) {

  const generateBill = () => {
    if (!paymentDetails) return;
    
    const billContent = `
DRONE SOCCERS - PAYMENT RECEIPT
================================

Event: Drone Soccer Challenge by Technoxian
Dates: 30th Aug to 02nd Sep, 2025
Location: Technoxian Venue

Customer Details:
Name: ${paymentDetails.customerName}
Email: ${paymentDetails.customerEmail}

Payment Details:
Payment ID: ${paymentDetails.paymentId}
Order ID: ${paymentDetails.orderId}
Amount Paid: ₹${paymentDetails.amount}
Payment Date: ${new Date().toLocaleDateString()}

Package Includes:
• Complete Drone Soccer Kit (4 Drones)
• Free Training Session
• Event Participation Access
• Technical Support

Thank you for your purchase!
Contact: contact@dronesoccers.com

================================
    `;

    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DroneKit_Receipt_${paymentDetails.orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg neumorphic border-border">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-semibold text-center">
            Payment Successful! 🎉
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Your Drone Soccer Kit has been successfully booked for the Technoxian event.
            </p>
            
            {paymentDetails && (
              <div className="bg-card/50 rounded-xl p-4 border border-border/50 space-y-2">
                <div className="text-sm text-muted-foreground">Payment ID</div>
                <div className="font-mono text-sm">{paymentDetails.paymentId}</div>
                <div className="text-2xl font-bold text-primary">₹{paymentDetails.amount}</div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-card/30 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">Event Dates</div>
                <div className="text-sm text-muted-foreground">30th Aug to 02nd Sep, 2025</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-card/30 rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">Meet us at Technoxian</div>
                <div className="text-sm text-muted-foreground">Event venue details will be shared via email</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={generateBill}
              variant="neumorphic" 
              size="lg" 
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            
            <Button 
              onClick={() => onOpenChange(false)}
              variant="hero" 
              size="lg" 
              className="w-full"
            >
              Close
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            You'll receive a confirmation email shortly with all event details and instructions.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}