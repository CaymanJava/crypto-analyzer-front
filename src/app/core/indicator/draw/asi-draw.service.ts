import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";
import { CommonDrawService } from "./common-draw.service";

@Injectable({
  providedIn: "root"
})
export class AsiDrawService extends CommonDrawService{

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawASI(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    chart.plot(plotNumber).removeAllSeries();
    return this.drawASI(settings, result, chart, plotNumber);
  }

  private drawASI(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareAtrData(result);
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
    const positiveDiLine = indicatorPlot.line(indicator.mapAs({'value': 1}));
    positiveDiLine.stroke('blue');
    positiveDiLine.name('ASI');
  }

  private configureSignalLine(indicatorPlot, indicator) {
    const negativeDiLine = indicatorPlot.line(indicator.mapAs({'value': 2}));
    negativeDiLine.stroke('red');
    negativeDiLine.name('Signal');
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
      + settings.configuration.limitMoveValue + ','
      + settings.configuration.movingAveragePeriod + ')';
  }

  private prepareAtrData(result: any[]) {
    return super.prepareDataForIndicatorWithSignalLine(result);
  }

}
