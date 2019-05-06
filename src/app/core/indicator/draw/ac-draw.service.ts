import { Injectable } from "@angular/core";
import * as AnyChart from "anychart";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { CommonDrawService } from "./common-draw.service";

@Injectable({
  providedIn: "root"
})
export class AcDrawService extends CommonDrawService{

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawAc(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    chart.plot(plotNumber).removeAllSeries();
    return this.drawAc(settings, result, chart, plotNumber);
  }

  private drawAc(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = super.prepareDefaultIndicatorData(result);
    const indicatorMapping = this.addData(indicatorData);
    const computedLine = this.configurePlot(chart, plotNumber, indicatorMapping);
    const title = this.prepareTitle(settings);
    super.configureColumns(computedLine, title);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private configurePlot(chart: any, plotNumber: number, indicatorMapping) {
    const indicatorPlot = chart.plot(plotNumber);
    indicatorPlot.height('150px');
    super.configureDateTimeFormat(indicatorPlot);
    super.addHorizontalLine(indicatorPlot, 0);
    return indicatorPlot.column(indicatorMapping);
  }

  private addData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator.mapAs({'value': 1});
  }

  private prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' + settings.configuration.slowPeriod + ', ' +
      settings.configuration.fastPeriod + ', ' + settings.configuration.smoothedPeriod + ')';
  }

}
