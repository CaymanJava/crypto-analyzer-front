import { Injectable } from "@angular/core";
import { TickData, TickPeriodRequest, TickTimeRequest} from "./tick.model";
import { Observable } from "rxjs";
import { ApiService } from "../api/api.service";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";
import { LoggerService } from "@ngx-toolkit/logger";

@Injectable({
  providedIn: "root"
})
export class TickService {
  private apiUrl = environment.apiUrl.concat('/front-office/tick');

  constructor(private api: ApiService,
              private log: LoggerService) {
  }

  getTicksByPeriod(request: TickPeriodRequest): Observable<TickData> {
    this.log.debug("Getting ticks by period", {request: request});
    return this.api.get(`${this.apiUrl}/period`, {}, request)
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Got ticks by period', {response: response});
          return <TickData>response.body;
        }));
  }

  getTicksByTime(request: TickTimeRequest): Observable<TickData> {
    this.log.debug("Getting ticks by time", {request: request});
    return this.api.get(`${this.apiUrl}/time`, {}, request)
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Got ticks by time', {response: response});
          return <TickData>response.body;
        }));
  }

}
