import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import * as AnyChart from "anychart";

export abstract class BandDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    const indicator = this.prepareData(result);
    this.preparePlot(settings, chart, indicator);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, 0);
  }

  private preparePlot(settings: any, chart: any, indicator) {
    const indicatorPlot = chart.plot(0);
    this.configureArea(settings, indicatorPlot, indicator);
    this.configureMiddleBand(settings.drawConfiguration, indicatorPlot, indicator);
  }

  private configureArea(settings, indicatorPlot, indicator) {
    const series = indicatorPlot.rangeArea(indicator.mapAs({low: 3, high: 1}));
    series.name(settings.indicatorItem.title);
    series.normal().fill(settings.drawConfiguration.channelColor, 0.3);
    series.normal().lowStroke(settings.drawConfiguration.bottomBandColor, 1.2, '10 5', 'round');
    series.normal().highStroke(settings.drawConfiguration.topBandColor, 1.2, '10 5', 'round');
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
