import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken");

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error("Error verifying authentication:", error);
    return NextResponse.json(
      { authenticated: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
