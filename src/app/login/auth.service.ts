import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null = null;
  url = environment.url;

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string): Observable<User> {
    // return of(null as any);
    return this.httpClient.post<User>(`${this.url}/login`, {email, password});
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/register`, user);
    // return of(null as any);
  }

  setUser(user: User): void {
    this.currentUser = user;
  }

  logout() {
    this.currentUser = null;
  }


}
