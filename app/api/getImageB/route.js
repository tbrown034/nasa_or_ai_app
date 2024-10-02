// getImageB.js (AI image)
import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const aiImageId = searchParams.get("id");

  if (!aiImageId) {
    return NextResponse.json({ success: false, error: "Missing image ID" });
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT ai_image FROM image_ai WHERE metadata_id = $1`,
      [aiImageId]
    );

    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: "AI image not found" });
    }

    const aiImageData = result.rows[0].ai_image;

    return new Response(Buffer.from(aiImageData), {
      headers: { "Content-Type": "image/png" }, // Adjust content type as needed
    });
  } catch (error) {
    console.error("Error fetching AI image:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
