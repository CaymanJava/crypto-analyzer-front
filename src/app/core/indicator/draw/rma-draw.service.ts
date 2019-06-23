import { Injectable } from "@angular/core";
import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

@Injectable({
  providedIn: "root"
})
export class RmaDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawRainbowMA(result, settings, chart);
  }

  update(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawRainbowMA(result, settings, chart);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '('
      + settings.configuration.period + ')';
  }

  private drawRainbowMA(result: any[], settings: IndicatorSettings, chart: any) {
    const indicatorData = this.prepareData(result);
    this.preparePlot(settings, chart, indicatorData);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, 0);
  }

  private prepareData(result: any[]) {
    const indicatorData = this.prepareRainbowMAData(result);
    const table = AnyChart.data.table();
    table.addData(indicatorData);
    return table;
  }

  private prepareRainbowMAData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        this.convertValue(indicatorResult.firstMaValue),
        this.convertValue(indicatorResult.secondMaValue),
        this.convertValue(indicatorResult.thirdMaValue),
        this.convertValue(indicatorResult.fourthMaValue),
        this.convertValue(indicatorResult.fifthMaValue),
        this.convertValue(indicatorResult.sixthMaValue),
        this.convertValue(indicatorResult.seventhMaValue),
        this.convertValue(indicatorResult.eighthMaValue),
        this.convertValue(indicatorResult.ninthMaValue),
        this.convertValue(indicatorResult.tenthMaValue)
      ]
    ));
    return indicatorData;
  }

  private preparePlot(settings: any, chart: any, indicatorData) {
    const indicatorPlot = chart.plot(0);
    this.configureLines(settings, indicatorPlot, indicatorData);
  }

  private configureLines(settings: any, indicatorPlot, indicatorData) {
    this.configureLine(indicatorPlot, indicatorData, 1, settings.drawConfiguration.firstMaColor, '1st MA');
    this.configureLine(indicatorPlot, indicatorData, 2, settings.drawConfiguration.secondMaColor, '2nd MA');
    this.configureLine(indicatorPlot, indicatorData, 3, settings.drawConfiguration.thirdMaColor, '3nd MA');
    this.configureLine(indicatorPlot, indicatorData, 4, settings.drawConfiguration.fourthMaColor, '4th MA');
    this.configureLine(indicatorPlot, indicatorData, 5, settings.drawConfiguration.fifthMaColor, '5th MA');
    this.configureLine(indicatorPlot, indicatorData, 6, settings.drawConfiguration.sixthMaColor, '6th MA');
    this.configureLine(indicatorPlot, indicatorData, 7, settings.drawConfiguration.seventhMaColor, '7th MA');
    this.configureLine(indicatorPlot, indicatorData, 8, settings.drawConfiguration.eighthMaColor, '8th MA');
    this.configureLine(indicatorPlot, indicatorData, 9, settings.drawConfiguration.ninthMaColor, '9th MA');
    this.configureLine(indicatorPlot, indicatorData, 10, settings.drawConfiguration.tenthMaColor, '10th MA');
  }

  private configureLine(indicatorPlot, indicator, index: number, color: string, title: string) {
    const firstResistance = indicatorPlot.line(indicator.mapAs({'value': index}));
    firstResistance.stroke(color);
    firstResistance.name(title);
  }

}
