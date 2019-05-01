import { ElementRef, Injectable } from "@angular/core";
import { AcDrawService } from "./draw/ac-draw.service";
import { IndicatorDrawResult, IndicatorSettings } from "./indicator.model";
import { AdlDrawService } from "./draw/adl-draw.service";
import { AdxDrawService } from "./draw/adx-draw.service";
import { AlligatorDrawService } from "./draw/alligator-draw.service";
import { AoDrawService } from "./draw/ao-draw.service";
import { AtrDrawService } from "./draw/atr-draw.service";
import { AroonDrawService } from "./draw/aroon-draw.service";
import { AroonOscDrawService } from "./draw/aroon-osc-draw.service";
import { AsiDrawService } from "./draw/asi-draw.service";
import { AtrbDrawService } from "./draw/atrb-draw.service";
import { BbDrawService } from "./draw/bb-draw.service";
import { BbwDrawService } from "./draw/bbw-draw.service";
import { CcDrawService } from "./draw/cc-draw.service";
import { CciDrawService } from "./draw/cci-draw.service";
import { CeDrawService } from "./draw/ce-draw.service";

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
              private bbDrawService: BbDrawService,
              private bbwDrawService: BbwDrawService,
              private ccDrawService: CcDrawService,
              private cciDrawService: CciDrawService,
              private ceDrawService: CeDrawService) {
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
      case 'BBW':
        this.increaseChartHeight(container);
        return this.bbwDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'CC':
        this.increaseChartHeight(container);
        return this.ccDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'CCI':
        this.increaseChartHeight(container);
        return this.cciDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'CE':
        return this.ceDrawService.draw(settings, result, chart);
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
      case 'BBW':
        return this.bbwDrawService.update(settings, result, chart, plotNumber);
      case 'CC':
        return this.ccDrawService.update(settings, result, chart, plotNumber);
      case 'CCI':
        return this.cciDrawService.update(settings, result, chart, plotNumber);
      case 'CE':
        return this.ceDrawService.update(settings, result, chart);
    }
  }

  private increaseChartHeight(container: ElementRef) {
    container.nativeElement.style.height = +container.nativeElement.style.height.replace('px', '') + 150 + 'px';
  }

}
