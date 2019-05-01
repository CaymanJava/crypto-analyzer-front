import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";
import { CommonDrawService } from "./common-draw.service";

@Injectable({
  providedIn: "root"
})
export class AdxDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawADX(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    chart.plot(plotNumber).removeAllSeries();
    return this.drawADX(settings, result, chart, plotNumber);
  }

  private drawADX(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareAdxData(result);
    const indicatorPlot = this.configurePlot(chart, plotNumber);
    const indicator = this.configureData(indicatorData);
    this.prepareLines(indicatorPlot, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareLines(indicatorPlot, indicator) {
    this.configurePositiveDiLine(indicatorPlot, indicator);
    this.configureNegativeDiLine(indicatorPlot, indicator);
    this.configureIndicatorLine(indicatorPlot, indicator);
  }

  private configurePositiveDiLine(indicatorPlot, indicator) {
    const positiveDiLine = indicatorPlot.line(indicator.mapAs({'value': 1}));
    positiveDiLine.stroke('green');
    positiveDiLine.name('+DI');
  }

  private configureNegativeDiLine(indicatorPlot, indicator) {
    const negativeDiLine = indicatorPlot.line(indicator.mapAs({'value': 2}));
    negativeDiLine.stroke('red');
    negativeDiLine.name('-DI');
  }

  private configureIndicatorLine(indicatorPlot, indicator) {
    const indicatorLine = indicatorPlot.line(indicator.mapAs({'value': 3}));
    indicatorLine.stroke('blue');
    indicatorLine.name('ADX');
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

  private prepareAdxData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        super.convertValue(indicatorResult.positiveDirectionalIndicator),
        super.convertValue(indicatorResult.negativeDirectionalIndicator),
        super.convertValue(indicatorResult.averageDirectionalIndex)
      ]
    ));
    return indicatorData;
  }

}
