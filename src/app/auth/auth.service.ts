import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Auth, AuthResponse } from './login/auth.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpService = inject(HttpClient);
  private router = inject(Router);
  url = `${environment.backendUrl}/auth`;
  userStorageKey = 'user';

  // storedUser = localStorage.getItem(this.userStorageKey);

  authUser = signal<AuthResponse>({
    token: '',
    email: '',
    expiresIn: 0,
    username: '',
  });

  loggedUser = this.authUser.asReadonly();
  constructor() {
    this.authUser.set(this.readLocalStorageUser());
  }
  readLocalStorageUser() {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem(this.userStorageKey);
      if (userData) {
        return JSON.parse(userData);
      }
    }
  }
  setLocalStorageUser(user: AuthResponse) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.userStorageKey, JSON.stringify(user));
    }
  }
  login(authData: Auth) {
    return this.httpService
      .post<AuthResponse>(`${this.url}/login`, {
        email: authData.email,
        password: authData.password,
      })
      .pipe(
        // tap is used to perform side effects without changing the value
        tap({
          next: (userData: AuthResponse) => {
            // console.log(userData);
            const user = {
              username: userData.username,
              email: userData.email,
              token: userData.token,
              access: userData.access,
              isLoggedIn: userData.isLoggedIn,
              expiresIn: userData.expiresIn,
              success: userData.success,
            };
            this.setLocalStorageUser(user);
            this.authUser.set(user);
          },
          error: (error) => {
            console.log(error);
          },
        })
      );
  }
}
