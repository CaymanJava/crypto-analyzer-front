import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { SimpleDrawService } from "./simple-draw.service";

@Injectable({
  providedIn: "root"
})
export class CoDrawService extends SimpleDrawService {

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
      + settings.configuration.slowPeriod + ','
      + settings.configuration.fastPeriod + ')';
  }

}
