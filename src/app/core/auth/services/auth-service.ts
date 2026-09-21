import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { LoginDto } from '../models/login-dto';
import { ApiResponse } from '../../ApiResponse';
import { AuthResponseDto } from '../models/auth-response-dto';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //injections
  private http = inject(HttpClient);
  private router = inject(Router);

  //vars
  public readonly baseUrl = environment.apiUrl + '/Auth';
  public token = signal<string>(localStorage.getItem('token') || '');
  public userEmail = signal<string>(localStorage.getItem('email') || '');
  public roles = signal<string[]>(localStorage.getItem('roles')?.split(',') || []);
  public isLoggedIn = computed(() => {
    return this.token() !== '';
  });
  protected fullName = signal<string>(localStorage.getItem('fullName') || '');

  //methods
  login(user: LoginDto) {
    return this.http.post<ApiResponse<AuthResponseDto>>(this.baseUrl + '/login', user).pipe(
      tap((response: ApiResponse<AuthResponseDto>) => {
        if (response.isSuccess && response.data?.token) {
          this.token.set(response.data.token);
          localStorage.setItem('token', response.data.token);

          this.userEmail.set(response.data.email);
          localStorage.setItem('email', response.data.email);

          this.roles.set(response.data.roles);
          localStorage.setItem('roles', response.data.roles.join(','));

          this.fullName.set(response.data.fullName);
          localStorage.setItem('fullName', response.data.fullName);

          this.redirectToDashboard();
        }
      }),
    );
  }

  // غير الدوال دي جوه الـ AuthService عشان تبقى computed signals

  public isAdmin = computed(() => {
    return this.roles().some((role) => role.toLowerCase() === 'admin');
  });

  public isDoctor = computed(() => {
    return this.roles().some((role) => role.toLowerCase() === 'doctor');
  });

  public isPatient = computed(() => {
    return this.roles().some((role) => role.toLowerCase() === 'patient');
  });

  logout() {
    this.token.set('');
    localStorage.removeItem('token');

    this.userEmail.set('');
    localStorage.removeItem('email');

    this.roles.set([]);
    localStorage.removeItem('roles');

    this.fullName.set('');
    localStorage.removeItem('fullName');

    this.router.navigate(['/login']);
  }

  private redirectToDashboard() {
    const firstRole = this.roles()[0].toLowerCase();
    switch (firstRole) {
      case 'admin':
        this.router.navigate(['/dashboard']);
        break;
      case 'doctor':
        this.router.navigate(['/doctors']);
        break;
      case 'patient':
        this.router.navigate(['/patient-dashboard']);
        break;
      default:
        this.router.navigate(['/patient-dashboard']);
    }
  }
}
