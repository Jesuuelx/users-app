import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/users.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [],
  standalone: false,
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public users: User[] = [];
  public selectedHero?: User;

  constructor(private usersService: UsersService, private router: Router) {}

  searchUser() {
    const value: string = this.searchInput.value || '';

    this.usersService
      .getSuggestions(value)
      .subscribe((users) => (this.users = users));
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const user: User = event.option.value;
    this.searchInput.setValue(user.name_user);

    this.selectedHero = user;
    this.router.navigate(['/users/person', user.id]);
  }
}
