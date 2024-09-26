// getrandompairRoute.js
import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET() {
  try {
    const client = await pool.connect();

    // Select a random image metadata entry
    const randomMetadataResult = await client.query(`
      SELECT id, title, explanation, copyright, date
      FROM image_metadata
      ORDER BY RANDOM()
      LIMIT 2
    `);

    const metadata = randomMetadataResult.rows[0];
    if (!metadata) {
      return NextResponse.json({ success: false, error: "No images found" });
    }

    const nasaResult = await client.query(
      `
      SELECT url
      FROM image_nasa
      WHERE metadata_id = $1
    `,
      [metadata.id]
    );

    const aiResult = await client.query(
      `
      SELECT ai_image
      FROM image_ai
      WHERE metadata_id = $1
    `,
      [metadata.id]
    );

    client.release();

    return NextResponse.json({
      success: true,
      metadata,
      nasaUrl: nasaResult.rows[0]?.url,
      aiImageData: aiResult.rows[0]?.ai_image,
    });
  } catch (error) {
    console.error("Error fetching random image pair:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
