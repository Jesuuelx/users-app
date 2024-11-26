import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { User } from '../../interfaces/users.interface';

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
export class ChatPageComponent {
  public user?: User;
  public onSelectedUser: SelectMessage = { name: '', message: '' };
  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(1000),
        switchMap(({ id }) => this.usersService.getUserById(id))
      )
      .subscribe((user) => {
        if (!user) return this.router.navigate(['/users/list']);

        this.user = user;
        this.onSelectedUser = user.messages[0];
        return;
      });
  }
  goBack(): void {
    this.router.navigate(['/users/list']);
  }

  selectUser(user: SelectMessage): void {
    this.onSelectedUser = user;
  }
}
