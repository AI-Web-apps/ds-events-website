import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { paymentId, orderId, signature, customerData, amount } = await req.json()
    
    // Get Razorpay secret from Supabase secrets - NO FALLBACK for security
    const razorpaySecret = Deno.env.get('RAZORPAY_SECRET')
    
    if (!razorpaySecret) {
      console.error('RAZORPAY_SECRET not configured in Supabase secrets')
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Payment verification service not configured' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    // Validate required payment data
    if (!paymentId || !orderId || !signature) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Missing required payment data' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Verify payment signature
    const crypto = await import('https://deno.land/std@0.168.0/crypto/mod.ts')
    const expectedSignature = await crypto.hmac(
      'sha256',
      razorpaySecret,
      `${orderId}|${paymentId}`,
      'hex'
    )

    const isValid = expectedSignature === signature

    if (isValid) {
      // Store payment details in database using service role
      const supabaseService = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
        { auth: { persistSession: false } }
      )

      // Insert payment record
      const { data: payment, error: paymentError } = await supabaseService
        .from('payments')
        .insert({
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          razorpay_signature: signature,
          amount: amount || 0,
          currency: 'INR',
          status: 'completed',
          customer_name: customerData?.name || '',
          customer_email: customerData?.email || '',
          customer_phone: customerData?.phone || '',
          verified: true,
          metadata: { verified_at: new Date().toISOString() }
        })
        .select()
        .single()

      if (paymentError) {
        console.error('Failed to store payment:', paymentError)
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'Payment verified but failed to store record' 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500 
          }
        )
      }

      // Create booking record
      const { error: bookingError } = await supabaseService
        .from('bookings')
        .insert({
          payment_id: payment.id,
          customer_name: customerData?.name || '',
          customer_email: customerData?.email || '',
          customer_phone: customerData?.phone || '',
          kit_type: 'complete_team_package',
          quantity: 1,
          total_amount: amount || 0,
          status: 'confirmed',
          event_details: {
            event: 'Technoxian Drone Soccer Challenge',
            dates: '30th Aug to 02nd Sep, 2025',
            venue: 'India Expo Mart, Greater Noida'
          }
        })

      if (bookingError) {
        console.error('Failed to create booking:', bookingError)
      }

      console.log('Payment verified and stored successfully:', { 
        paymentId, 
        orderId, 
        paymentRecordId: payment.id 
      })
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Payment verified successfully',
          paymentId,
          bookingId: payment.id
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Payment verification failed' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }
  } catch (error) {
    console.error('Payment verification error:', error.message)
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Payment verification failed' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})