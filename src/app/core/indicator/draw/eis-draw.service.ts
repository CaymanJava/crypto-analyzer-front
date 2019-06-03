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
    chart.plot(plotNumber).removeAllSeries();
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
    this.configurePlot(chart, plotNumber, indicatorMapping);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareEISData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        this.defineValue(indicatorResult.barColor),
      ]
    ));
    return indicatorData;
  }

  private defineValue(barColor: string) {
    if (barColor == null) {
      return 1;
    }

    switch (barColor) {
      case 'GREEN':
        return 1.1;
      case 'RED':
        return 1.2;
      default:
        return 1;
    }
  }

  private addData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator.mapAs({value: 1});
  }

  private configurePlot(chart: any, plotNumber: number, indicatorMapping) {
    const indicatorPlot = chart.plot(plotNumber);
    indicatorPlot.height('150px');
    super.configureDateTimeFormat(indicatorPlot);
    const series = indicatorPlot.column(indicatorMapping);
    this.disableYAxis(indicatorPlot);
    series.name('EIS');
    let defineColor = this.defineColor();
    series.fill(defineColor);
    series.yScale().minimum(1);
    series.yScale().maximum(1);
  }

  private disableYAxis(indicatorPlot) {
    indicatorPlot.yAxis(0).labels(false);
  }

  private defineColor() {
    return function defineColor(): string {
      switch (this.value) {
        case 1.1:
          return '#3ba158';
        case 1.2:
          return '#fa0f16';
        default:
          return '#1512fa';
      }
    };
  }

}
