import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Dummy data
  const metadata = {
    title: "Quarter Moon and Sister Stars",
    copyright: "Image Credit & Copyright: Alan Dyer, TWAN",
    explanation: `Nine days ago, two quite different sky icons were imaged rising together. Specifically, Earth's Moon shared the eastern sky with the sister stars of the Pleiades cluster, as viewed from Alberta, Canada. Astronomical images of the well-known Pleiades often show the star cluster's alluring blue reflection nebulas, but here they are washed-out by the orange moonrise sky. The half-lit Moon, known as a quarter moon, is overexposed, although the outline of the dim lunar night side can be seen by illuminating earthshine, light first reflected from the Earth. The featured image is a composite of eight successive exposures with brightnesses adjusted to match what the human eye would see. The Moon passes nearly -- or directly -- in front of the Pleaides once a month.`,
  };

  try {
    // Create a prompt for DALL·E based on the metadata
    const prompt = `Generate an image titled "${metadata.title}".
    The scene should capture: ${metadata.explanation}.
    Mimic the original image as closely as possible using only this description, without seeing the image itself.
    Ensure that the generated image includes all the key elements described in the metadata, such as the moon, stars, and any other significant features.`;

    // Generate the image using OpenAI's DALL·E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);

    // Return a JSON response with an error message
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
