import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(AlertService)

  if (authService.isLoggedIn()) {
    return true;
  } else {
    authService.logout();
    toastr.toastError('You are not authorized to access this page');
    router.navigate(['/auth']);
    return false;
  }
};
