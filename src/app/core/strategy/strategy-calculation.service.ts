import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ApiService } from "../api/api.service";
import { LoggerService } from "@ngx-toolkit/logger";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";
import { StrategyCalculationRequest } from "./strategy.model";

@Injectable({
  providedIn: "root"
})
export class StrategyCalculationService {

  private apiUrl = environment.apiUrl.concat('/strategy');

  constructor(private api: ApiService,
              private log: LoggerService) {
  }

  calculateStrategy(request: StrategyCalculationRequest): Observable<any[]> {
    this.log.debug("Calculating strategy values", {request: request});
    return this.api.get(`${this.apiUrl}`, {}, request)
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Calculated strategy values', {response: response});
          return response.body;
        }));
  }

}
