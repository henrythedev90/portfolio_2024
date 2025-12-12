import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/app/lib/db";

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken");
  if (!token) {
    throw new Error("Unauthorized");
  }
}

export async function GET() {
  try {
    await checkAuth();

    const db = await getDb();
    const messagesCollection = db.collection("messages");

    const messages = await messagesCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Convert to CSV
    const headers = [
      "Date",
      "Name",
      "Email",
      "Message",
      "Device Type",
      "Read",
      "Archived",
      "Starred",
      "Contacted",
      "Project Tag",
    ];

    const rows = messages.map((msg) => [
      new Date(msg.createdAt).toISOString(),
      `"${(msg.name || "").replace(/"/g, '""')}"`,
      msg.email || "",
      `"${(msg.message || "").replace(/"/g, '""')}"`,
      msg.deviceType || "unknown",
      msg.isRead ? "Yes" : "No",
      msg.isArchived ? "Yes" : "No",
      msg.isStarred ? "Yes" : "No",
      msg.isContacted ? "Yes" : "No",
      msg.projectTag || "",
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="messages-${
          new Date().toISOString().split("T")[0]
        }.csv"`,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error exporting messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
