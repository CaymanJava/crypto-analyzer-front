import { Injectable } from "@angular/core";
import { SimpleDrawService } from "./simple-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";

@Injectable({
  providedIn: "root"
})
export class HvDrawService extends SimpleDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return super.draw(settings, result, chart, plotNumber, []);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    chart.plot(plotNumber).removeAllSeries();
    return super.draw(settings, result, chart, plotNumber, []);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.period + ', ' +
      settings.configuration.daysPerYear + ', ' +
      settings.configuration.standardDeviations + ', ' +
      settings.configuration.priceType + ')';
  }

}
