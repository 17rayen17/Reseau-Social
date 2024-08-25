import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authState$ = this.authSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  register(email: string, username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { email, username, password });
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.authSubject.next(false);
  }

}
