import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

const endpoints = {
  googleOauthUrl: (redirectUrl: string, clientId: string, state: string) => `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code&redirect_uri=${redirectUrl}&client_id=${clientId}&state=${state}&access_type=offline&prompt=consent`,
  facebookOauthUrl: (redirectUrl: string, clientId: string, state: string) => `https://www.facebook.com/v4.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUrl}&state=${state}&response_type=code&scope=email`
};

@Injectable({
  providedIn: "root"
})
export class SocialAuthService {

  signInWithFB() {
    window.open(endpoints.facebookOauthUrl(this.getRedirectUri(), environment.facebookClientId, 'FACEBOOK'), '_blank', 'toolbar=0,location=0,menubar=0');
  }

  signInWithGoogle() {
    window.open(endpoints.googleOauthUrl(this.getRedirectUri(), environment.googleClientId, 'GOOGLE'), '_blank', 'toolbar=0,location=0,menubar=0');
  }

  private getRedirectUri() {
    return window.origin + '/session/social/callback';
  }

}
