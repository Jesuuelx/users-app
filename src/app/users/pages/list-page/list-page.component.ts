import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/users.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-list-page',
  standalone: false,

  templateUrl: './list-page.component.html',
  styles: ``,
})
export class ListPageComponent implements OnInit {
  public users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
