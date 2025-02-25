import { Message, ChatRoom } from '../types/chat';

export class ChatService {
  private static messages: Message[] = [];
  private static chatRooms: ChatRoom[] = [];

  static async getChatRooms(userId: string): Promise<ChatRoom[]> {
    // In a real app, this would fetch from a backend
    return this.chatRooms.filter(room => room.participants.includes(userId));
  }

  static async getMessages(chatRoomId: string): Promise<Message[]> {
    // In a real app, this would fetch from a backend
    return this.messages.filter(message => message.id === chatRoomId);
  }

  static async sendMessage(
    senderId: string,
    receiverId: string,
    content: string
  ): Promise<Message> {
    const message: Message = {
      id: Date.now().toString(),
      senderId,
      receiverId,
      content,
      timestamp: new Date(),
      read: false,
    };

    this.messages.push(message);
    
    // Update or create chat room
    const roomId = this.getChatRoomId(senderId, receiverId);
    const existingRoom = this.chatRooms.find(room => room.id === roomId);
    
    if (existingRoom) {
      existingRoom.lastMessage = message;
      existingRoom.updatedAt = new Date();
    } else {
      this.chatRooms.push({
        id: roomId,
        participants: [senderId, receiverId],
        lastMessage: message,
        updatedAt: new Date(),
      });
    }

    return message;
  }

  private static getChatRoomId(user1Id: string, user2Id: string): string {
    return [user1Id, user2Id].sort().join('-');
  }
}