import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HaDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number, [], pixels: number = 150): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    this.drawHA(result, chart, settings, plotNumber, pixels);
    return new IndicatorDrawResult(this.prepareTitle(settings), plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number, [], pixels: number = 150): IndicatorDrawResult {
    super.clearPlot(chart, plotNumber);
    this.drawHA(result, chart, settings, plotNumber, pixels);
    return new IndicatorDrawResult(this.prepareTitle(settings), plotNumber);
  }

  prepareData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        this.convertValue(indicatorResult.open),
        this.convertValue(indicatorResult.high),
        this.convertValue(indicatorResult.low),
        this.convertValue(indicatorResult.close),
      ]
    ));
    return indicatorData;
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title;
  }

  private drawHA(result: any[], chart: any, settings: IndicatorSettings, plotNumber, pixels: number) {
    const data = this.prepareData(result);
    const mapping = this.addData(data);
    const plot = this.preparePlot(chart, mapping, plotNumber, pixels);
    this.configureCandlestick(plot, settings);
  }

  private addData(result: any[]) {
    const table = AnyChart.data.table(0);
    table.addData(result);
    return table.mapAs({
      'open': 1,
      'high': 2,
      'low': 3,
      'close': 4
    });
  }

  private preparePlot(chart, mapping, plotNumber: number, pixels: number) {
    const plot = chart.plot(plotNumber);
    plot.height(pixels + 'px');
    plot.xGrid().enabled(true);
    plot.yGrid().enabled(true);
    plot.yGrid().stroke("#dee2e6");
    super.configureDateTimeFormat(plot);
    return plot.candlestick(mapping);
  }

  private configureCandlestick(candlestick, settings: IndicatorSettings) {
    candlestick.name(settings.indicatorItem.title);
    candlestick.risingStroke(settings.drawConfiguration.risingBarColor);
    candlestick.risingFill(settings.drawConfiguration.risingBarColor);
    candlestick.fallingStroke(settings.drawConfiguration.fallingBarColor);
    candlestick.fallingFill(settings.drawConfiguration.fallingBarColor);
  }

}
