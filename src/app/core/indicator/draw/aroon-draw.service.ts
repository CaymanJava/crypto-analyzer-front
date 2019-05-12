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

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' + settings.configuration.period + ')';
  }

  private drawAroon(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareAroonData(result);
    const indicatorPlot = this.configurePlot(chart, plotNumber);
    const indicator = this.configureData(indicatorData);
    this.prepareLines(settings.drawConfiguration, indicatorPlot, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareLines(drawConfiguration, indicatorPlot, indicator) {
    this.configureAroonUpLine(drawConfiguration, indicatorPlot, indicator);
    this.configureAroonDownLine(drawConfiguration, indicatorPlot, indicator);
  }

  private configureAroonUpLine(drawConfiguration, indicatorPlot, indicator) {
    const arronUpLine = indicatorPlot.line(indicator.mapAs({'value': 1}));
    arronUpLine.stroke(drawConfiguration.aroonUpLineColor);
    arronUpLine.name('Aroon UP');
  }

  private configureAroonDownLine(drawConfiguration, indicatorPlot, indicator) {
    const aroonDownLine = indicatorPlot.line(indicator.mapAs({'value': 2}));
    aroonDownLine.stroke(drawConfiguration.aroonDownLineColor);
    aroonDownLine.name('Aroon DOWN');
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
