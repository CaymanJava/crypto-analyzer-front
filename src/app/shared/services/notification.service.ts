import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class NotificationService {

  constructor(private toastr: ToastrService) {
  }

  success(message: string) {
    this.toastr.success(message, 'Success!', {timeOut: 2000, closeButton: true, progressBar: true});
  }

  warning(message: string) {
    this.toastr.warning(message, 'Warning!', {timeOut: 2000, closeButton: true, progressBar: true});
  }

  info(message: string) {
    this.toastr.info(message, 'Info', {timeOut: 2000, closeButton: true, progressBar: true});
  }

  error(message: string) {
    this.toastr.error(message, 'Error', {timeOut: 2000, closeButton: true, progressBar: true});
  }

}
