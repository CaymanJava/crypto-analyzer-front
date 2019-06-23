import { Injectable } from "@angular/core";
import { SimpleDrawService } from "./simple-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";

@Injectable({
  providedIn: "root"
})
export class CrsiDrawService extends SimpleDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return super.draw(settings, result, chart, plotNumber, [settings.drawConfiguration.overbought, settings.drawConfiguration.oversold]);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    super.clearPlot(chart, plotNumber);
    return super.draw(settings, result, chart, plotNumber, [settings.drawConfiguration.overbought, settings.drawConfiguration.oversold]);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.simpleRsiPeriod + ',' +
      settings.configuration.streakRsiPeriod + ',' +
      settings.configuration.percentRankPeriod + ')';
  }

}
