import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class LoggedinGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loggedIn = this.authService.isLoggedIn();
    if (!loggedIn) {
      this.authService.setUnauthorizedUrl(state.url.split('?')[0], route.queryParams);
      this.router.navigate(['/login']);
    }
    return loggedIn;
  }

}
