import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authentService = inject(AuthenticationService);
  const router = inject(Router);
  if(!authentService.isAuthenticated){
    return router.parseUrl('/login')
  }
  return true;
};
