import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { UserImagePipe } from './pipes/user-image-pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
    CardComponent,
    UserImagePipe,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
