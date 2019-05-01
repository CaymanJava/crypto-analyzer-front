import { Injectable } from "@angular/core";
import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

@Injectable({
  providedIn: "root"
})
export class CeDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawCE(settings, result, chart);
  }

  update(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawCE(settings, result, chart);
  }

  private drawCE(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    const indicator = this.prepareData(result);
    this.preparePlot(chart, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, 0);
  }

  private preparePlot(chart: any, indicator) {
    const indicatorPlot = chart.plot(0);
    this.configureLongChandelierExit(indicatorPlot, indicator);
    this.configureShortChandelierExit(indicatorPlot, indicator);
  }

  private prepareData(result: any[]) {
    const indicatorData = this.prepareCEData(result);
    const table = AnyChart.data.table();
    table.addData(indicatorData);
    return table;
  }

  private prepareCEData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        indicatorResult.longChandelierExit,
        indicatorResult.shortChandelierExit
      ]
    ));
    return indicatorData;
  }

  private configureLongChandelierExit(indicatorPlot, indicator) {
    const middleBand = indicatorPlot.line(indicator.mapAs({'value': 1}));
    middleBand.stroke('green');
    middleBand.name('Long exit');
  }

  private configureShortChandelierExit(indicatorPlot, indicator) {
    const middleBand = indicatorPlot.line(indicator.mapAs({'value': 2}));
    middleBand.stroke('red');
    middleBand.name('Short exit');
  }

  private prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.period + ', ' +
      settings.configuration.longFactor + ', ' +
      settings.configuration.shortFactor + ')';
  }

}
