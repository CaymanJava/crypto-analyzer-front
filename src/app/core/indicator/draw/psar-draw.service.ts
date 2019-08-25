import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { SimpleDrawService } from "./simple-draw.service";

@Injectable({
  providedIn: "root"
})
export class PsarDrawService extends SimpleDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any,
       currentPlotNumber: number, [], pixels?: number, requestedPlotNumber?: number): IndicatorDrawResult {
    return super.draw(settings, result, chart, 0, [], pixels, requestedPlotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any,
         currentPlotNumber: number, [], pixels: number = 150, requestedPlotNumber?: number): IndicatorDrawResult {
    return super.draw(settings, result, chart, 0, [], pixels, requestedPlotNumber);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.minAccelerationFactor + ',' +
      settings.configuration.maxAccelerationFactor + ')';
  }

  configurePlot(chart: any, plotNumber: number, indicatorMapping, horizontalLines: number[], requestedPlotNumber?: number) {
    const indicatorPlot = chart.plot(requestedPlotNumber === null ? plotNumber: requestedPlotNumber);
    super.configureDateTimeFormat(indicatorPlot);
    return indicatorPlot.marker(indicatorMapping);
  }

  configureIndicator(settings, series) {
    series.name(settings.indicatorItem.title);
    series.normal().fill(settings.drawConfiguration.indicatorColor, 1);
    series.normal().stroke(settings.drawConfiguration.indicatorColor, 1);
    series.normal().size(settings.drawConfiguration.markerSize);
    series.normal().type(settings.drawConfiguration.marker);
  }

}
