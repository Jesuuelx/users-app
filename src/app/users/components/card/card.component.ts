import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/users.interface';

@Component({
  selector: 'users-user-card',
  standalone: false,

  templateUrl: './card.component.html',
  styles: [],
})
export class CardComponent {
  @Input()
  public user!: User;

  ngOnInit(): void {
    if (!this.user) throw new Error('User is required');
  }
}
