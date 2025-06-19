// app/api/generate-image/route.ts

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
    
    // --- FIXED: Using a prompt that works well with DALL-E 3 ---
    const prompt = `Digital art, epic cinematic shot of a ${year} ${make} ${model} (${fuelType} variant). Photorealistic, professional automotive photography style, parked on a scenic mountain road at sunset with dramatic lighting.`;

    // --- FIXED: Switched to OpenRouter API ---
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // --- FIXED: Using the OpenRouter key ---
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`, 
      },
      body: JSON.stringify({
        // --- FIXED: Using a reliable image model from OpenRouter ---
        model: 'openai/dall-e-3', 
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        // DALL-E 3 uses 'size' and 'quality' instead of width/height/steps
        n: 1,
        size: '1024x1024',
        quality: 'hd' // or 'standard'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate image', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("OpenRouter Response Data:", data);

    // --- FIXED: Correctly parsing the URL from the OpenAI-compatible response ---
    // The URL is usually in the first choice's message content.
    // For DALL-E, the response is a markdown-style image link. We need to extract the URL.
    const messageContent = data.choices[0]?.message?.content;
    const imageUrl = messageContent?.match(/\((.*?)\)/)?.[1]; // Extracts URL from markdown link

    if (!imageUrl) {
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