import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { Injectable } from "@angular/core";
import { CommonDrawService } from "./common-draw.service";

@Injectable({
  providedIn: "root"
})
export class StDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawST(settings, result, chart, 0);
  }

  update(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawST(settings, result, chart, 0);
  }

  configurePlot(chart: any, plotNumber: number, indicator: any) {
    const indicatorPlot = chart.plot(plotNumber);
    super.configureDateTimeFormat(indicatorPlot);
    return indicatorPlot.line(indicator.mapAs({'value': 1}));
  }

  configureIndicator(settings, indicatorData, computedLine) {
    computedLine.name(settings.indicatorItem.title);
    computedLine.stroke(this.defineColor(settings.drawConfiguration, indicatorData));
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.period + ',' +
      settings.configuration.multiplier + ')';
  }

  private drawST(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = super.prepareSimpleIndicatorData(result);
    const indicator = super.configureDataTable(indicatorData);
    const computedLine = this.configurePlot(chart, plotNumber, indicator);
    this.configureIndicator(settings, indicatorData, computedLine);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private defineColor(drawConfiguration, indicatorData) {
    return function (): string {
      if (this.index != null && this.index > 0) {
        if (indicatorData[this.index][1] != null && indicatorData[this.index - 1][1] != null) {
          if (indicatorData[this.index][1] > indicatorData[this.index - 1][1]) {
            return drawConfiguration.upTrendColor;
          } else {
            return drawConfiguration.downTrendColor;
          }
        }
        return drawConfiguration.upTrendColor;
      }
    };
  }

}
