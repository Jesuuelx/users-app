import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket?: Socket;
  private readonly SERVER_URL = 'http://localhost:81/chat';

  constructor() {
    this.connect();
  }

  connect(): void {
    if (!this.socket || this.socket.disconnected) {
      this.socket = io(this.SERVER_URL, {
        withCredentials: true,
        transports: ['websocket'],
      });

      this.socket.on('connect', () => {
        console.log('✅ WebSocket conectado:', this.socket?.id);
      });

      this.socket.on('disconnect', () => {
        console.log('❌ WebSocket desconectado');
      });
    }
  }

  joinRoom(room: string) {
    this.connect();
    this.socket?.emit('joinRoom', room);
  }

  leaveRoom(room: string) {
    this.socket?.emit('leaveRoom', room);
  }

  sendMessage(senderName: string, message: string, room: string) {
    this.socket?.emit('chatToServer', { senderName, message, room });
  }

  onMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket?.on('chatToClient', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket?.off('chatToClient');
      };
    });
  }

  disconnect() {
    this.socket?.disconnect();
  }
}
