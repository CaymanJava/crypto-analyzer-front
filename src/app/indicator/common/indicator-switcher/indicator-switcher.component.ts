import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-indicator-switcher',
  templateUrl: './indicator-switcher.component.html'
})
export class IndicatorSwitcherComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label: string;

  constructor() {
  }

  ngOnInit() {
  }

}
