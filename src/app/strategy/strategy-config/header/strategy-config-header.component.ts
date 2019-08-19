import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-strategy-config-header',
  templateUrl: './strategy-config-header.component.html',
  styleUrls: ['./strategy-config-header.component.scss']
})
export class StrategyConfigHeaderComponent implements OnInit {

  @Input('dateTimeRange') dateTimeRange: Date[];
  @Input('timeFrame') timeFrame;

  @Output() onDateTimeRangeChange: EventEmitter<Date[]> = new EventEmitter();
  @Output() onTimeFrameChange: EventEmitter<string> = new EventEmitter();
  @Output() onSaveClick: EventEmitter<string> = new EventEmitter();
  @Output() onClearDrawing: EventEmitter<void> = new EventEmitter();
  @Output() onStartDrawing: EventEmitter<any> = new EventEmitter();
  @Output() onMarkerDraw: EventEmitter<any> = new EventEmitter();
  @Output() onSelectedRemove: EventEmitter<void> = new EventEmitter();
  @Output() onConfigClick: EventEmitter<void> = new EventEmitter();
  @Output() onSignalsClick: EventEmitter<void> = new EventEmitter();

  hideDrawingTools = true;

  constructor() {
  }

  ngOnInit() {
  }

  dataRangeChange(event: any) {
    this.dateTimeRange = event;
    this.onDateTimeRangeChange.emit(this.dateTimeRange);
  }

  timeFrameChange(event: any) {
    this.timeFrame = event;
    this.onTimeFrameChange.emit(this.timeFrame);
  }

  drawClick() {
    this.hideDrawingTools = !this.hideDrawingTools;
  }

  save(type: string) {
    this.onSaveClick.emit(type);
  }

  clearDrawing() {
    this.onClearDrawing.emit();
  }

  startDrawing(event) {
    this.onStartDrawing.emit(event);
  }

  drawMarker(event) {
    this.onMarkerDraw.emit(event);
  }

  removeSelected() {
    this.onSelectedRemove.emit();
  }

  configClick() {
    this.onConfigClick.emit();
  }

  signalsClick() {
    this.onSignalsClick.emit();
  }

}
