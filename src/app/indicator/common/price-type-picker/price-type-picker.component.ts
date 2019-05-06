import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-price-type-picker',
  templateUrl: './price-type-picker.component.html'
})
export class PriceTypePickerComponent implements OnInit {

  @Input() configForm: FormGroup;
  @Input() key: string;

  constructor() { }

  ngOnInit() {
  }

}
