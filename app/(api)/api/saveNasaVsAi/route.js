import { NextResponse } from "next/server";
import pool from "../../../../lib/db";
export async function POST(request) {
  const { metadata, nasaUrl, aiImageUrl } = await request.json();

  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");

    // Insert metadata into image_metadata table
    const metadataResult = await client.query(
      `INSERT INTO image_metadata (title, explanation, copyright, date)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [metadata.title, metadata.explanation, metadata.copyright, metadata.date]
    );

    const metadataId = metadataResult.rows[0].id;

    // Insert NASA image URL into image_nasa table
    await client.query(
      `INSERT INTO image_nasa (metadata_id, url)
       VALUES ($1, $2)`,
      [metadataId, nasaUrl]
    );

    // Fetch the AI image as a buffer
    const aiImageResponse = await fetch(aiImageUrl);
    const aiImageBuffer = await aiImageResponse.arrayBuffer();

    // Insert AI image into image_ai table
    await client.query(
      `INSERT INTO image_ai (metadata_id, ai_image)
       VALUES ($1, $2)`,
      [metadataId, Buffer.from(aiImageBuffer)]
    );

    await client.query("COMMIT");
    client.release();

    return NextResponse.json({ success: true });
  } catch (error) {
    if (client) await client.query("ROLLBACK");
    console.error("Error saving NASA vs AI data:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
