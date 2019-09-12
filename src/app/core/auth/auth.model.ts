export class TokenInfo {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresIn: string;

  static empty() {
    return new TokenInfo();
  }
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export class RegisterData {
  email: string;
  password: string;
  phone: string;
  name: number;
  surname: string;
}


