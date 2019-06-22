import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";

export interface DrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult;

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult;

  prepareTitle(settings: IndicatorSettings);

}

export abstract class CommonDrawService implements DrawService {

  abstract draw(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult;

  abstract update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult;

  abstract prepareTitle(settings: IndicatorSettings);

  prepareSimpleIndicatorData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        this.convertValue(indicatorResult.indicatorValue)
      ]
    ));
    return indicatorData;
  }

  prepareBarChartData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        this.convertValue(indicatorResult.barChartValue)
      ]
    ));
    return indicatorData;
  }

  clearPlot(chart: any, plotNumber: number) {
    const plot = chart.plot(plotNumber);
    plot.removeAllSeries();
    this.removeAnnotations(plot);
  }

  addHorizontalLines(horizontalLines: number[], indicatorPlot) {
    if (horizontalLines != null) {
      horizontalLines.forEach(line => this.addHorizontalLine(indicatorPlot, line));
    }
  }

  configureDateTimeFormat(indicatorPlot) {
    indicatorPlot.legend().titleFormat(
      "{%value}{dateTimeFormat: HH:mm dd MMM yyyy}"
    );
  }

  convertValue(indicatorValue) {
    return Number.parseFloat(indicatorValue).toFixed(10);
  }

  prepareBandData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        indicatorResult.upperBand,
        indicatorResult.middleBand,
        indicatorResult.lowerBand
      ]
    ));
    return indicatorData;
  }

  private addHorizontalLine(indicatorPlot, lineValue: number) {
    const controller = indicatorPlot.annotations();
    const line = controller.horizontalLine({
      valueAnchor: lineValue
    });
    line.allowEdit(false);
  }

  private removeAnnotations(indicatorPlot) {
    indicatorPlot.annotations().removeAllAnnotations();
  }

}
