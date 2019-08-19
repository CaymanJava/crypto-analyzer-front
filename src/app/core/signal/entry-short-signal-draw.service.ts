import { Signal } from "./signal.model";
import { Injectable } from "@angular/core";
import { CommonSignalDrawService } from "./common-signal-draw.service";

@Injectable({
  providedIn: "root"
})
export class EntryShortSignalDrawService extends CommonSignalDrawService {

  draw(signals: Signal[], drawConfiguration: any, chart: any) {
    const series = super.draw(signals, drawConfiguration, chart);
    this.configurePlot(drawConfiguration.sellMarker, drawConfiguration.signalMarkerSize, drawConfiguration.entryShortColor, series);
  }

  extractSignalValue(indicatorResult) {
    return super.getSellSignalValue(indicatorResult);
  }

  getTitle(){
    return 'Entry Short signals';
  }

  getPosition() {
    return 'ENTRY_SHORT';
  }

}
