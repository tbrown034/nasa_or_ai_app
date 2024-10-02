// getImageA.js (NASA image)
import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const nasaImageId = searchParams.get("id");

  if (!nasaImageId) {
    return NextResponse.json({ success: false, error: "Missing image ID" });
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT url FROM image_nasa WHERE metadata_id = $1`,
      [nasaImageId]
    );

    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: "NASA image not found",
      });
    }

    const nasaUrl = result.rows[0].url;

    // Fetch the image from the URL and return it as a blob
    const imageResponse = await fetch(nasaUrl);
    const imageBuffer = await imageResponse.arrayBuffer();

    return new Response(imageBuffer, {
      headers: { "Content-Type": "image/jpeg" }, // Adjust content type as needed
    });
  } catch (error) {
    console.error("Error fetching NASA image:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
