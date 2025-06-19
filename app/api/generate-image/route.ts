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

    // Construct a detailed prompt for the AI image generator
    const fuelType = fuel === 'gas' ? 'gasoline' : fuel || 'modern';
    const prompt = `A realistic high-quality photo of a ${year} ${make} ${model} ${fuelType} car on a scenic road, professional automotive photography, cinematic lighting, detailed exterior, modern setting`;

    const imageRouterResponse = await fetch('https://imagerouter.io/api/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.IMAGEROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-exp:free',
        prompt: prompt,
        width: 512,
        height: 320,
        steps: 20,
      }),
    });

    if (!imageRouterResponse.ok) {
      const errorText = await imageRouterResponse.text();
      console.error('ImageRouter API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to generate image', details: errorText },
        { status: 500 }
      );
    }

    const imageData = await imageRouterResponse.json();
    
    // Return the generated image URL
    return NextResponse.json({ 
      imageUrl: imageData.url || imageData.image_url || imageData.data?.url,
      prompt: prompt 
    });

  } catch (error) {
    console.error('Error generating car image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}