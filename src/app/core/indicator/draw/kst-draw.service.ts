import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { SignalLineDrawService } from "./signal-line-draw.service";

@Injectable({
  providedIn: "root"
})
export class KstDrawService extends SignalLineDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return super.draw(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    chart.plot(plotNumber).removeAllSeries();
    return super.draw(settings, result, chart, plotNumber);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.lightestROCPeriod + ',' +
      settings.configuration.lightestSMAPeriod + ',' +
      settings.configuration.lightROCPeriod + ',' +
      settings.configuration.lightSMAPeriod + ',' +
      settings.configuration.heavyROCPeriod + ',' +
      settings.configuration.heavySMAPeriod + ',' +
      settings.configuration.heaviestROCPeriod + ',' +
      settings.configuration.heaviestSMAPeriod + ',' +
      settings.configuration.signalLinePeriod + ')';
  }

}
