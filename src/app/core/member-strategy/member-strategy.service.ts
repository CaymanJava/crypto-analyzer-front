import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ApiService } from "../api/api.service";
import { LoggerService } from "@ngx-toolkit/logger";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";
import { MemberStrategy, MemberStrategyRequest } from "./member-strategy.model";
import { PageableParams, PageSlice } from "../api/api.model";

@Injectable({
  providedIn: "root"
})
export class MemberStrategyService {

  private apiUrl = environment.apiUrl.concat('/me/strategies');

  constructor(private apiService: ApiService,
              private log: LoggerService) {
  }

  getStrategies(pageableParams: PageableParams = {page: 0}, filterParams: any = {}): Observable<PageSlice> {
    this.log.debug("Getting member strategies", {pageableParams: pageableParams, filterParams: filterParams});
    return this.apiService.get(`${this.apiUrl}`, pageableParams, filterParams)
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Got member strategies', {response: response});
          return <PageSlice>response.body;
        }));
  }

  create(request: MemberStrategyRequest): Observable<number> {
    return this.apiService.post(`${this.apiUrl}`, request, true)
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Created member strategy', {response: response});
          return <number>response.body;
        }));
  }

  update(id: number, request: MemberStrategyRequest): Observable<MemberStrategy> {
    return this.apiService.put(`${this.apiUrl}/${id}`, request, true)
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Created member strategy', {response: response});
          return <MemberStrategy>response.body;
        }));
  }

  getMemberStrategy(id: number): Observable<MemberStrategy> {
    return this.apiService.get(`${this.apiUrl}/${id}`, {}, {})
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Got member strategy', {response: response});
          return <MemberStrategy>response.body;
        }));
  }

}
