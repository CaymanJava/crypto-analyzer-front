import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-marker-picker',
  templateUrl: './marker-picker.component.html'
})
export class MarkerPickerComponent implements OnInit {

  @Input() marker;
  @Output() onMarkerChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  markerChange() {
    this.onMarkerChange.emit(this.marker);
  }

}
