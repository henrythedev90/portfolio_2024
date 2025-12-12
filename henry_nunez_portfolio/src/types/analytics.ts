export interface Analytics {
  deviceBreakdown: DeviceBreakdown;
  totalMessages: number;
  unreadCount: number;
  projectTagStats: Array<ProjectTagStats>;
  contactedCount: number;
  notContactedCount: number;
  resumeDownloads: number;
  recentDownloads: Array<RecentDownload>;
  messagesOverTime: Array<MessagesOverTime>;
}

interface DeviceBreakdown {
  mobile: number;
  desktop: number;
  tablet: number;
  unknown: number;
}
interface ProjectTagStats {
  _id: string;
  count: number;
}

interface RecentDownload {
  _id: string;
  userAgent: string;
  deviceType: string;
  referer: string;
  downloadedAt: string;
}

interface MessagesOverTime {
  _id: string;
  count: number;
}
