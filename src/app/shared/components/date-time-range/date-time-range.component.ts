import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-time-range',
  templateUrl: './date-time-range.component.html'
})
export class DateTimeRangeComponent implements OnInit {

  @Input() dateTimeRange: Date[];
  @Output() dateRangeChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onDataRangeChange() {
    this.dateRangeChange.emit(this.dateTimeRange);
  }

}
