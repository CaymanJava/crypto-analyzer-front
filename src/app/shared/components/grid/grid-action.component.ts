import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-grid-action',
  template: ' '
})
export class GridActionComponent implements OnInit {

  @Input() key: string;
  @Input() title: string;
  @Input('disabled') disabled: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  isDisabled(row: any) {
    if (this.disabled) {
      return this.disabled(row);
    }
    return false;
  }

}
