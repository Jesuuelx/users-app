import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { User } from '../../interfaces/users.interface';

@Component({
  selector: 'app-user-page',
  standalone: false,

  templateUrl: './user-page.component.html',
  styles: ``,
})
export class UserPageComponent {
  public user?: User;
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
        console.log({ user });
        return;
      });
  }
  goBack(): void {
    this.router.navigate(['/users/list']);
  }
}
