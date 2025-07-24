
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Default image set for various professions - fallback if Unsplash API fails
const defaultImages = {
  "architects": "https://images.unsplash.com/photo-1486718448742-163732cd78e6?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3",
  "accountants": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3",
  "doctors": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3",
  "attorneys": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3",
  "engineers": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3",
  "default": "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3"
};

// Memory cache to avoid repeated API calls for the same profession
const imageCache: Record<string, string> = {};

interface UnsplashResponse {
  results: {
    urls: {
      regular: string;
    };
    alt_description: string;
  }[];
  total: number;
  total_pages: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const { profession } = await req.json();
    console.log(`Generating image for profession: ${profession}`);
    
    if (!profession) {
      console.error("No profession provided");
      return new Response(
        JSON.stringify({
          imageUrl: defaultImages.default,
          source: "error-no-profession"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    // Convert profession to lowercase for consistent lookup
    const normalizedProfession = profession.toLowerCase();
    
    // Check cache first
    if (imageCache[normalizedProfession]) {
      console.log(`Using cached image for profession: ${normalizedProfession}`);
      return new Response(
        JSON.stringify({
          imageUrl: imageCache[normalizedProfession],
          source: "cache"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if we have a default image for this profession before trying Unsplash
    const defaultImageKeys = Object.keys(defaultImages);
    for (const key of defaultImageKeys) {
      if (normalizedProfession.includes(key)) {
        const defaultImage = defaultImages[key];
        console.log(`Found matching default image for "${key}" in profession "${normalizedProfession}"`);
        
        // Store in cache
        imageCache[normalizedProfession] = defaultImage;
        
        return new Response(
          JSON.stringify({
            imageUrl: defaultImage,
            source: "default-match"
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }
    
    // Use the exact match if available
    if (normalizedProfession in defaultImages) {
      const defaultImage = defaultImages[normalizedProfession];
      
      // Store in cache
      imageCache[normalizedProfession] = defaultImage;
      
      return new Response(
        JSON.stringify({
          imageUrl: defaultImage,
          source: "default-exact"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    // If not in cache or defaults, try Unsplash API
    const unsplashAccessKey = Deno.env.get("UNSPLASH_ACCESS_KEY");
    if (!unsplashAccessKey) {
      console.error("Unsplash access key not found");
      return new Response(
        JSON.stringify({
          imageUrl: defaultImages.default,
          source: "default-fallback-no-key"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create search query - add "professional" to get more relevant images
    const searchTerm = `${normalizedProfession} professional office`;
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&per_page=1&orientation=landscape`;

    console.log(`Fetching image from Unsplash for: ${searchTerm}`);
    const unsplashResponse = await fetch(unsplashUrl, {
      headers: {
        "Authorization": `Client-ID ${unsplashAccessKey}`
      }
    });

    if (unsplashResponse.ok) {
      const data = await unsplashResponse.json() as UnsplashResponse;
      
      if (data.results && data.results.length > 0) {
        const imageUrl = data.results[0].urls.regular;
        
        // Store in cache
        imageCache[normalizedProfession] = imageUrl;
        
        return new Response(
          JSON.stringify({
            imageUrl,
            source: "unsplash"
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }
    
    console.log("No Unsplash results or API error, using default image");
    // Fallback to default image if Unsplash fails or returns no results
    return new Response(
      JSON.stringify({
        imageUrl: defaultImages.default,
        source: "default-fallback-unsplash-failed"
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error generating image:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to generate image",
        imageUrl: defaultImages.default,
        source: "error-fallback" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
