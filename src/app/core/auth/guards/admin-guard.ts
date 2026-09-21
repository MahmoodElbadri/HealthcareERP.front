import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { AlertService } from '../../../shared/services/alert-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(AlertService);
  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  } else {
    authService.logout();
    toastr.toastError('You are not authorized to access this page');
    router.navigate(['/auth']);
    return false;
  }
};
