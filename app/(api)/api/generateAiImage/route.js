import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  const { metadata } = await request.json();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Truncate metadata fields if they are too long
  const title = metadata.title?.slice(0, 100); // Limit the title to 100 characters
  const explanation = metadata.explanation?.slice(0, 500); // Limit the explanation to 500 characters

  // Optimized prompt to stay well within the 4096 token limit
  const prompt = `
    Generate an AI image inspired by NASA's Astronomy Picture of the Day (APOD) for an educational game. The image should replicate NASA's style (infer based on metadat whether it's earth, space or more abstract photo) and make it hard to distinguish from real APOD images.

    Use the following metadata:
    - **Title**: "${title}"
    - **Explanation**: "${explanation}" (truncated for brevity)
    - **Date**: ${metadata.date}
    ${metadata.copyright ? `- **Image Credit**: ${metadata.copyright}` : ""}

    Guidelines:
    1. **Adapt to Content**: If it's an Earth-based photograph, mimic realistic landscapes, atmospheric events, or natural phenomena. For space-related content, generate detailed cosmic scenes with stars, nebulae, or celestial bodies. For scientific data visualizations, maintain a sense of realism with plausible representations.
    2. **Style and Realism**: The image should feel scientifically accurate, and visually plausible, as if it were captured with a telescope or satellite, like Hubble or JWST images.
    3. **Avoid Text**: Do not include any text or labels within the image.
    4. **Square Format**: Ensure the image fits a 1024x1024 resolution.
    5. **Realism and Accuracy**: Make sure the generated image mimics the level of realism found in NASA APOD images, whether photorealistic, abstract, or scientific data-based.

    The goal is to create an image that users would struggle to distinguish from a real NASA APOD.
  `;

  try {
    // Generate the AI image using OpenAI's DALL·E 3
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
