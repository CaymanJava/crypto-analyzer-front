import { Injectable } from "@angular/core";
import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

@Injectable({
  providedIn: "root"
})
export class EriDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawERI(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    super.clearPlot(chart, plotNumber);
    return this.drawERI(settings, result, chart, plotNumber);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.period + ',' +
      settings.configuration.signalLinePeriod + ',' +
      settings.configuration.smoothLinePeriod + ')';
  }

  private drawERI(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareERIData(result);
    const indicatorPlot = this.configurePlot(chart, plotNumber);
    const indicator = this.configureData(indicatorData);
    this.prepareLines(settings.drawConfiguration, indicatorPlot, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareLines(drawConfiguration, indicatorPlot, indicator) {
    this.configureIndicatorLine(drawConfiguration, indicatorPlot, indicator);
    this.configureSignalLine(drawConfiguration, indicatorPlot, indicator);
    this.configureSmoothedLine(drawConfiguration, indicatorPlot, indicator);
  }

  private configureIndicatorLine(drawConfiguration, indicatorPlot, indicator) {
    const indicatorLine = indicatorPlot.line(indicator.mapAs({'value': 1}));
    indicatorLine.stroke(drawConfiguration.indicatorLineColor);
    indicatorLine.name('ERI');
  }

  private configureSignalLine(drawConfiguration, indicatorPlot, indicator) {
    const positiveDiLine = indicatorPlot.line(indicator.mapAs({'value': 2}));
    positiveDiLine.stroke(drawConfiguration.signalLineColor);
    positiveDiLine.name('Signal');
  }

  private configureSmoothedLine(drawConfiguration, indicatorPlot, indicator) {
    const negativeDiLine = indicatorPlot.line(indicator.mapAs({'value': 3}));
    negativeDiLine.stroke(drawConfiguration.smoothLineColor);
    negativeDiLine.name('Smoothed');
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

  private prepareERIData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        super.convertValue(indicatorResult.indicatorValue),
        super.convertValue(indicatorResult.signalLineValue),
        super.convertValue(indicatorResult.smoothedLineValue)
      ]
    ));
    return indicatorData;
  }

}
