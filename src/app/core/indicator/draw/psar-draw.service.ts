import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { SimpleDrawService } from "./simple-draw.service";

@Injectable({
  providedIn: "root"
})
export class PsarDrawService extends SimpleDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return super.draw(settings, result, chart, 0);
  }

  update(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return super.draw(settings, result, chart, 0);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.minAccelerationFactor + ',' +
      settings.configuration.maxAccelerationFactor + ')';
  }

  configurePlot(chart: any, plotNumber: number, indicatorMapping, horizontalLines: number[]) {
    const indicatorPlot = chart.plot(plotNumber);
    super.configureDateTimeFormat(indicatorPlot);
    super.addHorizontalLines(horizontalLines, indicatorPlot);
    return indicatorPlot.marker(indicatorMapping);
  }

  configureIndicator(settings, series) {
    series.name(settings.indicatorItem.title);
    series.normal().fill(settings.drawConfiguration.indicatorColor, 1);
    series.normal().stroke(settings.drawConfiguration.indicatorColor, 1);
    series.normal().size(5);
  }

}
