import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private tokenService: TokenService,
              private router: Router) {
  }

  canActivate(): boolean {
    const notLogged = this.tokenService.getAccessToken() == undefined;

    console.log('NoAuthGuard notLogged ', notLogged);
    if (!notLogged) {
      this.router.navigate(['/dashboard']);
    }

    return notLogged;
  }

}
