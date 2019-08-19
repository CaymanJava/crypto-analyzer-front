import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls:['slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() max: number = 35;
  @Input() min: number = 5;
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
