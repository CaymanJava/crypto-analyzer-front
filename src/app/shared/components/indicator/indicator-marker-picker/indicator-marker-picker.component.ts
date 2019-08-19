import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-indicator-marker-picker',
  templateUrl: './indicator-marker-picker.component.html',
  styleUrls: ['./indicator-marker-picker.component.scss']
})
export class IndicatorMarkerPickerComponent implements OnInit {

  @Input() marker: string = 'star';
  @Input() label: string = 'Marker label';
  @Output() onMarkerChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  markerChange(marker: string) {
    this.onMarkerChange.emit(marker);
  }

}
