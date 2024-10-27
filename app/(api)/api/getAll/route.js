import { NextResponse } from "next/server";
import pool from "../../../../lib/db";

export async function GET() {
  try {
    const client = await pool.connect();

    // Limit the query to 20 results and exclude large binary data (like images)
    const newImagesResult = await client.query(`
      SELECT
        metadata.id AS metadata_id,
        metadata.title,
        metadata.explanation,
        metadata.copyright,
        metadata.date,
        metadata.date_time_added,  -- Ensure this is fetched
        nasa.url AS nasa_image_url
      FROM
        image_metadata metadata
      LEFT JOIN
        image_nasa nasa ON metadata.id = nasa.metadata_id
      ORDER BY
        metadata.date_time_added DESC
      LIMIT 20  -- Hard limit for testing purposes
    `);

    client.release();

    // Use a dynamic response without caching
    const response = NextResponse.json(newImagesResult.rows, {
      headers: {
        "Cache-Control": "no-store", // No caching to ensure it's not pre-rendered
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
