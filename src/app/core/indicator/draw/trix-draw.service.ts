import { Injectable } from "@angular/core";
import { SignalLineDrawService } from "./signal-line-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";

@Injectable({
  providedIn: "root"
})
export class TrixDrawService extends SignalLineDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return super.draw(settings, result, chart, plotNumber, [0]);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    super.clearPlot(chart, plotNumber);
    return super.draw(settings, result, chart, plotNumber, [0]);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '('
      + settings.configuration.period + ')';
  }

}
