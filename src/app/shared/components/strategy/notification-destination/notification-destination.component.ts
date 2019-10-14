import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-notification-destination',
  templateUrl: './notification-destination.component.html'
})
export class NotificationDestinationComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label = 'Notification';
  @Input() disabled = false;

  constructor() {
  }

  ngOnInit() {
  }

  onChange(type) {
    this.form.get(this.key).setValue(type);
  }

}
