import { Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AccelerationDecelerationOscillatorComponent } from "../../indicator/indicator-config/ado/acceleration-deceleration-oscillator.component";
import { Injectable } from "@angular/core";
import { IndicatorItem, IndicatorSettings } from "./indicator.model";
import { AverageDirectionalMovementIndexComponent } from "../../indicator/indicator-config/adx/average-directional-movement-index.component";
import { AlligatorComponent } from "../../indicator/indicator-config/alligator/alligator.component";
import { AwesomeOscillatorComponent } from "../../indicator/indicator-config/ao/awesome-oscillator.component";
import { AverageTrueRangeComponent } from "../../indicator/indicator-config/atr/average-true-range.component";
import { AroonComponent } from "../../indicator/indicator-config/aroon/aroon.component";
import { AccumulativeSwingIndexComponent } from "../../indicator/indicator-config/asi/accumulative-swing-index.component";
import { AverageTrueRangeBandsComponent } from "../../indicator/indicator-config/atrb/average-true-range-bands.component";
import { BollingerBandsComponent } from "../../indicator/indicator-config/bb/bollinger-bands.component";
import { CoppockCurveComponent } from "../../indicator/indicator-config/cc/coppock-curve.component";
import { CommodityChannelIndexComponent } from "../../indicator/indicator-config/cci/commodity-channel-index.component";
import { ChandelierExitComponent } from "../../indicator/indicator-config/ce/chandelier-exit.component";
import { ChandeForecastOscillatorComponent } from "../../indicator/indicator-config/cfo/chande-forecast-oscillator.component";
import { ChoppinessIndexComponent } from "../../indicator/indicator-config/chop/choppiness-index.component";
import { AccumulationDistributionLineComponent } from "../../indicator/indicator-config/ac/accumulation-distribution-line.component";
import { AroonOscillatorComponent } from "../../indicator/indicator-config/aroon-osc/aroon-oscillator.component";
import { BollingerBandsWidthComponent } from "../../indicator/indicator-config/bollinger-bands-width/bollinger-bands-width.component";

@Injectable()
export class IndicatorConfigProviderService {

  dialogConfig: any = {backdrop: 'static', keyboard: false, size: 'md'};
  indicatorSettingSubject: Subject<IndicatorSettings> = new Subject();

  constructor(private modalService: NgbModal) {
  }

  open(indicatorItem: IndicatorItem, update: boolean, configuration?: any, drawConfiguration?: any) {
    switch (indicatorItem.title) {
      case 'AC':
        this.openModal(AccelerationDecelerationOscillatorComponent, indicatorItem, update, configuration);
        break;
      case 'ADL':
        this.openModal(AccumulationDistributionLineComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'ADX':
        this.openModal(AverageDirectionalMovementIndexComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'ALLIGATOR':
        this.openModal(AlligatorComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'AO':
        this.openModal(AwesomeOscillatorComponent, indicatorItem, update, configuration);
        break;
      case 'AROON':
        this.openModal(AroonComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'AROON OSC':
        this.openModal(AroonOscillatorComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'ASI':
        this.openModal(AccumulativeSwingIndexComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'ATR':
        this.openModal(AverageTrueRangeComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'ATRB':
        this.openModal(AverageTrueRangeBandsComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'BB':
        this.openModal(BollingerBandsComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'BBW':
        this.openModal(BollingerBandsWidthComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'CC':
        this.openModal(CoppockCurveComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'CCI':
        this.openModal(CommodityChannelIndexComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'CE':
        this.openModal(ChandelierExitComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'CFO':
        this.openModal(ChandeForecastOscillatorComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
      case 'CHOP':
        this.openModal(ChoppinessIndexComponent, indicatorItem, update, configuration, drawConfiguration);
        break;
    }
  }

  private openModal(content: any, indicatorItem: IndicatorItem, update: boolean,
                    configuration?: any, drawConfiguration?: any) {
    const dialog = this.modalService.open(content, this.dialogConfig);
    dialog.componentInstance.name = indicatorItem.label;
    dialog.componentInstance.configuration = configuration;
    dialog.componentInstance.drawConfiguration = drawConfiguration;
    dialog.componentInstance.update = update;
    dialog.result.then((result) => {
      if (result != 'close') {
        this.indicatorSettingSubject.next(new IndicatorSettings(indicatorItem, result.configuration, result.drawConfiguration, update));
      }
    });
  }

}
