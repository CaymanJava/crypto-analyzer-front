import { ElementRef, Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "./indicator.model";
import { IndicatorDrawProviderService } from "./indicator-draw-provider.service";

@Injectable({
  providedIn: "root"
})
export class IndicatorDrawService {

  constructor(private drawServiceProvider: IndicatorDrawProviderService) {
  }

  draw(settings: IndicatorSettings, result: any[], chart: any, container: ElementRef,
       currentPlotNumber: number, pixels: number = 150, requestedPlotNumber?: number): IndicatorDrawResult {
    const drawResult: IndicatorDrawResult = this.drawServiceProvider.getDrawService(settings)
      .draw(settings, result, chart, currentPlotNumber, [], pixels, requestedPlotNumber);
    if (drawResult.plotNumber > 0) {
      this.increaseChartHeight(container, pixels);
    }
    return drawResult;
  }

  update(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number,
         pixels: number = 150, requestedPlotNumber?: number): IndicatorDrawResult {
    return this.drawServiceProvider.getDrawService(settings)
      .update(settings, result, chart, plotNumber, [], pixels, requestedPlotNumber);
  }

  deleteNonZeroPlotChart(chart: any, container: ElementRef, plotNumber: number, pixels: number = 150) {
    chart.plot(plotNumber).dispose();
    this.decreaseChartHeight(container, pixels);
  }

  private increaseChartHeight(container: ElementRef, pixels: number) {
    const pixelSize = pixels === null ? 150 : pixels;
    container.nativeElement.style.height = +container.nativeElement.style.height.replace('px', '') + pixelSize + 'px';
  }

  private decreaseChartHeight(container: ElementRef, pixels: number) {
    const pixelSize = pixels === null ? 150 : pixels;
    container.nativeElement.style.height = +container.nativeElement.style.height.replace('px', '') - pixelSize + 'px';
  }

}
