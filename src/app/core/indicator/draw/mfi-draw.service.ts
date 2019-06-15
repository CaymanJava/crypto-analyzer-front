import { Injectable } from "@angular/core";
import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

@Injectable({
  providedIn: "root"
})
export class MfiDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawMFI(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    super.clearPlot(chart, plotNumber);
    return this.drawMFI(settings, result, chart, plotNumber);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title;
  }

  private drawMFI(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareMFIData(result);
    const indicatorMapping = this.addData(indicatorData);
    this.configurePlot(settings, chart, plotNumber, indicatorMapping, indicatorData);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareMFIData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        this.convertValue(indicatorResult.indicatorValue),
        indicatorResult.correlation
      ]
    ));
    return indicatorData;
  }

  private addData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator.mapAs({value: 1});
  }

  private configurePlot(settings: any, chart: any, plotNumber: number, indicatorMapping, indicatorData: any[]) {
    const indicatorPlot = chart.plot(plotNumber);
    indicatorPlot.height('150px');
    super.configureDateTimeFormat(indicatorPlot);
    const series = indicatorPlot.column(indicatorMapping);
    series.name(settings.indicatorItem.title);
    series.fill(this.defineColor(indicatorData, settings));
  }

  private defineColor(indicatorData: any[], settings: any) {
    return function () {
      if (this.index != null && this.index > 0 && indicatorData[this.index][2] != null) {
        switch (indicatorData[this.index][2]) {
          case 'INDICATOR_UP_VOLUME_UP':
            return settings.drawConfiguration.indicatorUpVolumeUp;
          case 'INDICATOR_UP_VOLUME_DOWN':
            return settings.drawConfiguration.indicatorUpVolumeDown;
          case 'INDICATOR_DOWN_VOLUME_UP':
            return settings.drawConfiguration.indicatorDownVolumeUp;
          case 'INDICATOR_DOWN_VOLUME_DOWN':
          default:
            return settings.drawConfiguration.indicatorDownVolumeDown;
        }
      }
    };
  }

}
