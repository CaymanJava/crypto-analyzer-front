import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RefreshToken, TokenInfo } from './auth.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from "@ngx-toolkit/logger";
import { LoginCredentials } from "../login/login.model";
import { catchError, finalize, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  refreshTokenString = 'refresh_token';
  accessTokenString = 'access_token';
  loginState: any = {
    loggedInSuccessfulUrl: '/membership',
    params: null
  };
  private tokenEndpoint = '/tokens';
  private refreshEndpoint = '/tokens/refreshes';
  private apiUrl = environment.apiUrl;
  private hasLoggedInSubject = new Subject();
  hasLoggedIn = this.hasLoggedInSubject.asObservable();

  constructor(public http: HttpClient,
              private log: LoggerService,
              // private loaderService: LoaderService,
              private router: Router,
              // private notificationService: NotificationService,
              private modalService: NgbModal) {
  }

  getToken(value: LoginCredentials): void {
    this.getTokenInfo(value)
      .pipe(finalize(() => this.onTokenRequestEnd()))
      .subscribe(
        (tokenInfo: TokenInfo) => {
          this.log.debug('Get token success');
          this.saveTokensInStorage(tokenInfo);
          this.router.navigate([this.loginState.loggedInSuccessfulUrl], {queryParams: this.loginState.params});
        },
        (err: any) => {
          if (err.status === 403) {
            // this.notificationService.error(this.translateService.instant('core.error.loginUnavailable'));
            return;
          }
          // this.notificationService.error(this.translateService.instant('core.error.wrongLoginOrPassword'));
          this.log.debug('Get token error');
        }
      );
  }

  removeToken(): void {
    localStorage.removeItem(this.refreshTokenString);
    localStorage.removeItem(this.accessTokenString);
  }

  refreshToken(): Observable<TokenInfo> {
    this.log.debug('Refreshing token');
    const request = new RefreshToken();
    request.refreshToken = localStorage.getItem(this.refreshTokenString);
    return this.http.post(`${this.apiUrl}${this.refreshEndpoint}`, request)
      .pipe(
        map(
          (response: TokenInfo) => {
            this.log.debug('Got token info', {response: response});
            return response;
          }),
        catchError((error: any) => {
          if (error.status === 401 || error.status === 422 || error.status === 403) {
            this.removeToken();
            this.router.navigate(['/login']);
          }
          return throwError(error);
        }));
  }

  saveTokensInStorage(tokenInfo: TokenInfo) {
    localStorage.setItem(this.refreshTokenString, tokenInfo.refreshToken);
    localStorage.setItem(this.accessTokenString, tokenInfo.accessToken);
    this.hasLoggedInSubject.next();
  }

  isLoggedIn() {
    return localStorage.getItem(this.accessTokenString) != null;
  }

  setUnauthorizedUrl(url: string, params: {}) {
    this.loginState.loggedInSuccessfulUrl = url;
    this.loginState.params = params;
  }

  private getTokenInfo(value: LoginCredentials): Observable<TokenInfo> {
    this.log.debug('Getting token', {value: value, apiUrl: this.apiUrl});
    this.onTokenRequestStart();
    return this.http.post(`${this.apiUrl}${this.tokenEndpoint}`, value)
      .pipe(map((response: TokenInfo) => {
        this.log.debug('Got token info', {response: response});
        return response;
      }));
  }

  private onTokenRequestStart() {
    // this.loaderService.show();
  }

  private onTokenRequestEnd() {
    // this.loaderService.hide();
  }
}
