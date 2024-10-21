// generateAIImage.route.js
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  const { metadata } = await request.json();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Generate an image inspired by NASA's Astronomy Picture of the Day (APOD).
  APOD showcases images ranging from direct telescope captures to processed representations of astronomical data. These images aim to educate and inspire, often accompanied by explanations that deepen understanding.

  This image is for an app that challenges users to distinguish between real NASA photos and AI-generated images. It must mimic NASA's style, content, and visual characteristics, making it hard to tell the difference.

  Use the following metadata to guide the image generation:
  - **Title**: "${metadata.title}"
  - **Explanation**: ${metadata.explanation}
  - **Copyright**: ${
    metadata.copyright
      ? `Image Credit: ${metadata.copyright.trim()}`
      : "No specific copyright information"
  }
  - **Date**: ${metadata.date}.

  ### Guidelines:
  1. **Interpret Thoughtfully**: Ensure the primary subject and context are the focal points. If specific celestial objects or phenomena are mentioned, feature them prominently.
  2. **Select Photo Type**:
     - **Photorealistic**: For direct observations, use realistic lighting, textures, and spatial relationships.
     - **Processed Data**: For non-visible wavelengths, use scientifically accurate colors and patterns.
     - **Abstract/Artistic**: For conceptual depictions, use symbolic representations while maintaining scientific integrity.
  3. **Use Metadata**: Consider the date for style and technology representation, and respect the artistic intent if copyright is provided.
  4. **Visual Coherence**: Ensure the image is scientifically plausible and visually engaging, avoiding any signs of AI generation.
  5. **Avoid Text**: Do not include text or labels within the image. The image should stand alone.

  ### Objective:
  Create an image that could convincingly appear as NASA's APOD, challenging users to determine if it's real or AI-generated.`;

  try {
    // Generate the AI image using OpenAI's DALL·E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url; // Get the generated image URL

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error generating AI image:", error);

    return NextResponse.json(
      { error: "Failed to generate AI image" },
      { status: 500 }
    );
  }
}
