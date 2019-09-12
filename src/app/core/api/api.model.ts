import { HttpErrorResponse } from "@angular/common/http";

export interface QuerySort {
  order?: string;
  direction?: string;
}

export interface PageableParams {
  page?: number;
  sort?: QuerySort;
  size?: number;
}

export interface PageSlice {
  content: any[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  numberOfElements: number;
  sort: any;
  size: number;
  number: number;
}

export class ApiError {
  status: number;
  violations: Violation[];
  params: any;

  constructor(httpErrorResponse: HttpErrorResponse) {
    this.status = httpErrorResponse.status;
    if (httpErrorResponse.status === 422) {
      if (httpErrorResponse.error) {
        this.violations = httpErrorResponse.error.violations;
        this.params = httpErrorResponse.error.params;
      }
    }
  }

}

export interface Violation {
  field: string;
  message: string;
}
