import { auth } from "@/auth"; // Auth.js auth function for getting session data
import pool from "../../../lib/db"; // Assuming you have your db connection set up

export async function GET(req) {
  // Fetch session from the server using the Auth.js auth() function
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

    // Include session info that Auth.js already has (like name and image) along with DB data
    return new Response(
      JSON.stringify({
        name: session.user.name || user.name,
        email: session.user.email || user.email,
        image: session.user.image || user.image,
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
