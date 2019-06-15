import { SignalLineDrawService } from "./signal-line-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MacdDrawService extends SignalLineDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    this.drawColumnIndicator(settings, result, chart, plotNumber);
    return super.draw(settings, result, chart, plotNumber, [0]);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    super.clearPlot(chart, plotNumber);
    this.drawColumnIndicator(settings, result, chart, plotNumber);
    return super.draw(settings, result, chart, plotNumber, [0]);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.fastPeriod + ',' +
      settings.configuration.slowPeriod + ',' +
      settings.configuration.signalPeriod + ')';
  }

  private drawColumnIndicator(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number) {
    const indicatorData = this.prepareMACDBarChartData(result);
    const indicatorMapping = this.addData(indicatorData);
    this.configureColumn(settings, chart, plotNumber, indicatorMapping);
  }

  private addData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator.mapAs({'value': 1});
  }

  private configureColumn(settings: any, chart: any, plotNumber: number, indicatorMapping) {
    const columns = chart.plot(plotNumber).column(indicatorMapping);
    columns.normal().fill(settings.drawConfiguration.barChartColor, 0.3);
    columns.name('Bar chart');
  }

  private prepareMACDBarChartData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        this.convertValue(indicatorResult.barChartValue)
      ]
    ));
    return indicatorData;
  }

}
