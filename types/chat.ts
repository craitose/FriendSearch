export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  readAt?: Date;
  type: 'text' | 'image';
  imageUrl?: string;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: Date;
  typingUsers: string[];
  unreadCount: number;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  online: boolean;
  lastSeen?: Date;
}