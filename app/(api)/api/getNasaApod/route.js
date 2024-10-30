import { NextResponse } from "next/server";

export async function GET(request) {
  const apiKey = process.env.NASA_API_KEY;
  const { searchParams } = new URL(request.url);

  // Retrieve optional query parameters from the request
  const date = searchParams.get("date");
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");
  const count = searchParams.get("count");
  const thumbs = searchParams.get("thumbs") || false;

  let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&thumbs=${thumbs}`;

  // Determine which type of request to make
  if (count) {
    url += `&count=${count}`;
  } else if (date) {
    url += `&date=${date}`;
  } else if (start_date && end_date) {
    url += `&start_date=${start_date}&end_date=${end_date}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch APOD data");
    }

    const data = await response.json();

    // If `count` is used, the API returns an array, but we only want the first random APOD.
    return NextResponse.json(Array.isArray(data) ? data[0] : data);
  } catch (error) {
    console.error("Error fetching APOD:", error);
    return NextResponse.json(
      { error: "Failed to fetch APOD" },
      { status: 500 }
    );
  }
}
