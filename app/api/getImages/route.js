import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET() {
  try {
    const client = await pool.connect();

    // Fetch images from the new model only
    const newImagesResult = await client.query(`
      SELECT
        metadata.id AS metadata_id,
        metadata.title,
        metadata.explanation,
        metadata.copyright,
        metadata.date,
        nasa.url AS nasa_image_url,
        ai.ai_image AS ai_image_data
      FROM
        image_metadata metadata
      LEFT JOIN
        image_nasa nasa ON metadata.id = nasa.metadata_id
      LEFT JOIN
        image_ai ai ON metadata.id = ai.metadata_id
      ORDER BY
        metadata.date_time_added DESC
    `);

    client.release();

    return NextResponse.json(newImagesResult.rows);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
