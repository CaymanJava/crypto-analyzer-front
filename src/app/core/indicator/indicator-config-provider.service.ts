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

@Injectable()
export class IndicatorConfigProviderService {

  dialogConfig: any = {backdrop: 'static', keyboard: false, size: 'md'};
  indicatorSettingSubject: Subject<IndicatorSettings> = new Subject();

  constructor(private modalService: NgbModal) {
  }

  open(indicatorItem: IndicatorItem, update: boolean, configuration?: any) {
    switch (indicatorItem.title) {
      case 'AC':
        this.openModal(AccelerationDecelerationOscillatorComponent, indicatorItem, true, update, configuration);
        break;
      case 'ADL':
        this.indicatorSettingSubject.next(new IndicatorSettings(indicatorItem, {}, false, update));
        break;
      case 'ADX':
        this.openModal(AverageDirectionalMovementIndexComponent, indicatorItem, true, update, configuration);
        break;
      case 'ALLIGATOR':
        this.openModal(AlligatorComponent, indicatorItem, true, update, configuration);
        break;
      case 'AO':
        this.openModal(AwesomeOscillatorComponent, indicatorItem, true, update, configuration);
        break;
      case 'AROON':
      case 'AROON OSC':
        this.openModal(AroonComponent, indicatorItem, true, update, configuration);
        break;
      case 'ASI':
        this.openModal(AccumulativeSwingIndexComponent, indicatorItem, true, update, configuration);
        break;
      case 'ATR':
        this.openModal(AverageTrueRangeComponent, indicatorItem, true, update, configuration);
        break;
      case 'ATRB':
        this.openModal(AverageTrueRangeBandsComponent, indicatorItem, true, update, configuration);
        break;
      case 'BB':
        this.openModal(BollingerBandsComponent, indicatorItem, true, update, configuration);
        break;
    }
  }

  private openModal(content: any, indicatorItem: IndicatorItem, updatable: boolean, update: boolean, configuration?: any) {
    const dialog = this.modalService.open(content, this.dialogConfig);
    dialog.componentInstance.name = indicatorItem.label;
    dialog.componentInstance.configuration = configuration;
    dialog.componentInstance.update = update;
    dialog.result.then((result) => {
      if (result != 'close') {
        this.indicatorSettingSubject.next(new IndicatorSettings(indicatorItem, result, updatable, update));
      }
    });
  }

}
