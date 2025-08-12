declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentOptions {
  amount: number;
  currency?: string;
  name?: string;
  description?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export const initializeRazorpayPayment = ({
  amount,
  currency = 'INR',
  name = 'Drone Soccer Kit',
  description = 'Complete Drone Soccer Kit - Technoxian Event',
  prefill = {}
}: PaymentOptions) => {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error('Razorpay SDK not loaded'));
      return;
    }

    const options = {
      key: 'rzp_live_RmOAWq55Zo6Gd8', // Live key
      amount: amount * 100, // Convert to paise
      currency,
      name: 'Drone Soccers',
      description,
      image: '/favicon.ico',
      handler: async function (response: any) {
        try {
          // Import supabase client dynamically to avoid circular deps
          const { supabase } = await import('@/integrations/supabase/client');
          
          // Verify payment with Supabase edge function
          const { data: verificationResult, error } = await supabase.functions.invoke('verify-payment', {
            body: {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              customerData: prefill,
              amount: amount
            }
          });

          if (error) {
            console.error('Verification error:', error);
            reject(new Error('Payment verification failed'));
            return;
          }
          
          if (verificationResult?.success) {
            resolve({
              success: true,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              verified: true,
              customerName: prefill.name || '',
              customerEmail: prefill.email || '',
              amount: amount
            });
          } else {
            reject(new Error('Payment verification failed'));
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          reject(new Error('Payment verification error'));
        }
      },
      prefill: {
        name: prefill.name || '',
        email: prefill.email || 'contact@dronesoccers.com',
        contact: prefill.contact || ''
      },
      notes: {
        event: 'Technoxian Drone Soccer Challenge',
        dates: '30th Aug to 02nd Sep, 2025'
      },
      theme: {
        color: '#D97706' // Orange theme to match the design
      },
      modal: {
        ondismiss: function() {
          reject(new Error('Payment cancelled by user'));
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  });
};