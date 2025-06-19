
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { make, model, year, fuel } = await request.json();

    if (!make || !model || !year) {
      return NextResponse.json(
        { error: 'Missing required parameters: make, model, year' },
        { status: 400 }
      );
    }

    const fuelType = fuel === 'gas' ? 'gasoline' : fuel || 'modern';
    // A prompt optimized for Stable Diffusion models
    const prompt = `award-winning professional automotive photography, ${year} ${make} ${model} ${fuelType}, photorealistic, stunning cinematic shot, scenic mountain road, golden hour lighting`;

    // --- FIXED: Switched back to ImageRouter and its specific endpoint ---
    const response = await fetch('https://imagerouter.io/api/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // --- FIXED: Using the ImageRouter API Key from your environment ---
        'Authorization': `Bearer ${process.env.IMAGEROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        // --- FIXED: Using the correct FREE model from ImageRouter ---
        model: 'stabilityai/sdxl-turbo:free',
        prompt: prompt,
        // SDXL Turbo works best with specific sizes and fewer steps
        width: 512,
        height: 320,
        steps: 10, // Turbo models are fast, they don't need many steps
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('ImageRouter API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate image', details: errorData },
        { status: response.status }
      );
    }

    const imageData = await response.json();
    
    // --- FIXED: Parsing the simpler response from ImageRouter ---
    // ImageRouter often returns a simple object with a URL.
    const imageUrl = imageData.url || imageData.image_url;

    if (!imageUrl) {
        console.error("Image URL not found in ImageRouter response", imageData);
        throw new Error("Image URL not found in the response");
    }

    return NextResponse.json({ 
      imageUrl: imageUrl,
      prompt: prompt 
    });

  } catch (error) {
    console.error('Error in generate-image route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}