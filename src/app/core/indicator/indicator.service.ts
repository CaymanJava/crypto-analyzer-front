import { Injectable } from "@angular/core";
import { IndicatorCalculationRequest } from "./indicator.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ApiService } from "../api/api.service";
import { LoggerService } from "@ngx-toolkit/logger";

@Injectable({
  providedIn: "root"
})
export class IndicatorService {

  private apiUrl = environment.apiUrl.concat('/indicator');

  constructor(private api: ApiService,
              private log: LoggerService) {
  }

  calculateIndicator(request: IndicatorCalculationRequest): Observable<any[]> {
    this.log.debug("Calculating indicator values", {request: request});
    return this.api.get(`${this.apiUrl}/`, {}, request)
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Calculated indicator values', {response: response});
          return response.body;
        }));
  }

}
