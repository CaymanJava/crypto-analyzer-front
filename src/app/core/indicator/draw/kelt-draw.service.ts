import { Injectable } from "@angular/core";
import { BandDrawService } from "./band-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";

@Injectable({
  providedIn: "root"
})
export class KeltDrawService extends BandDrawService {

  draw(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return super.draw(settings, result, chart);
  }

  update(settings: IndicatorSettings, result: any[], chart: any): IndicatorDrawResult {
    return super.draw(settings, result, chart);
  }

  prepareTitle(settings: IndicatorSettings) {
    return settings.indicatorItem.title + '(' +
      settings.configuration.movingAveragePeriod + ',' +
      settings.configuration.averageTrueRangePeriod + ',' +
      settings.configuration.averageTrueRangeShift + ')';
  }

}
