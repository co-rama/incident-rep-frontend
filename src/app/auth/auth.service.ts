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

  // private authUser = signal<any | null>(this.readLocalStorageUser());
  loggedUser = this.authUser.asReadonly();

  constructor() {
    this.authUser.set(this.readLocalStorageUser());
  }
  readLocalStorageUser(): any {
    if (typeof window !== 'undefined') {
      const userData: any = localStorage.getItem(this.userStorageKey);
      return userData ? JSON.parse(userData) : '';
    }
    return '';
  }
  setLocalStorageUser(user: AuthResponse) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.userStorageKey, JSON.stringify(user));
    }
  }
  getOptions(): object {
    const user = this.readLocalStorageUser();

    const token = user?.token || ''; // Use optional chaining to safely access the token
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
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
  logout() {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem(this.userStorageKey))
        localStorage.removeItem(this.userStorageKey);
      this.authUser.set({
        token: '',
        email: '',
        expiresIn: 0,
        username: '',
      });
      this.router.navigate(['/login']);
    }
  }
}
