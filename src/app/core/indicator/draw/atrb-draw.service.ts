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
    this.preparePlot(chart, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, 0);
  }

  private preparePlot(chart: any, indicator) {
    const indicatorPlot = chart.plot(0);
    this.configureArea(indicatorPlot, indicator);
    this.configureMiddleBand(indicatorPlot, indicator);
  }

  private configureArea(indicatorPlot, indicator) {
    const series = indicatorPlot.rangeArea(indicator.mapAs({low: 3, high: 1}));
    series.name("ATRB");
    series.normal().fill('#7276cc', 0.3);
    series.normal().lowStroke('#0a2ecc', 1.2, '10 5', 'round');
    series.normal().highStroke('#0a2ecc', 1.2, '10 5', 'round');
  }

  private prepareData(result: any[]) {
    const indicatorData = super.prepareBandData(result);
    const table = AnyChart.data.table();
    table.addData(indicatorData);
    return table;
  }

  private configureMiddleBand(indicatorPlot, indicator) {
    const middleBand = indicatorPlot.line(indicator.mapAs({'value': 2}));
    middleBand.stroke('red');
    middleBand.name('Middle band');
  }

  private prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.period + ', ' +
      settings.configuration.shift + ', ' +
      settings.configuration.priceType + ')';
  }

}
