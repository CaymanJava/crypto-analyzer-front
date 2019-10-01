import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../../shared/validators/not-decimal-validator";
import { ArraySizeValidator } from "../../../../shared/validators/array-size-validator";
import { BaseStrategyConfigComponent } from "../../../../shared/components/strategy/base/base-strategy-config.component";

@Component({
  selector: 'app-rsi-eis-ma-config',
  templateUrl: './rsi-eis-ma-config.component.html'
})
export class RsiEisMaConfigComponent extends BaseStrategyConfigComponent {

  constructor(private modal: NgbActiveModal,
              private fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'rsiMaType': ['', Validators.required],
      'rsiPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'rsiSignalLine': ['', [Validators.required, Validators.min(1)]],
      'eisMaPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'eisMaType': ['', Validators.required],
      'eisMaPriceType': ['', Validators.required],
      'eisMacdMaType': ['', Validators.required],
      'eisMacdPriceType': ['', Validators.required],
      'eisMacdFastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'eisMacdSlowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'eisMacdSignalPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'fastMaType': ['', Validators.required],
      'fastMaPriceType': ['', Validators.required],
      'fastMaPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'slowMaType': ['', Validators.required],
      'slowMaPriceType': ['', Validators.required],
      'slowMaPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'positions': ['', [Validators.required, ArraySizeValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'rsiLineColor': ['', Validators.required],
      'rsiOversold': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'rsiOverbought': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'fastMaLineColor': ['', Validators.required],
      'slowMaLineColor': ['', Validators.required],
      'entryLongColor': ['', Validators.required],
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
        rsiMaType: this.configForm.get('rsiMaType').value,
        rsiPeriod: this.configForm.get('rsiPeriod').value,
        rsiSignalLine: this.configForm.get('rsiSignalLine').value,
        eisMaPeriod: this.configForm.get('eisMaPeriod').value,
        eisMaType: this.configForm.get('eisMaType').value,
        eisMaPriceType: this.configForm.get('eisMaPriceType').value,
        eisMacdMaType: this.configForm.get('eisMacdMaType').value,
        eisMacdPriceType: this.configForm.get('eisMacdPriceType').value,
        eisMacdFastPeriod: this.configForm.get('eisMacdFastPeriod').value,
        eisMacdSlowPeriod: this.configForm.get('eisMacdSlowPeriod').value,
        eisMacdSignalPeriod: this.configForm.get('eisMacdSignalPeriod').value,
        fastMaType: this.configForm.get('fastMaType').value,
        fastMaPriceType: this.configForm.get('fastMaPriceType').value,
        fastMaPeriod: this.configForm.get('fastMaPeriod').value,
        slowMaType: this.configForm.get('slowMaType').value,
        slowMaPriceType: this.configForm.get('slowMaPriceType').value,
        slowMaPeriod: this.configForm.get('slowMaPeriod').value,
        positions: this.configForm.get('positions').value
      },
      drawConfiguration: {
        rsiDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('rsiLineColor').value,
          overbought: this.drawConfigForm.get('rsiOversold').value,
          oversold: this.drawConfigForm.get('rsiOverbought').value
        },
        fastMaDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('fastMaLineColor').value
        },
        slowMaDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('slowMaLineColor').value
        },
        signalConfiguration: {
          entryLongColor: this.drawConfigForm.get('entryLongColor').value,
          entryShortColor: this.drawConfigForm.get('entryShortColor').value,
          signalMarkerSize: this.drawConfigForm.get('signalMarkerSize').value,
          buyMarker: this.drawConfigForm.get('buyMarker').value,
          sellMarker: this.drawConfigForm.get('sellMarker').value
        }
      }
    });
  }

  fillConfiguration() {
    this.configForm.setValue({
      rsiMaType: this.configuration.rsiMaType,
      rsiPeriod: this.configuration.rsiPeriod,
      rsiSignalLine: this.configuration.rsiSignalLine,
      eisMaPeriod: this.configuration.eisMaPeriod,
      eisMaType: this.configuration.eisMaType,
      eisMaPriceType: this.configuration.eisMaPriceType,
      eisMacdMaType: this.configuration.eisMacdMaType,
      eisMacdPriceType: this.configuration.eisMacdPriceType,
      eisMacdFastPeriod: this.configuration.eisMacdFastPeriod,
      eisMacdSlowPeriod: this.configuration.eisMacdSlowPeriod,
      eisMacdSignalPeriod: this.configuration.eisMacdSignalPeriod,
      fastMaType: this.configuration.fastMaType,
      fastMaPriceType: this.configuration.fastMaPriceType,
      fastMaPeriod: this.configuration.fastMaPeriod,
      slowMaType: this.configuration.slowMaType,
      slowMaPriceType: this.configuration.slowMaPriceType,
      slowMaPeriod: this.configuration.slowMaPeriod,
      positions: this.configuration.positions
    });

    this.drawConfigForm.setValue({
      rsiLineColor: this.drawConfiguration.rsiDrawConfiguration.indicatorLineColor,
      rsiOversold: this.drawConfiguration.rsiDrawConfiguration.oversold,
      rsiOverbought: this.drawConfiguration.rsiDrawConfiguration.overbought,
      fastMaLineColor: this.drawConfiguration.fastMaDrawConfiguration.indicatorLineColor,
      slowMaLineColor: this.drawConfiguration.slowMaDrawConfiguration.indicatorLineColor,
      entryLongColor: this.drawConfiguration.signalConfiguration.entryLongColor,
      entryShortColor: this.drawConfiguration.signalConfiguration.entryShortColor,
      signalMarkerSize: this.drawConfiguration.signalConfiguration.signalMarkerSize,
      buyMarker: this.drawConfiguration.signalConfiguration.buyMarker,
      sellMarker: this.drawConfiguration.signalConfiguration.sellMarker,
    });
  }

}
