import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');

  if (token) {
    // Token exists, user is authenticated
    return true;
  } else {
    // Token does not exist, redirect to login
    router.navigate(['/login']);
    return false;
  }
};

export const noAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');

  if (token) {
    // Token exists, user is authenticated
    router.navigate(['/social-post']); // Redirect to a protected route
    return false;
  } else {
    // Token does not exist, allow access to login and signup
    return true;
  }
};
