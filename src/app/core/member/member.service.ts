import { Injectable } from "@angular/core";
import { Member } from "./member.model";
import { Observable } from "rxjs";
import { ApiService } from "../api/api.service";
import { map } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { LoggerService } from "@ngx-toolkit/logger";

@Injectable({
  providedIn: "root"
})
export class MemberService {

  private apiUrl = environment.apiUrl.concat('/me');

  constructor(private apiService: ApiService,
              private log: LoggerService) {
  }

  getMember(): Observable<Member> {
    return this.apiService.get(this.apiUrl, {}, {})
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Got member', {response: response});
          return <Member>response.body;
        }));
  }

}
