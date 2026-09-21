import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../services/auth-service';
import { LoginDto } from '../models/login-dto';
import { ApiResponse } from '../../ApiResponse';
import { AuthResponseDto } from '../models/auth-response-dto';
import { AlertService } from '../../../shared/services/alert-service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {
  // Injections
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private fb = inject(FormBuilder);

  // State Variables
  userLogin!: LoginDto;
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;

  // Form Control Getters
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Lifecycle
  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  fillDemo(role: 'admin' | 'doctor' | 'patient') {
    const credentials: Record<string, { email: string; pass: string }> = {
      admin: { email: 'admin@healthcare.com', pass: 'Admin123!' },
      doctor: { email: 'doctor@healthcare.com', pass: 'Doctor123!' },
      patient: { email: 'patient@healthcare.com', pass: 'Patient123!' }
    };

    const target = credentials[role];
    if (target) {
      this.loginForm.patchValue({
        email: target.email,
        password: target.pass
      });
    }
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    this.alertService.info(
      'Password Reset',
      'Please contact your hospital system administrator or IT helpdesk to reset clinical credentials.'
    );
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.userLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(this.userLogin).subscribe({
      next: (response: ApiResponse<AuthResponseDto>) => {
        this.isLoading = false;
        this.alertService.toastSuccess(response.message || 'Login successful');
      },
      error: (error: any) => {
        this.isLoading = false;
        const msg = error?.error?.message || 'Invalid email or password';
        this.alertService.toastError(msg);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
