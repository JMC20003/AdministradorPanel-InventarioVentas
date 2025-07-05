import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.estaAutenticado()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
