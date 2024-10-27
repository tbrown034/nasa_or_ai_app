// app/api/dailyGenerate/route.js

import { NextResponse } from "next/server";
import db from "@/lib/db"; // Import your database connection
import { generateAiImage } from "@/lib/ai"; // Import AI generation utility
import fetchApodData from "@/lib/fetchApod"; // Utility to fetch NASA APOD data
import { formatDate } from "@/app/utils/dateUtils"; // Date formatting utility

// Serverless function to generate daily APOD pair
export async function GET() {
  try {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    // Check if today's APOD pair already exists
    const existingEntry = await db.query(
      "SELECT * FROM pairs WHERE date = $1",
      [formattedDate]
    );
    if (existingEntry.rows.length > 0) {
      return NextResponse.json({
        message: "Pair already exists for today",
        success: false,
      });
    }

    // Fetch today's NASA APOD data
    const apodData = await fetchApodData(formattedDate);

    if (!apodData || !apodData.url) {
      return NextResponse.json({
        message: "APOD data is missing or invalid",
        success: false,
      });
    }

    // Generate AI image using APOD metadata
    const aiImageUrl = await generateAiImage(apodData);

    // Save the APOD and AI-generated image to the database
    await db.query(
      "INSERT INTO pairs (date, metadata, nasa_image_url, ai_image_url) VALUES ($1, $2, $3, $4)",
      [formattedDate, apodData, apodData.url, aiImageUrl]
    );

    return NextResponse.json({
      message: "Daily APOD pair generated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error generating daily APOD pair:", error);
    return NextResponse.json({
      message: "Internal server error",
      success: false,
    });
  }
}
