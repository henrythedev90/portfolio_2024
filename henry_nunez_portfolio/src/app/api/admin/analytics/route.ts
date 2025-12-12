import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/app/lib/db";

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken");
  if (!token) {
    throw new Error("Unauthorized");
  }
}

export async function GET(_request: NextRequest) {
  try {
    await checkAuth();

    const db = await getDb();
    const messagesCollection = db.collection("messages");
    const downloadsCollection = db.collection("resumeDownloads");

    // Get device type analytics
    const deviceStats = await messagesCollection
      .aggregate([
        {
          $group: {
            _id: "$deviceType",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const deviceBreakdown: Record<string, number> = {
      mobile: 0,
      desktop: 0,
      tablet: 0,
      unknown: 0,
    };

    deviceStats.forEach((stat) => {
      deviceBreakdown[stat._id || "unknown"] = stat.count;
    });

    // Get total messages
    const totalMessages = await messagesCollection.countDocuments();

    // Get unread messages
    const unreadCount = await messagesCollection.countDocuments({
      isRead: false,
    });

    // Get messages by project tag
    const projectTagStats = await messagesCollection
      .aggregate([
        {
          $group: {
            _id: "$projectTag",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ])
      .toArray();

    // Get contacted vs not contacted
    const contactedCount = await messagesCollection.countDocuments({
      isContacted: true,
    });

    // Get resume download stats
    const resumeDownloads = await downloadsCollection.countDocuments();
    const recentDownloads = await downloadsCollection
      .find({})
      .sort({ downloadedAt: -1 })
      .limit(10)
      .toArray();

    // Get messages over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const messagesOverTime = await messagesCollection
      .aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysAgo },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    return NextResponse.json({
      deviceBreakdown,
      totalMessages,
      unreadCount,
      projectTagStats: projectTagStats.filter((stat) => stat._id !== null),
      contactedCount,
      notContactedCount: totalMessages - contactedCount,
      resumeDownloads,
      recentDownloads,
      messagesOverTime,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
