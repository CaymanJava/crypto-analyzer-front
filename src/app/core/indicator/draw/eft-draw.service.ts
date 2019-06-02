import { SignalLineDrawService } from "./signal-line-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EftDrawService extends SignalLineDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return super.draw(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    chart.plot(plotNumber).removeAllSeries();
    return super.draw(settings, result, chart, plotNumber);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '('
      + settings.configuration.period + ')';
  }

  getName() {
    return 'EFT';
  }

}
