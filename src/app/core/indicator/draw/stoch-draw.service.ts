import { Injectable } from "@angular/core";
import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";

@Injectable({
  providedIn: "root"
})
export class StochDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawStochastic(settings, result, chart, plotNumber);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    super.clearPlot(chart, plotNumber);
    return this.drawStochastic(settings, result, chart, plotNumber);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.fastStochPeriod + ',' +
      settings.configuration.slowStochPeriod + ')';
  }

  private drawStochastic(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorData = this.prepareStochasticData(result);
    const indicatorPlot = super.prepareDefaultPlotConfiguration(chart, plotNumber);
    const indicator = super.configureDataTable(indicatorData);
    this.prepareLines(settings.drawConfiguration, indicatorPlot, indicator);
    super.addHorizontalLines([settings.drawConfiguration.overbought, settings.drawConfiguration.oversold], indicatorPlot);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareLines(drawConfiguration, indicatorPlot, indicator) {
    this.configureFastStochastic(drawConfiguration, indicatorPlot, indicator);
    this.configureSlowStochastic(drawConfiguration, indicatorPlot, indicator);
  }

  private configureFastStochastic(drawConfiguration, indicatorPlot, indicator) {
    const positiveDiLine = indicatorPlot.line(indicator.mapAs({'value': 1}));
    positiveDiLine.stroke(drawConfiguration.fastStochasticColor);
    positiveDiLine.name('%K');
  }

  private configureSlowStochastic(drawConfiguration, indicatorPlot, indicator) {
    const negativeDiLine = indicatorPlot.line(indicator.mapAs({'value': 2}));
    negativeDiLine.stroke(drawConfiguration.slowStochasticColor);
    negativeDiLine.name('%D');
  }

  private prepareStochasticData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        super.convertValue(indicatorResult.fastStochastic),
        super.convertValue(indicatorResult.slowStochastic)
      ]
    ));
    return indicatorData;
  }

}
