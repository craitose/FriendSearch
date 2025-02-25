import { io, Socket } from 'socket.io-client';
import NetInfo from '@react-native-community/netinfo';
import { Message, ChatRoom } from '../types/chat';

interface SocketEvents {
  onMessageReceived: (message: Message) => void;
  onTypingStart: (data: { userId: string; roomId: string }) => void;
  onTypingEnd: (data: { userId: string; roomId: string }) => void;
  onMessageRead: (data: { messageId: string; userId: string }) => void;
  onUserOnlineStatus: (data: { userId: string; online: boolean }) => void;
}

export class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private eventHandlers: Partial<SocketEvents> = {};
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  private constructor() {
    this.setupNetworkListener();
  }

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  private setupNetworkListener() {
    NetInfo.addEventListener(state => {
      if (state.isConnected && !this.socket?.connected) {
        this.reconnect();
      }
    });
  }

  async connect(userId: string): Promise<void> {
    try {
      this.socket = io('YOUR_WEBSOCKET_SERVER_URL', {
        auth: { userId },
        reconnection: true,
        reconnectionAttempts: this.MAX_RECONNECT_ATTEMPTS,
      });

      this.setupEventListeners();
    } catch (error) {
      console.error('Socket connection error:', error);
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('message', (message: Message) => {
      this.eventHandlers.onMessageReceived?.(message);
    });

    this.socket.on('typing:start', (data: { userId: string; roomId: string }) => {
      this.eventHandlers.onTypingStart?.(data);
    });

    this.socket.on('typing:end', (data: { userId: string; roomId: string }) => {
      this.eventHandlers.onTypingEnd?.(data);
    });

    this.socket.on('message:read', (data: { messageId: string; userId: string }) => {
      this.eventHandlers.onMessageRead?.(data);
    });

    this.socket.on('user:status', (data: { userId: string; online: boolean }) => {
      this.eventHandlers.onUserOnlineStatus?.(data);
    });
  }

  private async reconnect() {
    if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
      console.log('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    try {
      await this.socket?.connect();
    } catch (error) {
      console.error('Reconnection error:', error);
    }
  }

  setEventHandler<K extends keyof SocketEvents>(
    event: K,
    handler: SocketEvents[K]
  ) {
    this.eventHandlers[event] = handler;
  }

  sendMessage(message: Message) {
    this.socket?.emit('message', message);
  }

  sendTypingStart(roomId: string, userId: string) {
    this.socket?.emit('typing:start', { roomId, userId });
  }

  sendTypingEnd(roomId: string, userId: string) {
    this.socket?.emit('typing:end', { roomId, userId });
  }

  markMessageAsRead(messageId: string, userId: string) {
    this.socket?.emit('message:read', { messageId, userId });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}