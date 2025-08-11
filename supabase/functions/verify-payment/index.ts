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
    const { paymentId, orderId, signature } = await req.json()
    
    // Get Razorpay secret from Supabase secrets
    const razorpaySecret = Deno.env.get('RAZORPAY_SECRET')
    
    if (!razorpaySecret) {
      throw new Error('Razorpay secret not configured')
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
      // Here you can store payment details in your database
      console.log('Payment verified successfully:', { paymentId, orderId })
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Payment verified successfully',
          paymentId 
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
    console.error('Payment verification error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})