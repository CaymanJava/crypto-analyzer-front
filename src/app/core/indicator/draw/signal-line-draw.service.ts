import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

export abstract class SignalLineDrawService extends CommonDrawService {

  abstract getName(): string;

  draw(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    return this.drawIndicatorWithSignalLine(settings, result, chart, plotNumber);
  }

  private drawIndicatorWithSignalLine(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareDataForIndicatorWithSignalLine(result);
    const indicatorPlot = this.configurePlot(chart, plotNumber);
    const indicator = this.configureData(indicatorData);
    this.prepareLines(settings.drawConfiguration, indicatorPlot, indicator);
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

  private prepareLines(drawConfiguration, indicatorPlot, indicator) {
    this.configureIndicatorLine(drawConfiguration.indicatorLineColor, indicatorPlot, indicator);
    this.configureSignalLine(drawConfiguration.signalLineColor, indicatorPlot, indicator);
  }

  private configureIndicatorLine(color, indicatorPlot, indicator) {
    const indicatorLine = indicatorPlot.line(indicator.mapAs({'value': 1}));
    indicatorLine.stroke(color);
    indicatorLine.name(this.getName());
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

  private configurePlot(chart: any, plotNumber: number) {
    const indicatorPlot = chart.plot(plotNumber);
    indicatorPlot.height('150px');
    super.configureDateTimeFormat(indicatorPlot);
    return indicatorPlot;
  }

}
