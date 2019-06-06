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
import { CfoDrawService } from "./draw/cfo-draw.service";
import { ChopDrawService } from "./draw/chop-draw.service";
import { CmfDrawService } from "./draw/cmf-draw.service";
import { CmoDrawService } from "./draw/cmo-draw.service";
import { CoDrawService } from "./draw/co-draw.service";
import { CogDrawService } from "./draw/cog-draw.service";
import { DcDrawService } from "./draw/dc-draw.service";
import { DiDrawService } from "./draw/di-draw.service";
import { DpoDrawService } from "./draw/dpo-draw.service";
import { EfiDrawService } from "./draw/efi-draw.service";
import { EftDrawService } from "./draw/eft-draw.service";
import { EisDrawService } from "./draw/eis-draw.service";
import { EnvDrawService } from "./draw/env-draw.service";
import { EomDrawService } from "./draw/eom-draw.service";
import { EriDrawService } from "./draw/eri-draw.service";
import { FractalDrawService } from "./draw/fractal-draw.service";
import { GapoDrawService } from "./draw/gapo-draw.service";

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
              private ceDrawService: CeDrawService,
              private cfoDrawService: CfoDrawService,
              private chopDrawService: ChopDrawService,
              private cmfDrawService: CmfDrawService,
              private cmoDrawService: CmoDrawService,
              private coDrawService: CoDrawService,
              private cogDrawService: CogDrawService,
              private dcDrawService: DcDrawService,
              private diDrawService: DiDrawService,
              private dpoDrawService: DpoDrawService,
              private efiDrawService: EfiDrawService,
              private eftDrawService: EftDrawService,
              private eisDrawService: EisDrawService,
              private envDrawService: EnvDrawService,
              private eomDrawService: EomDrawService,
              private eriDrawService: EriDrawService,
              private fractalDrawService: FractalDrawService,
              private gapoDrawService: GapoDrawService) {
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
      case 'CFO':
        this.increaseChartHeight(container);
        return this.cfoDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'CHOP':
        this.increaseChartHeight(container);
        return this.chopDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'CMF':
        this.increaseChartHeight(container);
        return this.cmfDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'CMO':
        this.increaseChartHeight(container);
        return this.cmoDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'CO':
        this.increaseChartHeight(container);
        return this.coDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'COG':
        this.increaseChartHeight(container);
        return this.cogDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'DC':
        return this.dcDrawService.draw(settings, result, chart);
      case 'DI':
        this.increaseChartHeight(container);
        return this.diDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'DPO':
        this.increaseChartHeight(container);
        return this.dpoDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'EFI':
        this.increaseChartHeight(container);
        return this.efiDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'EFT':
        this.increaseChartHeight(container);
        return this.eftDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'EIS':
        this.increaseChartHeight(container);
        return this.eisDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'ENV':
        return this.envDrawService.draw(settings, result, chart);
      case 'EOM':
        this.increaseChartHeight(container);
        return this.eomDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'ERI':
        this.increaseChartHeight(container);
        return this.eriDrawService.draw(settings, result, chart, currentPlotNumber);
      case 'FRACTAL':
        return this.fractalDrawService.draw(settings, result, chart);
      case 'GAPO':
        this.increaseChartHeight(container);
        return this.gapoDrawService.draw(settings, result, chart, currentPlotNumber);
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
      case 'ATR':
        return this.atrDrawService.update(settings, result, chart, plotNumber);
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
      case 'CFO':
        return this.cfoDrawService.update(settings, result, chart, plotNumber);
      case 'CHOP':
        return this.chopDrawService.update(settings, result, chart, plotNumber);
      case 'CMF':
        return this.cmfDrawService.update(settings, result, chart, plotNumber);
      case 'CMO':
        return this.cmoDrawService.update(settings, result, chart, plotNumber);
      case 'CO':
        return this.coDrawService.update(settings, result, chart, plotNumber);
      case 'COG':
        return this.cogDrawService.update(settings, result, chart, plotNumber);
      case 'DC':
        return this.dcDrawService.update(settings, result, chart);
      case 'DI':
        return this.diDrawService.update(settings, result, chart, plotNumber);
      case 'DPO':
        return this.dpoDrawService.update(settings, result, chart, plotNumber);
      case 'EFI':
        return this.efiDrawService.update(settings, result, chart, plotNumber);
      case 'EFT':
        return this.eftDrawService.update(settings, result, chart, plotNumber);
      case 'EIS':
        return this.eisDrawService.update(settings, result, chart, plotNumber);
      case 'ENV':
        return this.envDrawService.update(settings, result, chart);
      case 'EOM':
        return this.eomDrawService.update(settings, result, chart, plotNumber);
      case 'ERI':
        return this.eriDrawService.update(settings, result, chart, plotNumber);
      case 'FRACTAL':
        return this.fractalDrawService.update(settings, result, chart);
      case 'GAPO':
        return this.gapoDrawService.update(settings, result, chart, plotNumber);
    }
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
