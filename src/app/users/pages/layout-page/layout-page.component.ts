import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  standalone: false,

  templateUrl: './layout-page.component.html',
  styles: ``,
})
export class LayoutPageComponent {
  public sideBarItems = [
    { label: 'List of Users', url: './list', icon: 'label' },
    { label: 'Search User', url: './search', icon: 'search' },
  ];
}
