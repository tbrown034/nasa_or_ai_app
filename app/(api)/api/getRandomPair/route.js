// app/api/getRandomPair/route.js
import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Correct import path for db.js
export async function GET() {
  try {
    const client = await pool.connect();

    // Select a random image metadata entry
    const randomMetadataResult = await client.query(`
      SELECT id, title, explanation, copyright, date
      FROM image_metadata
      ORDER BY RANDOM()
      LIMIT 1
    `);

    const metadata = randomMetadataResult.rows[0];
    if (!metadata) {
      return NextResponse.json({ success: false, error: "No images found" });
    }

    client.release();

    return NextResponse.json({
      success: true,
      metadata,
      nasaImageId: metadata.id, // Send metadata id for NASA image
      aiImageId: metadata.id, // Send metadata id for AI image
    });
  } catch (error) {
    console.error("Error fetching random image pair:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
