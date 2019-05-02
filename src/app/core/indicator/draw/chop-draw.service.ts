import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ChopDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawChop(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    super.clearPlot(chart, plotNumber);
    return this.drawChop(settings, result, chart, plotNumber);
  }

  private drawChop(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = super.prepareDefaultIndicatorData(result);
    const indicatorMapping = this.addData(indicatorData);
    const computedLine = this.configurePlot(settings.configuration, chart, plotNumber, indicatorMapping);
    const title = this.prepareTitle(settings);
    this.configureComputedLine(computedLine, title);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private configureComputedLine(computedLine, title) {
    computedLine.name(title);
  }

  private configurePlot(configuration: any, chart: any, plotNumber: number, indicatorMapping) {
    const indicatorPlot = chart.plot(plotNumber);
    indicatorPlot.height('150px');
    super.configureDateTimeFormat(indicatorPlot);
    super.addHorizontalLine(indicatorPlot, configuration.overbought);
    super.addHorizontalLine(indicatorPlot, configuration.oversold);
    return indicatorPlot.line(indicatorMapping);
  }

  private addData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator.mapAs({'value': 1});
  }

  private prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.period + ')';
  }

}
