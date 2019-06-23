import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

export abstract class SimpleDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number, horizontalLines?: number[]): IndicatorDrawResult {
    return this.drawSimpleIndicator(settings, result, chart, plotNumber, horizontalLines);
  }

  configurePlot(chart: any, plotNumber: number, indicatorMapping, horizontalLines: number[]) {
    const indicatorPlot = super.prepareDefaultPlotConfiguration(chart, plotNumber);
    super.addHorizontalLines(horizontalLines, indicatorPlot);
    return indicatorPlot.line(indicatorMapping);
  }

  addData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator.mapAs({'value': 1});
  }

  configureIndicator(settings, computedLine) {
    computedLine.name(settings.indicatorItem.title);
    computedLine.stroke(settings.drawConfiguration.indicatorLineColor);
  }

  private drawSimpleIndicator(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number, horizontalLines: number[]): IndicatorDrawResult {
    const indicatorData = this.prepareSimpleIndicatorData(result);
    const indicatorMapping = this.addData(indicatorData);
    const computedLine = this.configurePlot(chart, plotNumber, indicatorMapping, horizontalLines);
    this.configureIndicator(settings, computedLine);
    return new IndicatorDrawResult(this.prepareTitle(settings), plotNumber);
  }

}
