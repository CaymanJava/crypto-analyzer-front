import { Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Injectable } from "@angular/core";
import { IndicatorItem, IndicatorSettings } from "./indicator.model";
import { IndicatorConfigProviderService } from "./indicator-config-provider.service";

@Injectable()
export class IndicatorConfigService {

  dialogConfig: any = {backdrop: 'static', keyboard: false, size: 'md'};
  indicatorSettingSubject: Subject<IndicatorSettings> = new Subject();
  indicatorRemoveSubject: Subject<string> = new Subject();

  constructor(private modalService: NgbModal,
              private configProviderService: IndicatorConfigProviderService) {
  }

  open(indicatorItem: IndicatorItem, update: boolean, configuration?: any, drawConfiguration?: any, id?: string) {
    const dialog = this.modalService.open(this.configProviderService.getIndicatorConfigService(indicatorItem.title), this.dialogConfig);
    dialog.componentInstance.name = indicatorItem.label;
    dialog.componentInstance.configuration = configuration;
    dialog.componentInstance.drawConfiguration = drawConfiguration;
    dialog.componentInstance.update = update;
    dialog.componentInstance.id = id;
    dialog.result.then((result) => {
      if (result == 'remove') {
        this.indicatorRemoveSubject.next(id);
      }

      if (result != 'close' && result != 'remove') {
        this.indicatorSettingSubject.next(new IndicatorSettings(indicatorItem, result.configuration, result.drawConfiguration, update));
      }
    });
  }

}
