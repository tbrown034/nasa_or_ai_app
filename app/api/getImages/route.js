import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM ai_images ORDER BY created_at DESC"
    );
    client.release();

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
