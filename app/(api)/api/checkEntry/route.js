import { NextResponse } from "next/server";
import pool from "../../../../lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { success: false, error: "Date is required" },
      { status: 400 }
    );
  }

  try {
    const client = await pool.connect();

    // Check if an entry exists for the given date
    const result = await client.query(
      `SELECT id FROM image_metadata WHERE date = $1`,
      [date]
    );

    client.release();

    // If the entry exists, return the ID
    if (result.rows.length > 0) {
      return NextResponse.json({
        success: true,
        exists: true,
        metadataId: result.rows[0].id,
      });
    } else {
      return NextResponse.json({ success: true, exists: false });
    }
  } catch (error) {
    console.error("Error checking entry:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
