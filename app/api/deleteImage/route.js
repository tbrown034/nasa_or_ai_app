// app/api/deleteImage/route.js

import { NextResponse } from "next/server";
import pool from "../../../lib/db"; // Adjust path to your db connection

export async function POST(request) {
  let client;
  try {
    const { imageId } = await request.json(); // Parse JSON body to get imageId

    client = await pool.connect();
    await client.query("BEGIN");

    // First delete from related tables
    await client.query("DELETE FROM image_nasa WHERE metadata_id = $1", [
      imageId,
    ]);
    await client.query("DELETE FROM image_ai WHERE metadata_id = $1", [
      imageId,
    ]);

    // Delete from metadata table
    const result = await client.query(
      "DELETE FROM image_metadata WHERE id = $1",
      [imageId]
    );

    if (result.rowCount === 0) {
      throw new Error("Image not found");
    }

    await client.query("COMMIT");
    return NextResponse.json({ success: true });
  } catch (error) {
    if (client) await client.query("ROLLBACK");
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}
