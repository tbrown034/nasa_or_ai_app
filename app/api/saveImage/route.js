import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function POST(request) {
  const { imageUrl } = await request.json();

  try {
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();

    const client = await pool.connect();
    await client.query("INSERT INTO ai_images (image_data) VALUES ($1)", [
      Buffer.from(imageBuffer),
    ]);
    client.release();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
