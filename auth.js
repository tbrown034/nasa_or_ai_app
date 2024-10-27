import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import pool from "@/lib/db"; // Import the pool from your db.js/

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool), // Use the PostgreSQL adapter
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
