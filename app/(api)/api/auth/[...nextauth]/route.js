// app/api/auth/[...nextauth]/route.js
import { handlers } from "@/auth"; // Importing from auth.js

export const { GET, POST } = handlers;
