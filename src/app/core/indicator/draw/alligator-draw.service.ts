import { CommonDrawService } from "./common-draw.service";
import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

@Injectable({
  providedIn: "root"
})
export class AlligatorDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawAlligator(settings, result, chart, 0);
  }

  update(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawAlligator(settings, result, chart, 0);
  }

  private drawAlligator(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicator = this.prepareData(result);
    this.preparePlot(chart, plotNumber, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private preparePlot(chart: any, plotNumber: number, indicator) {
    const indicatorPlot = chart.plot(plotNumber);
    this.configureLines(indicatorPlot, indicator);
  }

  private prepareData(result: any[]) {
    const indicatorData = this.prepareAlligatorData(result);
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator;
  }

  private configureLines(indicatorPlot, indicator) {
    this.configureJawLine(indicatorPlot, indicator);
    this.configureTeethLine(indicatorPlot, indicator);
    this.configureLipsLine(indicatorPlot, indicator);
  }

  private configureJawLine(indicatorPlot, indicator) {
    const jawLine = indicatorPlot.line(indicator.mapAs({'value': 1}));
    jawLine.stroke('blue');
    jawLine.name('Jaw');
  }

  private configureTeethLine(indicatorPlot, indicator) {
    const teethLine = indicatorPlot.line(indicator.mapAs({'value': 2}));
    teethLine.stroke('red');
    teethLine.name('Teeth');
  }

  private configureLipsLine(indicatorPlot, indicator) {
    const lipsLine = indicatorPlot.line(indicator.mapAs({'value': 3}));
    lipsLine.stroke('green');
    lipsLine.name('Lips');
  }

  private prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.jawPeriod + ', ' +
      settings.configuration.jawOffset + ', ' +
      settings.configuration.teethPeriod + ', ' +
      settings.configuration.teethOffset + ', ' +
      settings.configuration.lipsPeriod + ', ' +
      settings.configuration.lipsOffset + ')';
  }

  private prepareAlligatorData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        indicatorResult.jawValue,
        indicatorResult.teethValue,
        indicatorResult.lipsValue
      ]
    ));
    return indicatorData;
  }

}
