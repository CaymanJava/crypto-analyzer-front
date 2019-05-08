import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CmoDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawCMO(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    chart.plot(plotNumber).removeAllSeries();
    return this.drawCMO(settings, result, chart, plotNumber);
  }

  private drawCMO(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareCMOData(result);
    const indicatorPlot = this.configurePlot(chart, plotNumber);
    const indicator = this.configureData(indicatorData);
    this.prepareLines(settings.drawConfiguration, indicatorPlot, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareLines(drawConfiguration, indicatorPlot, indicator) {
    this.configureIndicatorLine(drawConfiguration.indicatorLineColor, indicatorPlot, indicator);
    this.configureSignalLine(drawConfiguration.signalLineColor, indicatorPlot, indicator);
  }

  private configureIndicatorLine(color, indicatorPlot, indicator) {
    const indicatorLine = indicatorPlot.line(indicator.mapAs({'value': 1}));
    indicatorLine.stroke(color);
    indicatorLine.name('CMO');
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

  private prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '('
      + settings.configuration.period + ','
      + settings.configuration.signalLinePeriod + ')';
  }

  private prepareCMOData(result: any[]) {
    return super.prepareDataForIndicatorWithSignalLine(result);
  }

}
