import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { Injectable } from "@angular/core";
import * as AnyChart from "anychart";
import { CommonDrawService } from "./common-draw.service";

@Injectable({
  providedIn: "root"
})
export class PivotDrawService extends CommonDrawService {

  private secondLineTypes = new Set<string>();
  private thirdLineTypes = new Set<string>();
  private fourthLineTypes = new Set<string>();

  constructor() {
    super();
    this.initLineTypes();
  }

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawPivotPoints(result, settings, chart);
  }

  update(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawPivotPoints(result, settings, chart);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title;
  }

  private drawPivotPoints(result: any[], settings: IndicatorSettings, chart: any) {
    const indicator = this.prepareData(result);
    this.preparePlot(settings, chart, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, 0);
  }

  private prepareData(result: any[]) {
    const indicatorData = this.preparePivotData(result);
    const table = AnyChart.data.table();
    table.addData(indicatorData);
    return table;
  }

  private preparePivotData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        this.convertValue(indicatorResult.pivot),
        this.convertValue(indicatorResult.firstResistance),
        this.convertValue(indicatorResult.secondResistance),
        this.convertValue(indicatorResult.thirdResistance),
        this.convertValue(indicatorResult.fourthResistance),
        this.convertValue(indicatorResult.firstSupport),
        this.convertValue(indicatorResult.secondSupport),
        this.convertValue(indicatorResult.thirdSupport),
        this.convertValue(indicatorResult.fourthSupport)
      ]
    ));
    return indicatorData;
  }

  private preparePlot(settings: any, chart: any, indicator) {
    const indicatorPlot = chart.plot(0);
    this.configureLines(settings, indicatorPlot, indicator);
  }

  private configureLines(settings: any, indicatorPlot, indicator) {
    this.configurePivotLine(settings, indicatorPlot, indicator);
    this.configureFirstLines(settings, indicatorPlot, indicator);
    this.configureSecondLines(settings, indicatorPlot, indicator);
    this.configureThirdLines(settings, indicatorPlot, indicator);
    this.configureFourthLines(settings, indicatorPlot, indicator);
  }

  private configurePivotLine(settings, indicatorPlot, indicator) {
    if (settings.configuration.indicatorType != 'DE_MARK_PIVOT_POINTS') {
      const middleBand = indicatorPlot.line(indicator.mapAs({'value': 1}));
      middleBand.stroke(settings.drawConfiguration.pivotColor);
      middleBand.name('Pivot');
    }
  }

  private configureFirstLines(settings, indicatorPlot, indicator) {
    this.configureLine(indicatorPlot, indicator, 2, settings.drawConfiguration.firstResistanceColor, '1st resistance');
    this.configureLine(indicatorPlot, indicator, 6, settings.drawConfiguration.firstSupportColor, '1st support');
  }

  private configureSecondLines(settings, indicatorPlot, indicator) {
    if (this.secondLineTypes.has(settings.configuration.indicatorType)) {
      this.configureLine(indicatorPlot, indicator, 3, settings.drawConfiguration.secondResistanceColor, '2nd resistance');
      this.configureLine(indicatorPlot, indicator, 7, settings.drawConfiguration.secondSupportColor, '2nd support');
    }
  }

  private configureThirdLines(settings, indicatorPlot, indicator) {
    if (this.thirdLineTypes.has(settings.configuration.indicatorType)) {
      this.configureLine(indicatorPlot, indicator, 4, settings.drawConfiguration.thirdResistanceColor, '3rd resistance');
      this.configureLine(indicatorPlot, indicator, 8, settings.drawConfiguration.thirdSupportColor, '3rd support');
    }
  }

  private configureFourthLines(settings, indicatorPlot, indicator) {
    if (this.fourthLineTypes.has(settings.configuration.indicatorType)) {
      this.configureLine(indicatorPlot, indicator, 5, settings.drawConfiguration.fourthResistanceColor, '4th resistance');
      this.configureLine(indicatorPlot, indicator, 9, settings.drawConfiguration.fourthSupportColor, '4th support');
    }
  }

  private configureLine(indicatorPlot, indicator, index: number, color: string, title: string) {
    const firstResistance = indicatorPlot.line(indicator.mapAs({'value': index}));
    firstResistance.stroke(color);
    firstResistance.name(title);
  }

  private initLineTypes() {
    this.initSecondLineTypes();
    this.initThirdLineTypes();
    this.initFourthLineTypes();
  }

  private initSecondLineTypes() {
    this.secondLineTypes
      .add('CAMARILLA_PIVOT_POINTS')
      .add('FIBONACCI_PIVOT_POINTS')
      .add('FLOOR_PIVOT_POINTS')
      .add('WOODIE_PIVOT_POINTS');
  }

  private initThirdLineTypes() {
    this.thirdLineTypes
      .add('CAMARILLA_PIVOT_POINTS')
      .add('FIBONACCI_PIVOT_POINTS')
      .add('FLOOR_PIVOT_POINTS');
  }

  private initFourthLineTypes() {
    this.fourthLineTypes.add('CAMARILLA_PIVOT_POINTS');
  }

}
