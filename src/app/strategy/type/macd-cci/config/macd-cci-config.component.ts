import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../../shared/validators/not-decimal-validator";
import { ArraySizeValidator } from "../../../../shared/validators/array-size-validator";
import { BaseStrategyConfigComponent } from "../../../../shared/components/strategy/base/base-strategy-config.component";

@Component({
  selector: 'app-macd-cci-config',
  templateUrl: './macd-cci-config.component.html'
})
export class MacdCciConfigComponent extends BaseStrategyConfigComponent {

  constructor(private modal: NgbActiveModal,
              private fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'macdMaType': ['', Validators.required],
      'macdPriceType': ['', Validators.required],
      'macdFastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'macdSlowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'macdSignalPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'cciPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'cciOversoldLevel': ['', [Validators.required, Validators.max(0)]],
      'cciOverboughtLevel': ['', [Validators.required, Validators.min(0)]],
      'positions': ['', [Validators.required, ArraySizeValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'macdLineColor': ['', Validators.required],
      'macdSignalLineColor': ['', Validators.required],
      'macdBarChartLineColor': ['', Validators.required],
      'cciLineColor': ['', Validators.required],
      'entryLongColor': ['', Validators.required],
      'exitShortColor': ['', Validators.required],
      'exitLongColor': ['', Validators.required],
      'entryShortColor': ['', Validators.required],
      'signalMarkerSize': ['', [Validators.required, Validators.min(1)]],
      'buyMarker': ['', Validators.required],
      'sellMarker': ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      strategyConfiguration: {
        macdMaType: this.configForm.get('macdMaType').value,
        macdPriceType: this.configForm.get('macdPriceType').value,
        macdFastPeriod: this.configForm.get('macdFastPeriod').value,
        macdSlowPeriod: this.configForm.get('macdSlowPeriod').value,
        macdSignalPeriod: this.configForm.get('macdSignalPeriod').value,
        cciPeriod: this.configForm.get('cciPeriod').value,
        cciOversoldLevel: this.configForm.get('cciOversoldLevel').value,
        cciOverboughtLevel: this.configForm.get('cciOverboughtLevel').value,
        positions: this.configForm.get('positions').value
      },
      drawConfiguration: {
        macdDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('macdLineColor').value,
          signalLineColor: this.drawConfigForm.get('macdSignalLineColor').value,
          barChartColor: this.drawConfigForm.get('macdBarChartLineColor').value
        },
        cciDrawConfiguration: {
          oversold: this.configForm.get('cciOversoldLevel').value,
          overbought: this.configForm.get('cciOverboughtLevel').value,
          indicatorLineColor: this.drawConfigForm.get('cciLineColor').value
        },
        signalConfiguration: {
          entryLongColor: this.drawConfigForm.get('entryLongColor').value,
          entryShortColor: this.drawConfigForm.get('entryShortColor').value,
          exitShortColor: this.drawConfigForm.get('exitShortColor').value,
          exitLongColor: this.drawConfigForm.get('exitLongColor').value,
          signalMarkerSize: this.drawConfigForm.get('signalMarkerSize').value,
          buyMarker: this.drawConfigForm.get('buyMarker').value,
          sellMarker: this.drawConfigForm.get('sellMarker').value
        }
      }
    });
  }

  fillConfiguration() {
    this.configForm.setValue({
      macdMaType: this.configuration.macdMaType,
      macdPriceType: this.configuration.macdPriceType,
      macdFastPeriod: this.configuration.macdFastPeriod,
      macdSlowPeriod: this.configuration.macdSlowPeriod,
      macdSignalPeriod: this.configuration.macdSignalPeriod,
      cciPeriod: this.configuration.cciPeriod,
      cciOversoldLevel: this.configuration.cciOversoldLevel,
      cciOverboughtLevel: this.configuration.cciOverboughtLevel,
      positions: this.configuration.positions
    });

    this.drawConfigForm.setValue({
      macdLineColor: this.drawConfiguration.macdDrawConfiguration.indicatorLineColor,
      macdSignalLineColor: this.drawConfiguration.macdDrawConfiguration.signalLineColor,
      macdBarChartLineColor: this.drawConfiguration.macdDrawConfiguration.barChartColor,
      cciLineColor: this.drawConfiguration.cciDrawConfiguration.indicatorLineColor,
      entryLongColor: this.drawConfiguration.signalConfiguration.entryLongColor,
      exitShortColor: this.drawConfiguration.signalConfiguration.exitShortColor,
      exitLongColor: this.drawConfiguration.signalConfiguration.exitLongColor,
      entryShortColor: this.drawConfiguration.signalConfiguration.entryShortColor,
      signalMarkerSize: this.drawConfiguration.signalConfiguration.signalMarkerSize,
      buyMarker: this.drawConfiguration.signalConfiguration.buyMarker,
      sellMarker: this.drawConfiguration.signalConfiguration.sellMarker,
    });
  }

}
