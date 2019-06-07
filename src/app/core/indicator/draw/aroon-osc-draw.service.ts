import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { SimpleDrawService } from "./simple-draw.service";

@Injectable({
  providedIn: "root"
})
export class AroonOscDrawService extends SimpleDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return super.draw(settings, result, chart, plotNumber, [0]);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    chart.plot(plotNumber).removeAllSeries();
    return super.draw(settings, result, chart, plotNumber, [0]);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' + settings.configuration.period + ')';
  }

  prepareSimpleIndicatorData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        super.convertValue(indicatorResult.aroonOscillator)
      ]
    ));
    return indicatorData;
  }

}
