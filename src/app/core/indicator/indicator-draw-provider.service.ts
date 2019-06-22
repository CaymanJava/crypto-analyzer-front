import { Injectable } from "@angular/core";
import { AcDrawService } from "./draw/ac-draw.service";
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
import { HaDrawService } from "./draw/ha-draw.service";
import { HlbDrawService } from "./draw/hlb-draw.service";
import { HvDrawService } from "./draw/hv-draw.service";
import { IcDrawService } from "./draw/ic-draw.service";
import { ImiDrawService } from "./draw/imi-draw.service";
import { KeltDrawService } from "./draw/kelt-draw.service";
import { KstDrawService } from "./draw/kst-draw.service";
import { KvoDrawService } from "./draw/kvo-draw.service";
import { LrDrawService } from "./draw/lr-draw.service";
import { MaDrawService } from "./draw/ma-draw.service";
import { MacdDrawService } from "./draw/macd-draw.service";
import { MfiDrawService } from "./draw/mfi-draw.service";
import { MiDrawService } from "./draw/mi-draw.service";
import { ObvDrawService } from "./draw/obv-draw.service";
import { PgoDrawService } from "./draw/pgo-draw.service";
import { IndicatorSettings } from "./indicator.model";
import { DrawService } from "./draw/common-draw.service";
import { PivotDrawService } from "./draw/pivot-draw.service";
import { PmoDrawService } from "./draw/pmo-draw.service";
import { PpoDrawService } from "./draw/ppo-draw.service";

@Injectable({
  providedIn: "root"
})
export class IndicatorDrawProviderService {

  constructor(private adoDrawService: AcDrawService, private adlDrawService: AdlDrawService,
              private adxDrawService: AdxDrawService, private alligatorDrawService: AlligatorDrawService,
              private aoDrawService: AoDrawService, private atrDrawService: AtrDrawService,
              private aroonDrawService: AroonDrawService, private aroonOscDrawService: AroonOscDrawService,
              private asiDrawService: AsiDrawService, private atrbDrawService: AtrbDrawService,
              private bbDrawService: BbDrawService, private bbwDrawService: BbwDrawService,
              private ccDrawService: CcDrawService, private cciDrawService: CciDrawService,
              private ceDrawService: CeDrawService, private cfoDrawService: CfoDrawService,
              private chopDrawService: ChopDrawService, private cmfDrawService: CmfDrawService,
              private cmoDrawService: CmoDrawService, private coDrawService: CoDrawService,
              private cogDrawService: CogDrawService, private dcDrawService: DcDrawService,
              private diDrawService: DiDrawService, private dpoDrawService: DpoDrawService,
              private efiDrawService: EfiDrawService, private eftDrawService: EftDrawService,
              private eisDrawService: EisDrawService, private envDrawService: EnvDrawService,
              private eomDrawService: EomDrawService, private eriDrawService: EriDrawService,
              private fractalDrawService: FractalDrawService, private gapoDrawService: GapoDrawService,
              private haDrawService: HaDrawService, private hlbDrawService: HlbDrawService,
              private hvDrawService: HvDrawService, private icDrawService: IcDrawService,
              private imiDrawService: ImiDrawService, private keltDrawService: KeltDrawService,
              private kstDrawService: KstDrawService, private kvoDrawService: KvoDrawService,
              private lrDrawService: LrDrawService, private maDrawService: MaDrawService,
              private macdDrawService: MacdDrawService, private mfiDrawService: MfiDrawService,
              private miDrawService: MiDrawService, private obvDrawService: ObvDrawService,
              private pgoDrawService: PgoDrawService, private pivotDrawService: PivotDrawService,
              private pmoDrawService: PmoDrawService, private ppoDrawService: PpoDrawService) {
  }

  getDrawService(settings: IndicatorSettings): DrawService {
    switch (settings.indicatorItem.title) {
      case 'AC':
        return this.adoDrawService;
      case 'ADL':
        return this.adlDrawService;
      case 'ADX':
        return this.adxDrawService;
      case 'ALLIGATOR':
        return this.alligatorDrawService;
      case 'AO':
        return this.aoDrawService;
      case 'AROON':
        return this.aroonDrawService;
      case 'AROON OSC':
        return this.aroonOscDrawService;
      case 'ASI':
        return this.asiDrawService;
      case 'ATR':
        return this.atrDrawService;
      case 'ATRB':
        return this.atrbDrawService;
      case 'BB':
        return this.bbDrawService;
      case 'BBW':
        return this.bbwDrawService;
      case 'CC':
        return this.ccDrawService;
      case 'CCI':
        return this.cciDrawService;
      case 'CE':
        return this.ceDrawService;
      case 'CFO':
        return this.cfoDrawService;
      case 'CHOP':
        return this.chopDrawService;
      case 'CMF':
        return this.cmfDrawService;
      case 'CMO':
        return this.cmoDrawService;
      case 'CO':
        return this.coDrawService;
      case 'COG':
        return this.cogDrawService;
      case 'DC':
        return this.dcDrawService;
      case 'DI':
        return this.diDrawService;
      case 'DPO':
        return this.dpoDrawService;
      case 'EFI':
        return this.efiDrawService;
      case 'EFT':
        return this.eftDrawService;
      case 'EIS':
        return this.eisDrawService;
      case 'ENV':
        return this.envDrawService;
      case 'EOM':
        return this.eomDrawService;
      case 'ERI':
        return this.eriDrawService;
      case 'FRACTAL':
        return this.fractalDrawService;
      case 'GAPO':
        return this.gapoDrawService;
      case 'HA':
        return this.haDrawService;
      case 'HLB':
        return this.hlbDrawService;
      case 'HV':
        return this.hvDrawService;
      case 'IC':
        return this.icDrawService;
      case 'IMI':
        return this.imiDrawService;
      case 'KELT':
        return this.keltDrawService;
      case 'KST':
        return this.kstDrawService;
      case 'KVO':
        return this.kvoDrawService;
      case 'LR':
        return this.lrDrawService;
      case 'MA':
        return this.maDrawService;
      case 'MACD':
        return this.macdDrawService;
      case 'MFI':
        return this.mfiDrawService;
      case 'MI':
        return this.miDrawService;
      case 'OBV':
        return this.obvDrawService;
      case 'PGO':
        return this.pgoDrawService;
      case 'PIVOT':
        return this.pivotDrawService;
      case 'PMO':
        return this.pmoDrawService;
      case 'PPO':
        return this.ppoDrawService;
    }
  }

}
