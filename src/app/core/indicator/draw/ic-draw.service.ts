import { Injectable } from "@angular/core";
import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

@Injectable({
  providedIn: "root"
})
export class IcDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawIC(result, settings, chart);
  }

  update(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawIC(result, settings, chart);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.conversionLinePeriod + ',' +
      settings.configuration.baseLinePeriod + ',' +
      settings.configuration.leadingSpanPeriod + ',' +
      settings.configuration.displaced + ')';
  }

  private drawIC(result: any[], settings: IndicatorSettings, chart: any) {
    const indicatorData = this.prepareIchimokuData(result);
    const indicator = this.prepareTable(indicatorData);
    this.preparePlot(settings, chart, indicator, indicatorData);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, 0);
  }

  private prepareTable(result: any[]) {
    const table = AnyChart.data.table();
    table.addData(result);
    return table;
  }

  private prepareIchimokuData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        indicatorResult.conversionLineValue,
        indicatorResult.baseLineValue,
        indicatorResult.leadingSpanAValue,
        indicatorResult.leadingSpanBValue,
        indicatorResult.laggingSpanValue,
      ]
    ));
    return indicatorData;
  }

  private preparePlot(settings: any, chart: any, indicator, indicatorData) {
    const indicatorPlot = chart.plot(0);
    this.configureArea(settings, indicatorPlot, indicator, indicatorData);
    this.configureConversionLine(settings.drawConfiguration, indicatorPlot, indicator);
    this.configureBaseLine(settings.drawConfiguration, indicatorPlot, indicator);
    this.configureSpanLine(settings.drawConfiguration, indicatorPlot, indicator);
  }

  private configureArea(settings, indicatorPlot, indicator, indicatorData) {
    const series = indicatorPlot.rangeArea(indicator.mapAs({low: 3, high: 4}));
    series.name(settings.indicatorItem.title);
    series.normal().fill(this.defineColor(settings.drawConfiguration, indicatorData));
    series.normal().lowStroke(settings.drawConfiguration.leadingSpanAColor, 1.2, '10 5', 'round');
    series.normal().highStroke(settings.drawConfiguration.leadingSpanBColor, 1.2, '10 5', 'round');
  }

  private defineColor(drawConfiguration, indicatorData) {
    return function (): string {
      if (this.index != null && this.index > 0) {
        if (indicatorData[this.index][3] != null && indicatorData[this.index][4] != null) {
          if (indicatorData[this.index][3] > indicatorData[this.index][4]) {
            return drawConfiguration.leadingSpanAColor + ' 0.3';
          } else {
            return drawConfiguration.leadingSpanBColor + ' 0.3';
          }
        }
        return drawConfiguration.leadingSpanAColor + ' 0.3';
      }
    };
  }

  private configureConversionLine(drawConfiguration, indicatorPlot, indicator) {
    const middleBand = indicatorPlot.line(indicator.mapAs({'value': 1}));
    middleBand.stroke(drawConfiguration.conversionLineColor);
    middleBand.name('Tenkan-sen');
  }

  private configureBaseLine(drawConfiguration, indicatorPlot, indicator) {
    const middleBand = indicatorPlot.line(indicator.mapAs({'value': 2}));
    middleBand.stroke(drawConfiguration.baseLineColor);
    middleBand.name('Kijun-sen');
  }

  private configureSpanLine(drawConfiguration, indicatorPlot, indicator) {
    const middleBand = indicatorPlot.line(indicator.mapAs({'value': 5}));
    middleBand.stroke(drawConfiguration.laggingSpanColor);
    middleBand.name('Chinkou Span');
  }

}
