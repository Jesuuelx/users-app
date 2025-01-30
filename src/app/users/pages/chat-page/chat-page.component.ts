import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap, Subscription } from 'rxjs';
import { User } from '../../interfaces/users.interface';
import { WebSocketService } from '../../services/websocket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface SelectMessage {
  name: string;
  message: string;
}

@Component({
  selector: 'app-chat-page',
  standalone: false,
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent implements OnInit, OnDestroy {
  public user?: User;
  public onSelectedUser: SelectMessage = { name: '', message: '' };
  public messagesMap: Map<string, { senderName: string; message: string }[]> =
    new Map();
  private apiSubscription?: Subscription;
  private socketSubscription?: Subscription;
  public currentRoom: string = '';

  public chatForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private websocketService: WebSocketService,
    private formBuilder: FormBuilder
  ) {
    this.chatForm = this.formBuilder.group({
      messageInput: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.websocketService.connect();
    this.apiSubscription = this.activatedRoute.params
      .pipe(
        delay(1000),
        switchMap(({ id }) => this.usersService.getUserById(id))
      )
      .subscribe((user) => {
        if (!user) {
          this.router.navigate(['/users/list']);
          return;
        }

        this.user = user;
        this.onSelectedUser = user.messages[0];

        if (this.onSelectedUser?.name) {
          this.changeChat(this.onSelectedUser);
        }

        this.socketSubscription = this.websocketService
          .onMessage()
          .subscribe((msg) => {
            if (msg.room === this.currentRoom) {
              this.saveMessage(this.currentRoom, msg);
            }
          });
      });
  }

  goBack(): void {
    this.router.navigate(['/users/list']);
  }

  changeChat(user: SelectMessage): void {
    if (this.currentRoom) {
      this.websocketService.leaveRoom(this.currentRoom);
    }

    this.onSelectedUser = user;
    this.currentRoom = this.getRoomId(
      this.user!.name_user,
      this.onSelectedUser.name
    );
    this.websocketService.joinRoom(this.currentRoom);

    if (!this.messagesMap.has(this.currentRoom)) {
      this.messagesMap.set(this.currentRoom, []);
    }
  }

  sendMessage(): void {
    if (this.chatForm.invalid) return;

    const message = this.chatForm.get('messageInput')?.value.trim();
    if (message && this.onSelectedUser?.name) {
      const timestamp = this.getCurrentDateTime(); // 📌 Obtener fecha y hora actuales
      const messageWithTime = `${message} - ${timestamp}`;
      const newMessage = {
        senderName: this.user!.name_user,
        message: messageWithTime,
      };

      this.websocketService.sendMessage(
        this.user!.name_user,
        messageWithTime,
        this.currentRoom
      );
      this.saveMessage(this.currentRoom, newMessage);
      this.chatForm.reset();
    }
  }

  private saveMessage(
    room: string,
    msg: { senderName: string; message: string }
  ) {
    if (!this.messagesMap.has(room)) {
      this.messagesMap.set(room, []);
    }

    const messages = this.messagesMap.get(room)!;

    if (
      !messages.some(
        (m) => m.senderName === msg.senderName && m.message === msg.message
      )
    ) {
      messages.push(msg);
    }
  }

  getRoomId(user1: string, user2: string): string {
    return [user1, user2].sort().join('_');
  }

  getCurrentDateTime(): string {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convierte formato 24h a 12h (1-12)
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Asegurar siempre dos dígitos en los minutos

    return `${hours}:${formattedMinutes} ${amPm}`;
  }

  ngOnDestroy(): void {
    if (this.currentRoom) {
      this.websocketService.leaveRoom(this.currentRoom);
    }
    this.websocketService.disconnect();

    this.apiSubscription?.unsubscribe();
    this.socketSubscription?.unsubscribe();
  }
}
