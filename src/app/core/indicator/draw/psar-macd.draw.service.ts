import { Injectable } from "@angular/core";
import { SimpleDrawService } from "./simple-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";

@Injectable({
  providedIn: "root"
})
export class PsarMacdDrawService extends SimpleDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    const plotNumber = currentPlotNumber + 1;
    return this.drawPsarMacd(result, chart, plotNumber, settings);
  }

  update(settings: IndicatorSettings, result: any[], chart: any, currentPlotNumber: number): IndicatorDrawResult {
    return this.drawPsarMacd(result, chart, currentPlotNumber, settings);
  }

  prepareTitle(settings: IndicatorSettings) {
    return 'PSAR-MACD' + '(' +
      settings.configuration.minAccelerationFactor + ',' +
      settings.configuration.maxAccelerationFactor + ',' +
      settings.configuration.signalPeriod + ')';
  }

  configurePlot(chart: any, plotNumber: number, indicatorMapping) {
    const indicatorPlot = super.prepareDefaultPlotConfiguration(chart, plotNumber);
    super.configureDateTimeFormat(indicatorPlot);
    return indicatorPlot.marker(indicatorMapping);
  }

  configurePsar(settings, series) {
    series.name('PSAR');
    series.normal().fill(settings.drawConfiguration.indicatorColor, 1);
    series.normal().stroke(settings.drawConfiguration.indicatorColor, 1);
    series.normal().size(settings.drawConfiguration.markerSize);
    series.normal().type(settings.drawConfiguration.marker);
  }

  private drawPsarMacd(result: any[], chart: any, plotNumber: number, settings: IndicatorSettings) {
    this.drawPsar(result, chart, plotNumber, settings);
    this.drawMacdSignalLine(settings, result, plotNumber, chart);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private drawPsar(result: any[], chart: any, plotNumber: number, settings: IndicatorSettings) {
    const indicatorData = this.prepareSimpleIndicatorData(result);
    const indicatorMapping = this.addData(indicatorData);
    const computedLine = this.configurePlot(chart, plotNumber, indicatorMapping);
    this.configurePsar(settings, computedLine);
  }

  private drawMacdSignalLine(settings: IndicatorSettings, result: any[], plotNumber: number, chart) {
    const indicatorData = this.prepareMacdSignalLineData(result);
    const indicatorMapping = this.addData(indicatorData);
    const indicatorPlot = chart.plot(plotNumber);
    const indicatorLine = indicatorPlot.line(indicatorMapping);
    indicatorLine.stroke(settings.drawConfiguration.macdLineColor);
    indicatorLine.name('MACD Signal Line');
  }

  private prepareMacdSignalLineData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => {
      indicatorData.push([
        indicatorResult.time,
        this.convertValue(indicatorResult.signalLineValue)
      ])
    });
    return indicatorData;
  }

}
