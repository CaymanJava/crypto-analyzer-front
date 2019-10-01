import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../../shared/validators/not-decimal-validator";
import { ArraySizeValidator } from "../../../../shared/validators/array-size-validator";
import { BaseStrategyConfigComponent } from "../../../../shared/components/strategy/base/base-strategy-config.component";

@Component({
  selector: 'app-ha-macd-psar-config',
  templateUrl: './ha-macd-psar-config.component.html'
})
export class HaMacdPsarConfigComponent extends BaseStrategyConfigComponent {

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
      'psarMinAccelerationFactor': ['', [Validators.required, Validators.min(0.0001)]],
      'psarMaxAccelerationFactor': ['', [Validators.required, Validators.min(0.0001)]],
      'positions': ['', [Validators.required, ArraySizeValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'haRisingBarColor': ['', Validators.required],
      'haFallingBarColor': ['', Validators.required],
      'macdLineColor': ['', Validators.required],
      'macdSignalLineColor': ['', Validators.required],
      'macdBarChartLineColor': ['', Validators.required],
      'psarColor': ['', Validators.required],
      'psarMarkerSize': ['', [Validators.required, Validators.min(1)]],
      'psarMarker': ['', Validators.required],
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
        macdMaType: this.configForm.get('macdMaType').value,
        macdPriceType: this.configForm.get('macdPriceType').value,
        macdFastPeriod: this.configForm.get('macdFastPeriod').value,
        macdSlowPeriod: this.configForm.get('macdSlowPeriod').value,
        macdSignalPeriod: this.configForm.get('macdSignalPeriod').value,
        psarMinAccelerationFactor: this.configForm.get('psarMinAccelerationFactor').value,
        psarMaxAccelerationFactor: this.configForm.get('psarMaxAccelerationFactor').value,
        positions: this.configForm.get('positions').value
      },
      drawConfiguration: {
        haDrawConfiguration: {
          risingBarColor: this.drawConfigForm.get('haRisingBarColor').value,
          fallingBarColor: this.drawConfigForm.get('haFallingBarColor').value
        },
        macdDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('macdLineColor').value,
          signalLineColor: this.drawConfigForm.get('macdSignalLineColor').value,
          barChartColor: this.drawConfigForm.get('macdBarChartLineColor').value
        },
        psarDrawConfiguration: {
          indicatorColor: this.drawConfigForm.get('psarColor').value,
          markerSize: this.drawConfigForm.get('psarMarkerSize').value,
          marker: this.drawConfigForm.get('psarMarker').value
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
      macdMaType: this.configuration.macdMaType,
      macdPriceType: this.configuration.macdPriceType,
      macdFastPeriod: this.configuration.macdFastPeriod,
      macdSlowPeriod: this.configuration.macdSlowPeriod,
      macdSignalPeriod: this.configuration.macdSignalPeriod,
      psarMinAccelerationFactor: this.configuration.psarMinAccelerationFactor,
      psarMaxAccelerationFactor: this.configuration.psarMaxAccelerationFactor,
      positions: this.configuration.positions
    });

    this.drawConfigForm.setValue({
      haRisingBarColor: this.drawConfiguration.haDrawConfiguration.risingBarColor,
      haFallingBarColor: this.drawConfiguration.haDrawConfiguration.fallingBarColor,
      macdLineColor: this.drawConfiguration.macdDrawConfiguration.indicatorLineColor,
      macdSignalLineColor: this.drawConfiguration.macdDrawConfiguration.signalLineColor,
      macdBarChartLineColor: this.drawConfiguration.macdDrawConfiguration.barChartColor,
      psarColor: this.drawConfiguration.psarDrawConfiguration.indicatorColor,
      psarMarkerSize: this.drawConfiguration.psarDrawConfiguration.markerSize,
      psarMarker: this.drawConfiguration.psarDrawConfiguration.marker,
      entryLongColor: this.drawConfiguration.signalConfiguration.entryLongColor,
      entryShortColor: this.drawConfiguration.signalConfiguration.entryShortColor,
      signalMarkerSize: this.drawConfiguration.signalConfiguration.signalMarkerSize,
      buyMarker: this.drawConfiguration.signalConfiguration.buyMarker,
      sellMarker: this.drawConfiguration.signalConfiguration.sellMarker
    });
  }

}
