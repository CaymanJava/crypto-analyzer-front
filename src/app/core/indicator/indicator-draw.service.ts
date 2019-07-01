import { ElementRef, Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "./indicator.model";
import { IndicatorDrawProviderService } from "./indicator-draw-provider.service";

@Injectable({
  providedIn: "root"
})
export class IndicatorDrawService {

  constructor(private drawServiceProvider: IndicatorDrawProviderService) {
  }

  draw(settings: IndicatorSettings, result: any[], chart: any, container: ElementRef, currentPlotNumber: number): IndicatorDrawResult {
    const drawResult: IndicatorDrawResult = this.drawServiceProvider.getDrawService(settings).draw(settings, result, chart, currentPlotNumber);
    if (drawResult.plotNumber > 0) {
      this.increaseChartHeight(container);
    }
    return drawResult;
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    return this.drawServiceProvider.getDrawService(settings).update(settings, result, chart, plotNumber);
  }

  deleteNonZeroPlotChart(chart: any, container: ElementRef, plotNumber: number) {
    chart.plot(plotNumber).dispose();
    this.decreaseChartHeight(container);
  }

  private increaseChartHeight(container: ElementRef) {
    container.nativeElement.style.height = +container.nativeElement.style.height.replace('px', '') + 150 + 'px';
  }

  private decreaseChartHeight(container: ElementRef) {
    container.nativeElement.style.height = +container.nativeElement.style.height.replace('px', '') - 150 + 'px';
  }

}
