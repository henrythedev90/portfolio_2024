import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userAgent, referer } = body;

    const db = await getDb();
    const downloadsCollection = db.collection("resumeDownloads");

    // Helper function to detect device type
    function getDeviceType(userAgent: string | null): "mobile" | "desktop" | "tablet" | "unknown" {
      if (!userAgent) return "unknown";
      const ua = userAgent.toLowerCase();
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
      }
      if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
      }
      return "desktop";
    }

    const downloadDoc = {
      userAgent: userAgent || "unknown",
      deviceType: getDeviceType(userAgent),
      referer: referer || "unknown",
      downloadedAt: new Date(),
    };

    await downloadsCollection.insertOne(downloadDoc);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking resume download:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

