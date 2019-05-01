import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { PageableParams } from "./api.model";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, share } from "rxjs/operators";
import { LoggerService } from "@ngx-toolkit/logger";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})

export class ApiService {

  constructor(private http: HttpClient,
              private log: LoggerService,
              private authService: AuthService) {
  }

  // TODO change withAuth to true

  get(url: string, pageableParams?: PageableParams, filterParams?: any, withAuth: boolean = false): Observable<HttpResponse<any>> {
    return this.processAPIRequest(url, 'GET', withAuth, {}, pageableParams, filterParams);
  }

  put(url: string, data: any, withAuth: boolean = false): Observable<any> {
    return this.processAPIRequest(url, 'PUT', withAuth, data);
  }

  post(url: string, data: any, withAuth: boolean = false): Observable<any> {
    return this.processAPIRequest(url, 'POST', withAuth, data);
  }

  delete(url: string, withAuth: boolean = false): Observable<any> {
    return this.processAPIRequest(url, 'DELETE', withAuth);
  }

  download(url: string, withAuth: boolean = false): Observable<HttpResponse<any>> {
    return this.processAPIRequest(url, 'DOWNLOAD', withAuth);
  }

  private processAPIRequest(url: string, method: string, withAuth: boolean, data?: any, pageableParams?: PageableParams, filterParams?: any): Observable<HttpResponse<any>> {
    return this.callAPI(url, method, withAuth, data, pageableParams, filterParams)
      .pipe(catchError(initialError => {
        // if (this.notAuthorizedError(initialError)) {
        //   return this.refreshTokenAndRetryRequest(url, method, data, pageableParams, filterParams);
        // }
        return throwError(initialError);
      }));
  }

  private callAPI(url: string, method: string, withAuth: boolean, data?: any, pageableParams?: PageableParams, filterParams?: any): Observable<HttpResponse<any>> {
    const response: Observable<HttpResponse<any>> = this.getResponse(url, method, withAuth, data, pageableParams, filterParams);
    this.subscribeResponse(response, url, method);
    return response;
  }

  private getResponse(url: string, method: string, withAuth: boolean, data?: any, pageableParams?: PageableParams, filterParams?: any): Observable<HttpResponse<any>> {
    this.onRequestStart();
    switch (method) {
      case 'GET':
        let urlSearchParams: HttpParams = new HttpParams();

        urlSearchParams = this.getPageableParams(urlSearchParams, pageableParams);
        urlSearchParams = this.getFilterParams(urlSearchParams, filterParams);

        this.log.debug('Calling api [GET]', {
          url: url,
          pageableParams: pageableParams,
          filterParams: filterParams,
          urlSearchParams: urlSearchParams
        });
        return this.http.get(url, {headers: this.getHeaders(withAuth), observe: 'response', params: urlSearchParams}).pipe(share());
      case 'POST':
        this.log.debug('Calling api [POST]', {url: url, data: data});
        return this.http.post(url, data, {headers: this.getHeaders(withAuth), observe: 'response'}).pipe(share());
      case 'PUT':
        this.log.debug('Calling api [PUT]', {url: url, data: data});
        return this.http.put(url, data, {headers: this.getHeaders(withAuth), observe: 'response'}).pipe(share());
      case 'DELETE':
        this.log.debug('Calling api [DELETE]', {url: url});
        return this.http.delete(url, {headers: this.getHeaders(withAuth), observe: 'response'}).pipe(share());
      case 'DOWNLOAD':
        this.log.debug('Calling api [GET]', {url: url, expectedResponseType: 'blob'});
        return this.http.get(url, {headers: this.getHeaders(withAuth), observe: 'response', responseType: 'blob'}).pipe(share());
    }
    return null;
  }

  private getHeaders(withAuth: boolean): HttpHeaders {
    return this.buildHeaders(withAuth);
  }

  private buildHeaders(withAuth: boolean): HttpHeaders {
    const token = localStorage.getItem(this.authService.accessTokenString);
    // const locale = this.translate.currentLang || 'pl';
    // let headers: HttpHeaders = new HttpHeaders().set('Accept-Language', locale);
    let headers: HttpHeaders = new HttpHeaders();
    if (token == null || !withAuth) {
      this.log.debug('headers', {headers: headers});
      return headers;
    }
    this.log.debug('Sending auth token', {token: token});
    headers = headers.append('Authorization', 'Bearer ' + token);
    this.log.debug('headers', {headers: headers});
    return headers;
  }

  private getPageableParams(urlSearchParams: HttpParams, pageableParams?: PageableParams) {
    if (typeof pageableParams !== 'undefined') {
      if (pageableParams.sort) {
        urlSearchParams = urlSearchParams.append('sort', `${pageableParams.sort.order},${pageableParams.sort.direction}`);
      }

      const pageableParamsSource: any = pageableParams;
      ['page', 'size'].forEach(key => {

        if (pageableParamsSource.hasOwnProperty(key)) {
          urlSearchParams = urlSearchParams.append(key, `${pageableParamsSource[key]}`);
        }
      });
    }

    return urlSearchParams;
  }

  private getFilterParams(urlSearchParams: HttpParams, filterParams?: any) {
    if (typeof filterParams !== 'undefined') {
      Object.keys(filterParams).map(key => {
        const value = filterParams[key];
        if (null != value && '' !== value) {
          urlSearchParams = urlSearchParams.append(key, `${value}`);
        }
      });
    }

    return urlSearchParams;
  }

  private notAuthorizedError(initialError: any): boolean {
    return initialError && initialError.status === 401;
  }

  // private refreshTokenAndRetryRequest(url: string, method: string, data?: any, pageableParams?: PageableParams, filterParams?: any): Observable<HttpResponse<any>> {
  //   return this.authService.refreshToken().flatMap(
  //     (tokenInfo: TokenInfo) => {
  //       this.authService.saveTokensInStorage(tokenInfo);
  //       return this.callAPI(url, method, true, data, pageableParams, filterParams);
  //     });
  // }

  private subscribeResponse(response: Observable<HttpResponse<any>>, url: string, method: string) {
    response.pipe(
      finalize(() => this.onRequestEnd())
    )
      .subscribe((result: any) => {
          this.log.debug(`Got response from api [${method}]`, {url: url});
        }, (err: any) => {
          this.log.error(`Got error from api [${method}]`, {error: err});
        }
      );
  }

  private onRequestStart() {
    // TODO loader
  }

  private onRequestEnd() {
    // TODO loader
  }

}
