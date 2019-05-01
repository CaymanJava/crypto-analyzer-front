import { ElementRef, Injectable } from "@angular/core";
import { AcDrawService } from "./ac-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "../indicator.model";
import { AdlDrawService } from "./adl-draw.service";
import { AdxDrawService } from "./adx-draw.service";
import { AlligatorDrawService } from "./alligator-draw.service";
import { AoDrawService } from "./ao-draw.service";
import { AtrDrawService } from "./atr-draw.service";
import { AroonDrawService } from "./aroon-draw.service";
import { AroonOscDrawService } from "./aroon-osc-draw.service";
import { AsiDrawService } from "./asi-draw.service";
import { AtrbDrawService } from "./atrb-draw.service";
import { BbDrawService } from "./bb-draw.service";

@Injectable({
  providedIn: "root"
})
export class IndicatorDrawService {

  constructor(private adoDrawService: AcDrawService,
              private adlDrawService: AdlDrawService,
              private adxDrawService: AdxDrawService,
              private alligatorDrawService: AlligatorDrawService,
              private aoDrawService: AoDrawService,
              private atrDrawService: AtrDrawService,
              private aroonDrawService: AroonDrawService,
              private aroonOscDrawService: AroonOscDrawService,
              private asiDrawService: AsiDrawService,
              private atrbDrawService: AtrbDrawService,
              private bbDrawService: BbDrawService) {
  }

  draw(settings: IndicatorSettings, result: any[], chart: any, container: ElementRef, currentPlotNumber: number): IndicatorDrawResult {
    switch (settings.indicatorItem.title) {
      case 'AC':
        this.increaseChartHeight(container);
        return this.adoDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'ADL':
        this.increaseChartHeight(container);
        return this.adlDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'ADX':
        this.increaseChartHeight(container);
        return this.adxDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'ALLIGATOR':
        return this.alligatorDrawService.draw(settings, result, chart);
      case 'AO':
        this.increaseChartHeight(container);
        return this.aoDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'AROON':
        this.increaseChartHeight(container);
        return this.aroonDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'AROON OSC':
        this.increaseChartHeight(container);
        return this.aroonOscDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'ASI':
        this.increaseChartHeight(container);
        return this.asiDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'ATR':
        this.increaseChartHeight(container);
        return this.atrDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'ATRB':
        return this.atrbDrawService.draw(settings, result, chart);
      case 'BB':
        return this.bbDrawService.draw(settings, result, chart);
    }
  }

  update(settings: IndicatorSettings, result: any[], chart: any, container: ElementRef, plotNumber: number): IndicatorDrawResult {
    switch (settings.indicatorItem.title) {
      case 'AC':
        return this.adoDrawService.update(settings, result, chart, plotNumber);
      case 'ADL':
        return this.adlDrawService.update(settings, result, chart, plotNumber);
      case 'ADX':
        return this.adxDrawService.update(settings, result, chart, plotNumber);
      case 'ALLIGATOR':
        return this.alligatorDrawService.update(settings, result, chart);
      case 'AO':
        return this.aoDrawService.update(settings, result, chart, plotNumber);
      case 'AROON':
        return this.aroonDrawService.update(settings, result, chart, plotNumber);
      case 'AROON OSC':
        return this.aroonOscDrawService.update(settings, result, chart, plotNumber);
      case 'ASI':
        return this.asiDrawService.update(settings, result, chart, plotNumber);
      case 'ATRB':
        return this.atrbDrawService.update(settings, result, chart);
      case 'BB':
        return this.bbDrawService.update(settings, result, chart);
    }
  }

  private increaseChartHeight(container: ElementRef) {
    container.nativeElement.style.height = +container.nativeElement.style.height.replace('px', '') + 150 + 'px';
  }

}
