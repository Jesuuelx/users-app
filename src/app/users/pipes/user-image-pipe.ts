import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/users.interface';

@Pipe({
  name: 'userImage',
  standalone: false,
})
export class UserImagePipe implements PipeTransform {
  transform(user: User): string {
    if (!user.id && !user.alt_img) {
      return 'assets/no-image.png';
    }

    if (user.alt_img) return user.alt_img; // https:///google.com/flash.png

    return `assets/heroes/${user.id}.jpg`;
  }
}
