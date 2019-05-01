import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-column',
  template: ' '
})
export class GridColumnComponent implements OnInit {
  @Input() key: string;
  @Input() title: string;
  @Input() dataType = 'string';
  @Input() keyDataType = 'string';
  @Input() sorted: boolean;
  @Input() arrow = false;
  @Input() image = false;
  @Input('value-fn') valueFn: any;
  @Input() clickAction = false;
  @Input() tooltipKey = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
