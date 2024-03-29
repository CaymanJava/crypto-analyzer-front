import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { CommonDrawService } from "./common-draw.service";

@Injectable({
  providedIn: "root"
})
export class AdxDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawADX(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    super.clearPlot(chart, plotNumber);
    return this.drawADX(settings, result, chart, plotNumber);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' + settings.configuration.period + ')';
  }

  private drawADX(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareAdxData(result);
    const indicatorPlot = super.prepareDefaultPlotConfiguration(chart, plotNumber);
    const indicator = super.configureDataTable(indicatorData);
    this.prepareLines(settings.drawConfiguration, indicatorPlot, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareLines(drawConfiguration, indicatorPlot, indicator) {
    this.configurePositiveDiLine(drawConfiguration, indicatorPlot, indicator);
    this.configureNegativeDiLine(drawConfiguration, indicatorPlot, indicator);
    this.configureIndicatorLine(drawConfiguration, indicatorPlot, indicator);
  }

  private configurePositiveDiLine(drawConfiguration, indicatorPlot, indicator) {
    const positiveDiLine = indicatorPlot.line(indicator.mapAs({'value': 1}));
    positiveDiLine.stroke(drawConfiguration.positiveDiLineColor);
    positiveDiLine.name('+DI');
  }

  private configureNegativeDiLine(drawConfiguration, indicatorPlot, indicator) {
    const negativeDiLine = indicatorPlot.line(indicator.mapAs({'value': 2}));
    negativeDiLine.stroke(drawConfiguration.negativeDiLineColor);
    negativeDiLine.name('-DI');
  }

  private configureIndicatorLine(drawConfiguration, indicatorPlot, indicator) {
    const indicatorLine = indicatorPlot.line(indicator.mapAs({'value': 3}));
    indicatorLine.stroke(drawConfiguration.indicatorLineColor);
    indicatorLine.name('ADX');
  }

  private prepareAdxData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        super.convertValue(indicatorResult.positiveDirectionalIndicator),
        super.convertValue(indicatorResult.negativeDirectionalIndicator),
        super.convertValue(indicatorResult.averageDirectionalIndex)
      ]
    ));
    return indicatorData;
  }

}
