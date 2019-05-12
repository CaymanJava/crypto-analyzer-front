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

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' + settings.configuration.period + ')';
  }

  private drawADX(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareAdxData(result);
    const indicatorPlot = this.configurePlot(chart, plotNumber);
    const indicator = this.configureData(indicatorData);
    this.prepareLines(settings.drawConfiguration, indicatorPlot, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareLines(drawConfiguration, indicatorPlot, indicator) {
    this.configurePositiveDiLine(drawConfiguration, indicatorPlot, indicator);
    this.configureNegativeDiLine(drawConfiguration, indicatorPlot, indicator);
    this.configureIndicatorLine(drawConfiguration, indicatorPlot, indicator);
  }

  private configurePositiveDiLine(drawConfiguration, indicatorPlot, indicator) {
    const positiveDiLine = indicatorPlot.line(indicator.mapAs({'value': 1}));
    positiveDiLine.stroke(drawConfiguration.positiveDiLineColor);
    positiveDiLine.name('+DI');
  }

  private configureNegativeDiLine(drawConfiguration, indicatorPlot, indicator) {
    const negativeDiLine = indicatorPlot.line(indicator.mapAs({'value': 2}));
    negativeDiLine.stroke(drawConfiguration.negativeDiLineColor);
    negativeDiLine.name('-DI');
  }

  private configureIndicatorLine(drawConfiguration, indicatorPlot, indicator) {
    const indicatorLine = indicatorPlot.line(indicator.mapAs({'value': 3}));
    indicatorLine.stroke(drawConfiguration.indicatorLineColor);
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
