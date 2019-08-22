import { Component } from '@angular/core';
import { BaseStrategyConfigComponent } from "../../base-strategy-config.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../../shared/validators/not-decimal-validator";
import { ArraySizeValidator } from "../../../../shared/validators/array-size-validator";

@Component({
  selector: 'app-cci-rsi-atr-config',
  templateUrl: './cci-rsi-atr-config.component.html'
})
export class CciRsiAtrConfigComponent extends BaseStrategyConfigComponent {

  constructor(private modal: NgbActiveModal,
              private fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'cciPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'cciSignalLine': ['', [Validators.required]],
      'rsiMaType': ['', Validators.required],
      'rsiPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'rsiSignalLine': ['', [Validators.required]],
      'atrPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'atrMaType': ['', Validators.required],
      'atrMaPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'positions': ['', [Validators.required, ArraySizeValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'cciOverbought': ['', [Validators.required, Validators.min(0)]],
      'cciOversold': ['', [Validators.required, Validators.max(0)]],
      'cciLineColor': ['', Validators.required],
      'rsiOverbought': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'rsiOversold': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'rsiLineColor': ['', Validators.required],
      'atrLineColor': ['', Validators.required],
      'atrSignalLineColor': ['', Validators.required],
      'entryLongColor': ['', Validators.required],
      'entryShortColor': ['', Validators.required],
      'signalMarkerSize': ['', [Validators.required, Validators.min(1)]],
      'buyMarker': ['', Validators.required],
      'sellMarker': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      strategyConfiguration: {
        cciPeriod: this.configForm.get('cciPeriod').value,
        cciSignalLine: this.configForm.get('cciSignalLine').value,
        rsiMaType: this.configForm.get('rsiMaType').value,
        rsiPeriod: this.configForm.get('rsiPeriod').value,
        rsiSignalLine: this.configForm.get('rsiSignalLine').value,
        atrPeriod: this.configForm.get('atrPeriod').value,
        atrMaType: this.configForm.get('atrMaType').value,
        atrMaPeriod: this.configForm.get('atrMaPeriod').value,
        positions: this.configForm.get('positions').value
      },
      drawConfiguration: {
        cciDrawConfiguration: {
          overbought: this.drawConfigForm.get('cciOverbought').value,
          oversold: this.drawConfigForm.get('cciOversold').value,
          indicatorLineColor: this.drawConfigForm.get('cciLineColor').value
        },
        rsiDrawConfiguration: {
          overbought: this.drawConfigForm.get('rsiOverbought').value,
          oversold: this.drawConfigForm.get('rsiOversold').value,
          indicatorLineColor: this.drawConfigForm.get('rsiLineColor').value
        },
        atrDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('atrLineColor').value,
          signalLineColor: this.drawConfigForm.get('atrSignalLineColor').value
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
      cciPeriod: this.configuration.cciPeriod,
      cciSignalLine: this.configuration.cciSignalLine,
      rsiMaType: this.configuration.rsiMaType,
      rsiPeriod: this.configuration.rsiPeriod,
      rsiSignalLine: this.configuration.rsiSignalLine,
      atrPeriod: this.configuration.atrPeriod,
      atrMaType: this.configuration.atrMaType,
      atrMaPeriod: this.configuration.atrMaPeriod,
      positions: this.configuration.positions
    });

    this.drawConfigForm.setValue({
      cciOverbought: this.drawConfiguration.cciDrawConfiguration.overbought,
      cciOversold: this.drawConfiguration.cciDrawConfiguration.oversold,
      cciLineColor: this.drawConfiguration.cciDrawConfiguration.indicatorLineColor,
      rsiOverbought: this.drawConfiguration.rsiDrawConfiguration.overbought,
      rsiOversold: this.drawConfiguration.rsiDrawConfiguration.oversold,
      rsiLineColor: this.drawConfiguration.rsiDrawConfiguration.indicatorLineColor,
      atrLineColor: this.drawConfiguration.atrDrawConfiguration.indicatorLineColor,
      atrSignalLineColor: this.drawConfiguration.atrDrawConfiguration.signalLineColor,
      entryLongColor: this.drawConfiguration.signalConfiguration.entryLongColor,
      entryShortColor: this.drawConfiguration.signalConfiguration.entryShortColor,
      signalMarkerSize: this.drawConfiguration.signalConfiguration.signalMarkerSize,
      buyMarker: this.drawConfiguration.signalConfiguration.buyMarker,
      sellMarker: this.drawConfiguration.signalConfiguration.sellMarker,
    });
  }

}
