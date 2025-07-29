import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Submit application function called')
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Processing application submission...')
    const bearerToken = Deno.env.get('WEBHOOK_BEARER_TOKEN')
    
    if (!bearerToken) {
      console.error('Bearer token not configured')
      return new Response(
        JSON.stringify({ error: 'Bearer token not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Bearer token found, parsing request body...')
    const formData = await req.json()
    console.log('Form data received:', formData)

    console.log('Sending to webhook...')
    const response = await fetch('https://eoy459hba6ncgm0.m.pipedream.net', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(formData),
    })

    console.log('Webhook response status:', response.status)
    const responseText = await response.text()
    console.log('Webhook response body:', responseText)

    if (response.ok) {
      console.log('Webhook submission successful')
      return new Response(
        JSON.stringify({ success: true }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    } else {
      console.error('Webhook submission failed with status:', response.status)
      throw new Error(`Webhook submission failed: ${response.status} - ${responseText}`)
    }
  } catch (error) {
    console.error('Error in submit-application function:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to submit application', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})