import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ApiService } from "../api/api.service";
import { LoggerService } from "@ngx-toolkit/logger";
import { PageableParams, PageSlice } from "../api/api.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class MonitoringService {

  private apiUrl = environment.apiUrl.concat('/me/signal');

  constructor(private apiService: ApiService,
              private log: LoggerService) {
  }

  getSignals(pageableParams: PageableParams = {page: 0}, filterParams: any = {}): Observable<PageSlice> {
    this.log.debug("Getting member signals", {pageableParams: pageableParams, filterParams: filterParams});
    return this.apiService.get(`${this.apiUrl}`, pageableParams, filterParams)
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Got member signals', {response: response});
          return <PageSlice>response.body;
        }));
  }

}
