export interface Member {
  id: number;
  email: string;
  phone: string;
  name: string;
  surname: string;
  status: string;
  registrationDate: string;
  lastLoggedIn: string;
}

export class MemberPasswordChange {
  newPassword: string;
  oldPassword: string;
}

export class AppUser {
  anonymous: boolean;
  details: Member;

  constructor(anonymous: boolean, details: Member) {
    this.anonymous = anonymous;
    this.details = details;
  }

  static anonymousUser() {
    return new AppUser(true, null);
  }

  static loggedUser(details: Member) {
    return new AppUser(false, details);
  }

}

