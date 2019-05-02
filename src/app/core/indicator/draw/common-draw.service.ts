import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CommonDrawService {

  prepareDefaultIndicatorData(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => indicatorData.push(
      [
        indicatorResult.time,
        indicatorResult.indicatorValue == null ? null : this.convertValue(indicatorResult.indicatorValue)
      ]
    ));
    return indicatorData;
  }

  clearPlot(chart: any, plotNumber: number) {
    const plot = chart.plot(plotNumber);
    plot.removeAllSeries();
    this.removeAnnotations(plot);
  }

  configureColumns(computedLine, title) {
    computedLine.name(title);
    computedLine.risingFill('#3ba158');
    computedLine.risingStroke('#3ba158');
    computedLine.fallingFill('#fa0f16');
    computedLine.fallingStroke('#fa0f16');
  }

  addHorizontalLine(indicatorPlot, lineValue: number) {
    const controller = indicatorPlot.annotations();
    const line = controller.horizontalLine({
      valueAnchor: lineValue
    });
    line.allowEdit(false);
  }

  removeAnnotations(indicatorPlot) {
    indicatorPlot.annotations().removeAllAnnotations();
  }

  configureDateTimeFormat(indicatorPlot) {
    indicatorPlot.legend().titleFormat(
      "{%value}{dateTimeFormat: HH:mm dd MMM yyyy}"
    );
  }

  convertValue(indicatorValue) {
    return Number.parseFloat(indicatorValue).toFixed(10);
  }

  prepareDataForIndicatorWithSignalLine(result: any[]) {
    const indicatorData = [];
    result.forEach(indicatorResult => {
      indicatorData.push(
        [
          indicatorResult.time,
          this.convertValue(indicatorResult.indicatorValue),
          this.convertValue(indicatorResult.signalLineValue)
        ]
      )
    });
    return indicatorData;
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

}
