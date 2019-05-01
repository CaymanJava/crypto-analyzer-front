import { Injectable } from "@angular/core";
import { PageableParams, PageSlice } from "../api/api.model";
import { Observable } from "rxjs";
import { ApiService } from "../api/api.service";
import { LoggerService } from "@ngx-toolkit/logger";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class MarketService {

  private apiUrl = environment.apiUrl.concat('/front-office/market');

  constructor(private api: ApiService,
              private log: LoggerService) {
  }

  getMarkets(pageableParams: PageableParams = {page: 0}, filterParams: any = {}): Observable<PageSlice> {
    this.log.debug("Getting markets", {pageableParams: pageableParams, filterParams: filterParams});
    return this.api.get(`${this.apiUrl}`, pageableParams, filterParams)
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Got markets', {response: response});
          return <PageSlice>response.body;
        }));
  }

}
