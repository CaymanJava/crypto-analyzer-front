import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../../shared/validators/not-decimal-validator";
import { ArraySizeValidator } from "../../../../shared/validators/array-size-validator";
import { BaseStrategyConfigComponent } from "../../../../shared/components/strategy/base/base-strategy-config.component";

@Component({
  selector: 'app-lrsi-ma-psar-config',
  templateUrl: './lrsi-ma-psar-config.component.html'
})
export class LrsiMaPsarConfigComponent extends BaseStrategyConfigComponent {

  constructor(private modal: NgbActiveModal,
              private fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'lrsiGamma': ['', [Validators.required, Validators.min(0.0001)]],
      'lrsiOversoldLevel': ['', [Validators.required, Validators.min(0), Validators.max(1)]],
      'lrsiOverboughtLevel': ['', [Validators.required, Validators.min(0), Validators.max(1)]],
      'maType': ['', Validators.required],
      'maPriceType': ['', Validators.required],
      'maPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'psarMinAccelerationFactor': ['', [Validators.required, Validators.min(0.0001)]],
      'psarMaxAccelerationFactor': ['', [Validators.required, Validators.min(0.0001)]],
      'positions': ['', [Validators.required, ArraySizeValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'lrsiLineColor': ['', Validators.required],
      'maLineColor': ['', Validators.required],
      'psarColor': ['', Validators.required],
      'psarMarkerSize': ['', [Validators.required, Validators.min(1)]],
      'psarMarker': ['', Validators.required],
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
        lrsiGamma: this.configForm.get('lrsiGamma').value,
        lrsiOversoldLevel: this.configForm.get('lrsiOversoldLevel').value,
        lrsiOverboughtLevel: this.configForm.get('lrsiOverboughtLevel').value,
        maType: this.configForm.get('maType').value,
        maPriceType: this.configForm.get('maPriceType').value,
        maPeriod: this.configForm.get('maPeriod').value,
        psarMinAccelerationFactor: this.configForm.get('psarMinAccelerationFactor').value,
        psarMaxAccelerationFactor: this.configForm.get('psarMaxAccelerationFactor').value,
        positions: this.configForm.get('positions').value
      },
      drawConfiguration: {
        lrsiDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('lrsiLineColor').value,
          oversold: this.configForm.get('lrsiOversoldLevel').value,
          overbought: this.configForm.get('lrsiOverboughtLevel').value
        },
        maDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('maLineColor').value
        },
        psarDrawConfiguration: {
          indicatorColor: this.drawConfigForm.get('psarColor').value,
          markerSize: this.drawConfigForm.get('psarMarkerSize').value,
          marker: this.drawConfigForm.get('psarMarker').value
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
      lrsiGamma: this.configuration.lrsiGamma,
      lrsiOversoldLevel: this.configuration.lrsiOversoldLevel,
      lrsiOverboughtLevel: this.configuration.lrsiOverboughtLevel,
      maType: this.configuration.maType,
      maPriceType: this.configuration.maPriceType,
      maPeriod: this.configuration.maPeriod,
      psarMinAccelerationFactor: this.configuration.psarMinAccelerationFactor,
      psarMaxAccelerationFactor: this.configuration.psarMaxAccelerationFactor,
      positions: this.configuration.positions
    });
    this.drawConfigForm.setValue({
      lrsiLineColor: this.drawConfiguration.lrsiDrawConfiguration.indicatorLineColor,
      maLineColor: this.drawConfiguration.maDrawConfiguration.indicatorLineColor,
      psarColor: this.drawConfiguration.psarDrawConfiguration.indicatorColor,
      psarMarkerSize: this.drawConfiguration.psarDrawConfiguration.markerSize,
      psarMarker: this.drawConfiguration.psarDrawConfiguration.marker,
      entryLongColor: this.drawConfiguration.signalConfiguration.entryLongColor,
      exitShortColor: this.drawConfiguration.signalConfiguration.exitShortColor,
      exitLongColor: this.drawConfiguration.signalConfiguration.exitLongColor,
      entryShortColor: this.drawConfiguration.signalConfiguration.entryShortColor,
      signalMarkerSize: this.drawConfiguration.signalConfiguration.signalMarkerSize,
      buyMarker: this.drawConfiguration.signalConfiguration.buyMarker,
      sellMarker: this.drawConfiguration.signalConfiguration.sellMarker
    });
  }

}
