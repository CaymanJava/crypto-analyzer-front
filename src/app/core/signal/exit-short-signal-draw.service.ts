import { Signal } from "./signal.model";
import { Injectable } from "@angular/core";
import { CommonSignalDrawService } from "./common-signal-draw.service";

@Injectable({
  providedIn: "root"
})
export class ExitShortSignalDrawService extends CommonSignalDrawService {

  draw(signals: Signal[], drawConfiguration: any, chart: any) {
    const series = super.draw(signals, drawConfiguration, chart);
    this.configurePlot(drawConfiguration.buyMarker, drawConfiguration.signalMarkerSize, drawConfiguration.exitShortColor, series);
  }

  extractSignalValue(indicatorResult) {
    return super.getBuySignalValue(indicatorResult);
  }

  getTitle(){
    return 'Exit Short signals';
  }

  getPosition() {
    return 'EXIT_SHORT';
  }

}
