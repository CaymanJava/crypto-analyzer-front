import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-indicator-input',
  templateUrl: './indicator-input.component.html'
})
export class IndicatorInputComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() key: string;
  @Input() placeholder: string;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
