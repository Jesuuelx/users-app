import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../interfaces/users.interface';
import { environments } from '../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private baseUrl: string = environments.baseUrl;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.http
      .get<User>(`${this.baseUrl}/users/${id}`)
      .pipe(catchError((err) => of(undefined)));
  }

  getSuggestions(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?q=${query}&_limit=6`);
  }
}
