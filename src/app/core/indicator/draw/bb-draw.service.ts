import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { BandDrawService } from "./band-draw.service";

@Injectable({
  providedIn: "root"
})
export class BbDrawService extends BandDrawService {

  getTopBandColor(drawConfiguration): string {
    return drawConfiguration.bbTopColor;
  }

  getMiddleBandColor(drawConfiguration): string {
    return drawConfiguration.bbMiddleColor;
  }

  getBottomBandColor(drawConfiguration): string {
    return drawConfiguration.bbBottomColor;
  }

  getChannelBandColor(drawConfiguration): string {
    return drawConfiguration.bbChannelColor;
  }

  getName(): string {
    return "BB";
  }

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return super.draw(settings, result, chart);
  }

  update(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return super.draw(settings, result, chart);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.period + ', ' +
      settings.configuration.standardDeviationCoefficient + ', ' +
      settings.configuration.priceType + ')';
  }

}
