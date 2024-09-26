import { auth } from "@/auth";
import pool from "../../../lib/db";

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  const userEmail = session.user.email;

  try {
    const client = await pool.connect();

    const result = await client.query(
      `
      SELECT name, email, image, created_at
      FROM users
      WHERE email = $1
    `,
      [userEmail]
    );

    client.release();

    const user = result.rows[0];
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Fallback to session image if database image is null
    return new Response(
      JSON.stringify({
        name: user.name || session.user.name,
        email: user.email || session.user.email,
        image: user.image || session.user.image, // Use session image if database image is null
        created_at: user.created_at,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
