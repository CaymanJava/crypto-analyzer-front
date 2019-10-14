import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TokenService } from "./token.service";
import { AuthService } from "./auth.service";


@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService,
              private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError(error => this.handleError(request, error, next)));
  }

  addAuthenticationToken(request) {
    const accessToken = this.tokenService.getAccessToken();
    if (!accessToken) {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: this.tokenService.getAccessToken()
      }
    });
  }

  private handleError(request: HttpRequest<any>, error, next: HttpHandler) {
    if (request.url.includes("tokens")) {
      return this.handleRequestWithTokens(request, error);
    }

    if (error.status !== 401) {
      return throwError(error);
    }

    return this.refreshToken(next, request);
  }

  private refreshToken(next: HttpHandler, request: HttpRequest<any>) {
    if (this.refreshTokenInProgress) {
      return this.waitForTokenRefreshProcessResult(next, request);
    } else {
      return this.startRefreshTokenProcess(next, request);
    }
  }

  private startRefreshTokenProcess(next: HttpHandler, request: HttpRequest<any>) {
    this.refreshTokenInProgress = true;
    this.refreshTokenSubject.next(null);
    return this.authService.refreshAccess()
      .pipe(
        switchMap((token: any) => this.handleRefreshTokenResponse(token, next, request)),
        catchError((error: any) => this.handleRefreshTokenError(error))
      )
  }

  private handleRefreshTokenError(error: any) {
    this.refreshTokenInProgress = false;
    return throwError(error);
  }

  private handleRefreshTokenResponse(token: any, next: HttpHandler, request: HttpRequest<any>) {
    this.refreshTokenInProgress = false;
    this.refreshTokenSubject.next(token);
    return next.handle(this.addAuthenticationToken(request));
  }

  private waitForTokenRefreshProcessResult(next: HttpHandler, request: HttpRequest<any>) {
    return this.refreshTokenSubject.pipe(
      filter(result => result !== null),
      take(1),
      switchMap(() => next.handle(this.addAuthenticationToken(request)))
    )
  }

  private handleRequestWithTokens(request: HttpRequest<any>, error) {
    if (request.url.includes("tokens/refresh")) {
      this.logOut();
    }
    return throwError(error);
  }

  private logOut() {
    this.authService.logout();
  }

}
