import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NASA_API_KEY; // Store your NASA API key in .env.local

  try {
    // Fetch the current APOD from NASA's API
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch APOD data");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching APOD:", error);
    return NextResponse.json(
      { error: "Failed to fetch APOD" },
      { status: 500 }
    );
  }
}
