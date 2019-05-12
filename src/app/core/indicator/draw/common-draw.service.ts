import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";

export abstract class CommonDrawService {

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

  clearPlot(chart: any, plotNumber: number) {
    const plot = chart.plot(plotNumber);
    plot.removeAllSeries();
    this.removeAnnotations(plot);
  }

  addHorizontalLine(indicatorPlot, lineValue: number) {
    const controller = indicatorPlot.annotations();
    const line = controller.horizontalLine({
      valueAnchor: lineValue
    });
    line.allowEdit(false);
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

  private removeAnnotations(indicatorPlot) {
    indicatorPlot.annotations().removeAllAnnotations();
  }

}
