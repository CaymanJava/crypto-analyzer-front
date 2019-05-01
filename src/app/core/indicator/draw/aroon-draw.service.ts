import { Injectable } from "@angular/core";
import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

@Injectable({
  providedIn: "root"
})
export class AroonDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawAroon(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    chart.plot(plotNumber).removeAllSeries();
    return this.drawAroon(settings, result, chart, plotNumber);
  }

  private drawAroon(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareAroonData(result);
    const indicatorPlot = this.configurePlot(chart, plotNumber);
    const indicator = this.configureData(indicatorData);
    this.prepareLines(indicatorPlot, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareLines(indicatorPlot, indicator) {
    this.configureAroonUpLine(indicatorPlot, indicator);
    this.configureAroonDownLine(indicatorPlot, indicator);
  }

  private configureAroonUpLine(indicatorPlot, indicator) {
    const positiveDiLine = indicatorPlot.line(indicator.mapAs({'value': 1}));
    positiveDiLine.stroke('green');
    positiveDiLine.name('Aroon UP');
  }

  private configureAroonDownLine(indicatorPlot, indicator) {
    const negativeDiLine = indicatorPlot.line(indicator.mapAs({'value': 2}));
    negativeDiLine.stroke('red');
    negativeDiLine.name('Aroon DOWN');
  }

  private configureData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator;
  }

  private configurePlot(chart: any, plotNumber: number) {
    const indicatorPlot = chart.plot(plotNumber);
    indicatorPlot.height('150px');
    super.configureDateTimeFormat(indicatorPlot);
    return indicatorPlot;
  }

  private prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' + settings.configuration.period + ')';
  }

  private prepareAroonData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        super.convertValue(indicatorResult.aroonUp),
        super.convertValue(indicatorResult.aroonDown)
      ]
    ));
    return indicatorData;
  }

}
