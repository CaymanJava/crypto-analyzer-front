import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";
import { CommonDrawService } from "./common-draw.service";


@Injectable({
  providedIn: "root"
})
export class AdlDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawADL(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    chart.plot(plotNumber).removeAllSeries();
    return this.drawADL(settings, result, chart, plotNumber);
  }

  private drawADL(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = super.prepareDefaultIndicatorData(result);
    const indicatorMapping = this.addData(indicatorData);
    const computedLine = this.configurePlot(chart, plotNumber, indicatorMapping);
    const title = this.prepareTitle(settings);
    this.configureComputedLine(computedLine, title);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private configureComputedLine(computedLine, title) {
    computedLine.name(title);
  }

  private configurePlot(chart: any, plotNumber: number, indicatorMapping) {
    const indicatorPlot = chart.plot(plotNumber);
    indicatorPlot.height('150px');
    super.configureDateTimeFormat(indicatorPlot);
    return indicatorPlot.line(indicatorMapping);
  }

  private addData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator.mapAs({'value': 1});
  }

  private prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title;
  }

}
