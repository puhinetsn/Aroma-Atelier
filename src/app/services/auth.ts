import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SignInFields, SignUpFields, UserToken } from '../models/auth';
import { tap, Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private user = signal<User | null>(null);

  signIn(input: SignInFields): Observable<UserToken> {
    return this.httpClient
      .post<UserToken>(`/api/auth/sign-in`, input)
      .pipe(tap((x) => localStorage.setItem('aromaAtelierToken', x.token)));
  }

  signUp(input: SignUpFields): Observable<UserToken> {
    return this.httpClient
      .post<UserToken>(`/api/auth/sign-up`, input)
      .pipe(tap((x) => localStorage.setItem('aromaAtelierToken', x.token)));
  }

  getUser(): Observable<User> {
    const user = this.user();
    if (user) {
      return of(user);
    }

    return this.httpClient
      .get<User>('/api/auth/user')
      .pipe(tap((x) => this.user.set(x)));
  }
}
