import { Injectable } from "@angular/core";
import { TokenInfo } from "./auth.model";

const accessTokenParamName = 'access_token';
const refreshTokenParamName = 'refresh_token';

@Injectable({
  providedIn: "root"
})
export class TokenService {

  public setTokens(token: TokenInfo) {
    if (token.accessToken) {
      localStorage.setItem(accessTokenParamName, token.accessToken);
    }

    if (token.refreshToken) {
      localStorage.setItem(refreshTokenParamName, token.refreshToken);
    }
  }

  public removeTokens() {
    localStorage.removeItem(accessTokenParamName);
    localStorage.removeItem(refreshTokenParamName);
  }

  public getAccessToken(): string {
    let token = localStorage.getItem(accessTokenParamName);

    if (token) {
      return 'Bearer ' + token;
    }

    return token;
  }

  public getRefreshToken(): string {
    return localStorage.getItem(refreshTokenParamName);
  }

}
