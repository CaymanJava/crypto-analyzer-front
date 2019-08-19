import { Injectable } from "@angular/core";
import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

@Injectable({
  providedIn: "root"
})
export class FractalDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawFractals(settings, result, chart);
  }

  update(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawFractals(settings, result, chart);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title;
  }

  private drawFractals(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    const indicatorData = this.prepareFractalsData(result);
    const indicatorMapping = this.addData(indicatorData);
    const computedLine = this.configurePlot(chart, 0, indicatorMapping);
    this.configureIndicator(settings, computedLine, indicatorData);
    return new IndicatorDrawResult(this.prepareTitle(settings), 0);
  }

  private configurePlot(chart: any, plotNumber: number, indicatorMapping) {
    const indicatorPlot = chart.plot(plotNumber);
    super.configureDateTimeFormat(indicatorPlot);
    return indicatorPlot.marker(indicatorMapping);
  }

  private configureIndicator(settings, series, indicatorData) {
    series.name(settings.indicatorItem.title);
    series.normal().fill(this.defineColor(settings, indicatorData));
    series.normal().stroke(this.defineColor(settings, indicatorData));
    series.normal().size(settings.drawConfiguration.markerSize);
    series.normal().type(settings.drawConfiguration.marker);
  }

  private defineColor(settings, indicatorData: any[]) {
    return function () {
      if (this.index != null && this.index > 0 && indicatorData[this.index][2] != null && indicatorData[this.index][3] != null) {
        if (indicatorData[this.index][2]) {
          return settings.drawConfiguration.upFractalColor;
        }
        if (indicatorData[this.index][3]) {
          return settings.drawConfiguration.downFractalColor;
        }
        return settings.drawConfiguration.downFractalColor;
      }
    };
  }

  private addData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator.mapAs({'value': 1});
  }

  private prepareFractalsData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => {
      indicatorData.push(
        [
          indicatorResult.time,
          this.getFractalValue(indicatorResult),
          indicatorResult.upFractal,
          indicatorResult.downFractal
        ]
      )
    });
    return indicatorData;
  }

  private getFractalValue(indicatorResult: any) {
    if (indicatorResult.upFractal) {
      return this.convertValue(indicatorResult.high * 1.03);
    }
    if (indicatorResult.downFractal) {
      return this.convertValue(indicatorResult.low * 0.97);
    }
    return null;
  }

}
