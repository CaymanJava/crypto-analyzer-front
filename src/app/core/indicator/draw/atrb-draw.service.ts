import { Injectable } from "@angular/core";
import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

@Injectable({
  providedIn: "root"
})
export class AtrbDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawAtrb(settings, result, chart);
  }

  update(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawAtrb(settings, result, chart);
  }

  private drawAtrb(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    const indicator = this.prepareData(result);
    this.preparePlot(settings.drawConfiguration, chart, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, 0);
  }

  private preparePlot(drawConfiguration: any, chart: any, indicator) {
    const indicatorPlot = chart.plot(0);
    this.configureArea(drawConfiguration, indicatorPlot, indicator);
    this.configureMiddleBand(drawConfiguration.atrBandsMiddleColor, indicatorPlot, indicator);
  }

  private configureArea(drawConfiguration, indicatorPlot, indicator) {
    const series = indicatorPlot.rangeArea(indicator.mapAs({low: 3, high: 1}));
    series.name("ATRB");
    series.normal().fill(drawConfiguration.atrBandsChannelColor, 0.3);
    series.normal().lowStroke(drawConfiguration.atrBandsBottomColor, 1.2, '10 5', 'round');
    series.normal().highStroke(drawConfiguration.atrBandsTopColor, 1.2, '10 5', 'round');
  }

  private prepareData(result: any[]) {
    const indicatorData = super.prepareBandData(result);
    const table = AnyChart.data.table();
    table.addData(indicatorData);
    return table;
  }

  private configureMiddleBand(color: string, indicatorPlot, indicator) {
    const middleBand = indicatorPlot.line(indicator.mapAs({'value': 2}));
    middleBand.stroke(color);
    middleBand.name('Middle');
  }

  private prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.period + ', ' +
      settings.configuration.shift + ', ' +
      settings.configuration.priceType + ')';
  }

}
