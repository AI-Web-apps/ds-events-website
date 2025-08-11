import { useState } from 'react';
import { initializeRazorpayPayment, PaymentOptions } from '@/utils/razorpay';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processPayment = async (options: PaymentOptions) => {
    setIsProcessing(true);
    
    try {
      const result = await initializeRazorpayPayment(options);
      
      toast({
        title: "Payment Successful! 🎉",
        description: "Your Drone Soccer Kit has been booked. Meet us at Technoxian for the event!",
      });
      
      // Log payment details
      console.log('Payment successful:', result);
      
      return result;
    } catch (error: any) {
      if (error.message !== 'Payment cancelled by user') {
        toast({
          title: "Payment Failed",
          description: "There was an issue processing your payment. Please try again.",
          variant: "destructive",
        });
      }
      
      console.error('Payment error:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processPayment,
    isProcessing
  };
};