import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PageSlice } from "../../../../core/api/api.model";
import { Signal } from "../../../../core/signal/signal.model";

@Component({
  moduleId: module.id,
  template: ''
})
export class BaseStrategySignalComponent {

  @Input() data: PageSlice;
  @Input() name: string;
  modal: NgbActiveModal;

  constructor(modal: NgbActiveModal) {
    this.modal = modal;
  }

  getPositions(signal: Signal) {
    return Array.from(signal.positions).map(position => getSinglePosition(position)).join(', ');

    function getSinglePosition(position) {
      switch (position) {
        case 'ENTRY_LONG':
          return 'Entry Long';
        case 'EXIT_LONG':
          return 'Exit Long';
        case 'ENTRY_SHORT':
          return 'Entry Short';
        case 'EXIT_SHORT':
          return 'Exit Short';
        default:
          return '';
      }
    }
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
