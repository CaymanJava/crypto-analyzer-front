import { CommonDrawService } from "./common-draw.service";
import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

@Injectable({
  providedIn: "root"
})
export class EisDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawEIS(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    super.clearPlot(chart, plotNumber);
    return this.drawEIS(settings, result, chart, plotNumber);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '('
      + settings.configuration.maPeriod + ','
      + settings.configuration.macdFastPeriod + ','
      + settings.configuration.macdSlowPeriod + ','
      + settings.configuration.macdSignalPeriod + ')';
  }

  private drawEIS(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareEISData(result);
    const indicatorMapping = this.addData(indicatorData);
    this.configurePlot(settings, chart, plotNumber, indicatorMapping, indicatorData);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareEISData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        indicatorResult.barColor,
        1
      ]
    ));
    return indicatorData;
  }

  private addData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator.mapAs({value: 2});
  }

  private configurePlot(settings: any, chart: any, plotNumber: number, indicatorMapping, indicatorData: any[]) {
    const indicatorPlot = super.prepareDefaultPlotConfiguration(chart, plotNumber);
    this.disableLinesAndLabels(indicatorPlot);
    const series = indicatorPlot.column(indicatorMapping);
    series.name(settings.indicatorItem.title);
    series.fill(this.defineColor(indicatorData));
    series.yScale().minimum(1);
    series.yScale().maximum(1);
  }

  private disableLinesAndLabels(indicatorPlot) {
    indicatorPlot.xGrid().enabled(false);
    indicatorPlot.yGrid().enabled(false);
    indicatorPlot.yAxis(0).labels(false);
  }

  private defineColor(indicatorData: any[]) {
    return function () {
      if (this.index != null && this.index > 0) {
        switch (indicatorData[this.index][1]) {
          case 'GREEN':
            return '#3ba158';
          case 'RED':
            return '#fa0f16';
          default:
            return '#1512fa';
        }
      }
    };
  }

}
