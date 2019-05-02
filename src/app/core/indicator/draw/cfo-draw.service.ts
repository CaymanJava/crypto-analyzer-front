import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CfoDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawCFO(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    chart.plot(plotNumber).removeAllSeries();
    return this.drawCFO(settings, result, chart, plotNumber);
  }

  private drawCFO(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareCfoData(result);
    const indicatorPlot = this.configurePlot(chart, plotNumber);
    const indicator = this.configureData(indicatorData);
    this.prepareLines(indicatorPlot, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareLines(indicatorPlot, indicator) {
    this.configureIndicatorLine(indicatorPlot, indicator);
    this.configureSignalLine(indicatorPlot, indicator);
  }

  private configureIndicatorLine(indicatorPlot, indicator) {
    const cfeLine = indicatorPlot.line(indicator.mapAs({'value': 1}));
    cfeLine.stroke('blue');
    cfeLine.name('CFE');
  }

  private configureSignalLine(indicatorPlot, indicator) {
    const signalLine = indicatorPlot.line(indicator.mapAs({'value': 2}));
    signalLine.stroke('red');
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
    super.addHorizontalLine(indicatorPlot, 0);
    return indicatorPlot;
  }

  private prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '('
      + settings.configuration.period + ','
      + settings.configuration.movingAveragePeriod + ')';
  }

  private prepareCfoData(result: any[]) {
    return super.prepareDataForIndicatorWithSignalLine(result);
  }

}
