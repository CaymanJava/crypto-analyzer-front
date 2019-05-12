import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

export abstract class ColumnDrawService extends CommonDrawService {

  abstract getName(): string;

  draw(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number, horizontalLines?: number[]): IndicatorDrawResult {
    return this.drawColumnIndicator(settings, result, chart, plotNumber, horizontalLines);
  }

  private drawColumnIndicator(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number, horizontalLines: number[]): IndicatorDrawResult {
    const indicatorData = super.prepareSimpleIndicatorData(result);
    const indicatorMapping = this.addData(indicatorData);
    const computedLine = this.configurePlot(chart, plotNumber, indicatorMapping, horizontalLines);
    const title = this.prepareTitle(settings);
    this.configureColumns(computedLine, title);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private configurePlot(chart: any, plotNumber: number, indicatorMapping, horizontalLines: number[]) {
    const indicatorPlot = chart.plot(plotNumber);
    indicatorPlot.height('150px');
    super.configureDateTimeFormat(indicatorPlot);
    this.addHorizontalLines(horizontalLines, indicatorPlot);
    return indicatorPlot.column(indicatorMapping);
  }

  private addHorizontalLines(horizontalLines: number[], indicatorPlot) {
    if (horizontalLines != null) {
      horizontalLines.forEach(line => super.addHorizontalLine(indicatorPlot, line));
    }
  }

  private addData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator.mapAs({'value': 1});
  }

  private configureColumns(computedLine, title) {
    computedLine.name(title);
    computedLine.risingFill('#3ba158');
    computedLine.risingStroke('#3ba158');
    computedLine.fallingFill('#fa0f16');
    computedLine.fallingStroke('#fa0f16');
  }

}
