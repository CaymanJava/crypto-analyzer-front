import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

export abstract class ColumnDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number, horizontalLines?: number[]): IndicatorDrawResult {
    return this.drawColumnIndicator(settings, result, chart, plotNumber, horizontalLines);
  }

  private drawColumnIndicator(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number, horizontalLines: number[]): IndicatorDrawResult {
    const indicatorData = super.prepareColumnIndicatorData(result);
    const indicatorMapping = this.addData(indicatorData);
    const computedLine = this.configurePlot(chart, plotNumber, indicatorMapping, horizontalLines);
    const title = this.prepareTitle(settings);
    this.configureColumns(computedLine, settings, indicatorData);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private configurePlot(chart: any, plotNumber: number, indicatorMapping, horizontalLines: number[]) {
    const indicatorPlot = super.prepareDefaultPlotConfiguration(chart, plotNumber);
    super.addHorizontalLines(horizontalLines, indicatorPlot);
    return indicatorPlot.column(indicatorMapping);
  }

  private addData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator.mapAs({'value': 1});
  }

  private configureColumns(computedLine, settings, indicatorData) {
    computedLine.name(settings.indicatorItem.title);
    computedLine.fill(this.defineColor(indicatorData));
  }

  private defineColor(indicatorData: any[]) {
    return function () {
      if (this.index != null && this.index > 0 && indicatorData[this.index][2] != null) {
        if (indicatorData[this.index][2]) {
          return '#3ba158';
        }
        return '#fa0f16';
      }
    };
  }

}
