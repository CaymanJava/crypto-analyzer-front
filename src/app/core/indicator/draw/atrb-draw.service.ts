import { Injectable } from "@angular/core";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { BandDrawService } from "./band-draw.service";

@Injectable({
  providedIn: "root"
})
export class AtrbDrawService extends BandDrawService {

  getTopBandColor(drawConfiguration): string {
    return drawConfiguration.atrBandsTopColor;
  }

  getMiddleBandColor(drawConfiguration): string {
    return drawConfiguration.atrBandsMiddleColor;
  }

  getBottomBandColor(drawConfiguration): string {
    return drawConfiguration.atrBandsBottomColor;
  }

  getChannelBandColor(drawConfiguration): string {
    return drawConfiguration.atrBandsChannelColor;
  }

  getName(): string {
    return "ATRB";
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
      settings.configuration.shift + ', ' +
      settings.configuration.priceType + ')';
  }

}
