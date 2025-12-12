export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  deviceType: string;
  createdAt: string;
  isRead: boolean;
  isArchived: boolean;
  isStarred: boolean;
  isContacted: boolean;
  projectTag: string | null;
}
