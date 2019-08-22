import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-marker-size-slider',
  templateUrl: './marker-size-slider.component.html',
  styleUrls: ['./marker-size-slider.component.scss']
})
export class MarkerSizeSliderComponent implements OnInit {

  @Input() label: string = 'Marker size';
  @Input() max: number = 35;
  @Input() min: number = 1;
  @Input() value: number = 10;
  @Input() tickInterval: number = 1;
  @Input() step: number = 1;
  @Output() onValueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  valueChange(color: number) {
    this.onValueChange.emit(color);
  }

}
