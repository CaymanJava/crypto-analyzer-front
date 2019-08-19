import { Component, Input } from "@angular/core";
import { Signal } from "../../core/signal/signal.model";
import { PageSlice } from "../../core/api/api.model";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  moduleId: module.id,
  template: ''
})
export class BaseStrategySignalComponent {

  @Input() data: PageSlice;
  @Input() name: string;
  modal: NgbActiveModal;

  constructor(modal: NgbActiveModal){
    this.modal = modal;
  }

  getPositions(signal: Signal) {
    return Array.from(signal.positions).join(', ');
  }

  getTime(signal: Signal) {
    return signal.tick.tickTime;
  }

  getOpen(signal: Signal) {
    return signal.tick.open;
  }

  getHigh(signal: Signal) {
    return signal.tick.high;
  }

  getLow(signal: Signal) {
    return signal.tick.low;
  }

  getClose(signal: Signal) {
    return signal.tick.close;
  }

  getVolume(signal: Signal) {
    return signal.tick.volume;
  }

  getBaseVolume(signal: Signal) {
    return signal.tick.baseVolume;
  }

}
