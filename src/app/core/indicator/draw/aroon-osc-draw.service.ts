import { Injectable } from "@angular/core";
import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

@Injectable({
  providedIn: "root"
})
export class AroonOscDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawAroonOsc(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    chart.plot(plotNumber).removeAllSeries();
    return this.drawAroonOsc(settings, result, chart, plotNumber);
  }

  private drawAroonOsc(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareAroonOscData(result);
    const indicatorMapping = this.addData(indicatorData);
    this.configurePlot(chart, plotNumber, indicatorMapping);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private configurePlot(chart: any, plotNumber: number, indicatorMapping) {
    const indicatorPlot = chart.plot(plotNumber);
    indicatorPlot.height('150px');
    super.configureDateTimeFormat(indicatorPlot);
    super.addHorizontalLine(indicatorPlot, 0);
    return indicatorPlot.line(indicatorMapping);
  }

  private addData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator.mapAs({'value': 1});
  }

  private prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' + settings.configuration.period + ')';
  }

  private prepareAroonOscData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        super.convertValue(indicatorResult.aroonOscillator)
      ]
    ));
    return indicatorData;
  }

}
