import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

export abstract class SignalLineDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number, horizontalLines?: number[]): IndicatorDrawResult {
    return this.drawIndicatorWithSignalLine(settings, result, chart, plotNumber, horizontalLines);
  }

  private drawIndicatorWithSignalLine(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number, horizontalLines?: number[]): IndicatorDrawResult {
    const indicatorData = this.prepareDataForIndicatorWithSignalLine(result);
    const indicatorPlot = this.configurePlot(chart, plotNumber, horizontalLines);
    const indicator = this.configureData(indicatorData);
    this.prepareLines(settings, indicatorPlot, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareDataForIndicatorWithSignalLine(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => {
      indicatorData.push(this.extractIndicatorWithSignalLine(indicatorResult))
    });
    return indicatorData;
  }

  private extractIndicatorWithSignalLine(indicatorResult) {
    return [
      indicatorResult.time,
      this.convertValue(indicatorResult.indicatorValue),
      this.convertValue(indicatorResult.signalLineValue)
    ];
  }

  private prepareLines(settings, indicatorPlot, indicator) {
    this.configureIndicatorLine(settings, indicatorPlot, indicator);
    this.configureSignalLine(settings.drawConfiguration.signalLineColor, indicatorPlot, indicator);
  }

  private configureIndicatorLine(settings, indicatorPlot, indicator) {
    const indicatorLine = indicatorPlot.line(indicator.mapAs({'value': 1}));
    indicatorLine.stroke(settings.drawConfiguration.indicatorLineColor);
    indicatorLine.name(settings.indicatorItem.title);
  }

  private configureSignalLine(color, indicatorPlot, indicator) {
    const signalLine = indicatorPlot.line(indicator.mapAs({'value': 2}));
    signalLine.stroke(color);
    signalLine.name('Signal');
  }

  private configureData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator;
  }

  private configurePlot(chart: any, plotNumber: number, horizontalLines?: number[]) {
    const indicatorPlot = chart.plot(plotNumber);
    indicatorPlot.height('150px');
    indicatorPlot.xGrid().enabled(true);
    indicatorPlot.yGrid().enabled(true);
    indicatorPlot.yGrid().stroke("#dee2e6");
    super.configureDateTimeFormat(indicatorPlot);
    super.addHorizontalLines(horizontalLines, indicatorPlot);
    return indicatorPlot;
  }

}
