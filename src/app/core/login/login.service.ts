import { Injectable } from '@angular/core';
import { LoginCredentials } from './login.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  constructor(private authService: AuthService, private router: Router) {
  }

  login(value: LoginCredentials) {
    this.authService.getToken(value);
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
