import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Get admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD environment variable is not set" },
        { status: 500 }
      );
    }

    if (!password || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate a simple token (in production, use a proper JWT library)
    const token = Buffer.from(`${Date.now()}-${Math.random()}`).toString(
      "base64"
    );

    // Set cookie with token
    const cookieStore = await cookies();
    cookieStore.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ token, success: true });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
