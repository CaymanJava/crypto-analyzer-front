import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginCredentials, RegisterData, TokenInfo } from './auth.model';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoggerService } from "@ngx-toolkit/logger";
import { map, tap } from "rxjs/operators";
import { AppUser, Member, MemberUpdateRequest } from "../member/member.model";
import { TokenService } from "./token.service";
import { MemberService } from "../member/member.service";
import { ApiService } from "../api/api.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private tokenApi = environment.apiUrl.concat('/tokens');
  private registerApi = environment.apiUrl.concat('/registration');

  constructor(public http: HttpClient,
              private log: LoggerService,
              private tokenService: TokenService,
              private memberService: MemberService,
              private api: ApiService,
              private router: Router) {
  }

  getAppUser(): Observable<AppUser> {
    if (this.tokenService.getAccessToken() != undefined) {
      return this.memberService.getMember().pipe(map(member => AppUser.loggedUser(member)))
    }
    return of(AppUser.anonymousUser());
  }

  register(data: RegisterData): Observable<Member> {
    return this.api.post(this.registerApi, data, false)
      .pipe(
        map((response: HttpResponse<any>) => {
          return <Member>response.body;
        })
      );
  }

  processSocialAccess(provider: string, authCode: string) {
    return this.api.post(`${this.tokenApi}/social`, {provider: provider, authCode: authCode}, false)
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.body;
        })
      );
  }

  completeSocialTokenProcess(memberId: number, request: MemberUpdateRequest) {
    return this.api.post(`${this.tokenApi}/social/complete/${memberId}`, request, false)
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.body;
        })
      );
  }

  login(data: LoginCredentials): Observable<void> {
    return this.api.post(this.tokenApi, data, false)
      .pipe(
        tap(token => this.tokenService.setTokens(token.body))
      );
  }

  refreshAccess(): Observable<TokenInfo> {
    return this.api.post(`${this.tokenApi}/refresh`, {refreshToken: this.tokenService.getRefreshToken()}, false)
      .pipe(tap(token =>
        this.tokenService.setTokens(token.body))
      );
  }

  logout() {
    this.tokenService.removeTokens();
    this.router.navigate(['/session/login']);
  }

}
