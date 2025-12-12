import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/app/lib/db";
import { ObjectId } from "mongodb";

// Middleware to check authentication
async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken");
  if (!token) {
    throw new Error("Unauthorized");
  }
}

// GET - Fetch all messages with filters
export async function GET(request: NextRequest) {
  try {
    await checkAuth();

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter") || "all"; // all, unread, archived, starred
    const projectTag = searchParams.get("projectTag");
    const contacted = searchParams.get("contacted");

    const db = await getDb();
    const messagesCollection = db.collection("messages");

    const query: {
      isRead?: boolean;
      isArchived?: boolean;
      isStarred?: boolean;
      projectTag?: string;
      isContacted?: boolean;
    } = {};

    if (filter === "unread") {
      query.isRead = false;
    } else if (filter === "archived") {
      query.isArchived = true;
    } else if (filter === "starred") {
      query.isStarred = true;
    } else if (filter === "read") {
      query.isRead = true;
    }

    if (projectTag && projectTag !== "all") {
      query.projectTag = projectTag;
    }

    if (contacted === "true") {
      query.isContacted = true;
    } else if (contacted === "false") {
      query.isContacted = false;
    }

    const messages = await messagesCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ messages });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - Update message properties
export async function PATCH(request: NextRequest) {
  try {
    await checkAuth();

    const body = await request.json();
    const { messageId, updates } = body;

    if (!messageId || !updates) {
      return NextResponse.json(
        { error: "Message ID and updates are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const messagesCollection = db.collection("messages");

    const result = await messagesCollection.updateOne(
      { _id: new ObjectId(messageId) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error updating message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
