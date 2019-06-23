import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { CommonDrawService } from "./common-draw.service";
import * as AnyChart from "anychart";

@Injectable({
  providedIn: "root"
})
export class RoDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawRainbowOscillator(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    super.clearPlot(chart, plotNumber);
    return this.drawRainbowOscillator(settings, result, chart, plotNumber);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.period + ',' +
      settings.configuration.highLowLookBack + ')';
  }

  private drawRainbowOscillator(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number) {
    const indicatorData = this.prepareData(result);
    this.preparePlot(chart, plotNumber, settings, indicatorData);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareData(result: any[]) {
    const indicatorData = this.prepareROIndicatorData(result);
    const table = AnyChart.data.table();
    table.addData(indicatorData);
    return table;
  }

  private preparePlot(chart: any, plotNumber: number, settings: IndicatorSettings, indicatorData) {
    const indicatorPlot = chart.plot(plotNumber);
    indicatorPlot.height('150px');
    indicatorPlot.xGrid().enabled(true);
    indicatorPlot.yGrid().enabled(true);
    indicatorPlot.yGrid().stroke("#dee2e6");
    super.configureDateTimeFormat(indicatorPlot);
    super.addHorizontalLines([0], indicatorPlot);
    this.configureColumn(settings, indicatorPlot, indicatorData);
    this.configureLines(settings, indicatorPlot, indicatorData);
  }

  private prepareROIndicatorData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        this.convertValue(indicatorResult.indicatorValue),
        this.convertValue(indicatorResult.upperEnvelope),
        this.convertValue(indicatorResult.lowerEnvelope)
      ]
    ));
    return indicatorData;
  }

  private configureColumn(settings: any, plot, indicatorData) {
    const columns = plot.column(indicatorData.mapAs({'value': 1}));
    columns.normal().fill(this.defineColor(settings.drawConfiguration));
    columns.name('RO');
  }

  private defineColor(drawConfiguration) {
    return function (): string {
      if (this.value != null && this.value > 0) {
        return drawConfiguration.upperEnvelopeColor;
      }
      return drawConfiguration.lowerEnvelopeColor;
    };
  }

  private configureLines(settings: any, indicatorPlot, indicatorData) {
    this.configureLine(indicatorPlot, indicatorData, 2, settings.drawConfiguration.upperEnvelopeColor, 'Upper Envelope');
    this.configureLine(indicatorPlot, indicatorData, 3, settings.drawConfiguration.lowerEnvelopeColor, 'Lower envelope');
  }

  private configureLine(indicatorPlot, indicatorData, index: number, color: string, title: string) {
    const firstResistance = indicatorPlot.line(indicatorData.mapAs({'value': index}));
    firstResistance.stroke(color);
    firstResistance.name(title);
  }

}
