import { Injectable } from "@angular/core";
import { CommonDrawService } from "./common-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";

@Injectable({
  providedIn: "root"
})
export class FractalDrawService extends CommonDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawFractal(settings, result, chart, 0);
  }

  update(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return this.drawFractal(settings, result, chart, 0);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title;
  }

  private drawFractal(settings: IndicatorSettings, result: any[], chart: any, plotNumber: number): IndicatorDrawResult {
    const indicatorPlot = chart.plot(0);
    this.prepareFractals(indicatorPlot, result, settings);
    const title = this.prepareTitle(settings);
    return new IndicatorDrawResult(title, plotNumber);
  }

  private prepareFractals(indicatorPlot, result: any[], settings: IndicatorSettings) {
    const controller = indicatorPlot.annotations();
    result.forEach(indicatorResult => {
        if (indicatorResult.upFractal) {
          this.prepareUpFractal(controller, indicatorResult, settings);
        }
        if (indicatorResult.downFractal) {
          this.prepareDownFractal(controller, indicatorResult, settings);
        }
      }
    );
  }

  private prepareUpFractal(controller, indicatorResult, settings: IndicatorSettings) {
    const fractal = controller.marker();
    fractal.xAnchor(indicatorResult.time);
    fractal.valueAnchor(indicatorResult.high);
    fractal.markerType("triangle-up");
    fractal.size(8);
    fractal.offsetY(-30);
    fractal.allowEdit(false);
    fractal.normal().fill(settings.drawConfiguration.upFractalColor);
    fractal.normal().stroke(settings.drawConfiguration.upFractalColor);
  }

  private prepareDownFractal(controller, indicatorResult, settings: IndicatorSettings) {
    const fractal = controller.marker();
    fractal.xAnchor(indicatorResult.time);
    fractal.valueAnchor(indicatorResult.low);
    fractal.markerType("triangle-down");
    fractal.size(8);
    fractal.offsetY(30);
    fractal.allowEdit(false);
    fractal.normal().fill(settings.drawConfiguration.downFractalColor);
    fractal.normal().stroke(settings.drawConfiguration.downFractalColor);
  }
}
