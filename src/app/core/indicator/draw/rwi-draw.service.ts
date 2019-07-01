import { Injectable } from "@angular/core";
import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

@Injectable({
  providedIn: "root"
})
export class RwiDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawRWI(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    super.clearPlot(chart, plotNumber);
    return this.drawRWI(settings, result, chart, plotNumber);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.period + ')';
  }

  private drawRWI(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number) {
    const indicatorData = this.prepareData(result);
    this.preparePlot(chart, plotNumber, settings, indicatorData);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareData(result: any[]) {
    const indicatorData = this.prepareRWIData(result);
    const table = AnyChart.data.table();
    table.addData(indicatorData);
    return table;
  }

  private preparePlot(chart: any, plotNumber: number, settings: IndicatorSettings, indicatorData) {
    const indicatorPlot = super.prepareDefaultPlotConfiguration(chart, plotNumber);
    this.configureLines(settings, indicatorPlot, indicatorData);
  }

  private prepareRWIData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        this.convertValue(indicatorResult.highValue),
        this.convertValue(indicatorResult.lowValue)
      ]
    ));
    return indicatorData;
  }

  private configureLines(settings: any, indicatorPlot, indicatorData) {
    this.configureLine(indicatorPlot, indicatorData, 1, settings.drawConfiguration.highValuesLineColor, 'High value');
    this.configureLine(indicatorPlot, indicatorData, 2, settings.drawConfiguration.lowValuesLineColor, 'Low value');
  }

  private configureLine(indicatorPlot, indicatorData, index: number, color: string, title: string) {
    const firstResistance = indicatorPlot.line(indicatorData.mapAs({'value': index}));
    firstResistance.stroke(color);
    firstResistance.name(title);
  }

}
