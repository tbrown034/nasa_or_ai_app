import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  const { metadata } = await request.json();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Refined prompt for generating the AI image
  const prompt = `Generate an image titled "${metadata.title}".
  The scene should capture: ${metadata.explanation}.
  Mimic the original image as closely as possible using only this description, without seeing the image itself.
  Ensure that the generated image includes all the key elements described in the metadata, such as ${
    metadata.title
  }, the location (${
    metadata.copyright ? `by ${metadata.copyright.trim()}` : "unknown"
  }), and the celestial objects or phenomena mentioned. The goal is to create an image that could convincingly resemble the original photograph taken on ${
    metadata.date
  }`;

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
