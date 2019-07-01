import { SimpleDrawService } from "./simple-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RvDrawService extends SimpleDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return super.draw(settings, result, chart, plotNumber, [settings.drawConfiguration.bullishSignalLine, settings.drawConfiguration.bearerSignalLine]);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    super.clearPlot(chart, plotNumber);
    return super.draw(settings, result, chart, plotNumber, [settings.drawConfiguration.bullishSignalLine, settings.drawConfiguration.bearerSignalLine]);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.period + ',' +
      settings.configuration.stDevPeriod + ')';
  }

}
