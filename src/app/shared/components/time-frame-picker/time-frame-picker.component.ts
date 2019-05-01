import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-frame-picker',
  templateUrl: './time-frame-picker.component.html',
  styleUrls: ['./time-frame-picker.component.scss']
})
export class TimeFramePickerComponent implements OnInit {

  @Input() timeFrame: string;
  @Output() onTimeFrameSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onTimeFrameChange() {
    this.onTimeFrameSelected.emit(this.timeFrame);
  }

}
