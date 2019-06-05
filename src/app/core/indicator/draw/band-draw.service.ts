import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

export abstract class BandDrawService extends CommonDrawService {

  abstract getName(): string;

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    const indicator = this.prepareData(result);
    this.preparePlot(settings.drawConfiguration, chart, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, 0);
  }

  private preparePlot(drawConfiguration: any, chart: any, indicator) {
    const indicatorPlot = chart.plot(0);
    this.configureArea(drawConfiguration, indicatorPlot, indicator);
    this.configureMiddleBand(drawConfiguration, indicatorPlot, indicator);
  }

  private configureArea(drawConfiguration, indicatorPlot, indicator) {
    const series = indicatorPlot.rangeArea(indicator.mapAs({low: 3, high: 1}));
    series.name(this.getName());
    series.normal().fill(drawConfiguration.channelColor, 0.3);
    series.normal().lowStroke(drawConfiguration.bottomBandColor, 1.2, '10 5', 'round');
    series.normal().highStroke(drawConfiguration.topBandColor, 1.2, '10 5', 'round');
  }

  private prepareData(result: any[]) {
    const indicatorData = super.prepareBandData(result);
    const table = AnyChart.data.table();
    table.addData(indicatorData);
    return table;
  }

  private configureMiddleBand(drawConfiguration, indicatorPlot, indicator) {
    const middleBand = indicatorPlot.line(indicator.mapAs({'value': 2}));
    middleBand.stroke(drawConfiguration.middleBandColor);
    middleBand.name('Middle');
  }

}
