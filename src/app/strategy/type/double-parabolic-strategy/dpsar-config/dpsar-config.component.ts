import { Component } from '@angular/core';
import { BaseStrategyConfigComponent } from "../../base-strategy-config.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../../shared/validators/not-decimal-validator";
import { ArraySizeValidator } from "../../../../shared/validators/array-size-validator";

@Component({
  selector: 'app-dpsar-config',
  templateUrl: './dpsar-config.component.html'
})
export class DpsarConfigComponent extends BaseStrategyConfigComponent {

  constructor(private modal: NgbActiveModal,
              private fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'movingAveragePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'movingAveragePriceType': ['', [Validators.required]],
      'movingAverageType': ['', Validators.required],
      'macdMovingAverageType': ['', Validators.required],
      'macdPriceType': ['', Validators.required],
      'macdFastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'macdSlowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'macdSignalPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'psarMinAccelerationFactor': ['', [Validators.required, Validators.min(0.0001)]],
      'psarMaxAccelerationFactor': ['', [Validators.required, Validators.min(0.0001)]],
      'pswMinAccelerationFactor': ['', [Validators.required, Validators.min(0.0001)]],
      'pswMaxAccelerationFactor': ['', [Validators.required, Validators.min(0.0001)]],
      'positions': ['', [Validators.required, ArraySizeValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'maLineColor': ['', Validators.required],
      'macdLineColor': ['', Validators.required],
      'macdSignalLineColor': ['', Validators.required],
      'macdBarChartLineColor': ['', Validators.required],
      'psarColor': ['', Validators.required],
      'psarMarkerSize': ['', [Validators.required, Validators.min(1)]],
      'psarMarker': ['', Validators.required],
      'psarMacdSignalLineColor': ['', Validators.required],
      'psarMacdColor': ['', Validators.required],
      'psarMacdMarkerSize': ['', [Validators.required, Validators.min(1)]],
      'psarMacdMarker': ['', Validators.required],
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
        movingAveragePeriod: this.configForm.get('movingAveragePeriod').value,
        movingAveragePriceType: this.configForm.get('movingAveragePriceType').value,
        movingAverageType: this.configForm.get('movingAverageType').value,
        macdMovingAverageType: this.configForm.get('macdMovingAverageType').value,
        macdPriceType: this.configForm.get('macdPriceType').value,
        macdFastPeriod: this.configForm.get('macdFastPeriod').value,
        macdSlowPeriod: this.configForm.get('macdSlowPeriod').value,
        macdSignalPeriod: this.configForm.get('macdSignalPeriod').value,
        psarMinAccelerationFactor: this.configForm.get('psarMinAccelerationFactor').value,
        psarMaxAccelerationFactor: this.configForm.get('psarMaxAccelerationFactor').value,
        pswMinAccelerationFactor: this.configForm.get('pswMinAccelerationFactor').value,
        pswMaxAccelerationFactor: this.configForm.get('pswMaxAccelerationFactor').value,
        positions: this.configForm.get('positions').value
      },
      drawConfiguration: {
        maDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('maLineColor').value
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
        pswDrawConfiguration: {
          macdLineColor: this.drawConfigForm.get('psarMacdSignalLineColor').value,
          indicatorColor: this.drawConfigForm.get('psarMacdColor').value,
          markerSize: this.drawConfigForm.get('psarMacdMarkerSize').value,
          marker: this.drawConfigForm.get('psarMacdMarker').value
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
      movingAveragePeriod: this.configuration.movingAveragePeriod,
      movingAveragePriceType: this.configuration.movingAveragePriceType,
      movingAverageType: this.configuration.movingAverageType,
      macdMovingAverageType: this.configuration.macdMovingAverageType,
      macdPriceType: this.configuration.macdPriceType,
      macdFastPeriod: this.configuration.macdFastPeriod,
      macdSlowPeriod: this.configuration.macdSlowPeriod,
      macdSignalPeriod: this.configuration.macdSignalPeriod,
      psarMinAccelerationFactor: this.configuration.psarMinAccelerationFactor,
      psarMaxAccelerationFactor: this.configuration.psarMaxAccelerationFactor,
      pswMinAccelerationFactor: this.configuration.pswMinAccelerationFactor,
      pswMaxAccelerationFactor: this.configuration.pswMaxAccelerationFactor,
      positions: this.configuration.positions
    });

    this.drawConfigForm.setValue({
      maLineColor: this.drawConfiguration.maDrawConfiguration.indicatorLineColor,
      macdLineColor: this.drawConfiguration.macdDrawConfiguration.indicatorLineColor,
      macdSignalLineColor: this.drawConfiguration.macdDrawConfiguration.signalLineColor,
      macdBarChartLineColor: this.drawConfiguration.macdDrawConfiguration.barChartColor,
      psarColor: this.drawConfiguration.psarDrawConfiguration.indicatorColor,
      psarMarkerSize: this.drawConfiguration.psarDrawConfiguration.markerSize,
      psarMarker: this.drawConfiguration.psarDrawConfiguration.marker,
      psarMacdSignalLineColor: this.drawConfiguration.pswDrawConfiguration.macdLineColor,
      psarMacdColor: this.drawConfiguration.pswDrawConfiguration.indicatorColor,
      psarMacdMarkerSize: this.drawConfiguration.pswDrawConfiguration.markerSize,
      psarMacdMarker: this.drawConfiguration.pswDrawConfiguration.marker,
      entryLongColor: this.drawConfiguration.signalConfiguration.entryLongColor,
      entryShortColor: this.drawConfiguration.signalConfiguration.entryShortColor,
      signalMarkerSize: this.drawConfiguration.signalConfiguration.signalMarkerSize,
      buyMarker: this.drawConfiguration.signalConfiguration.buyMarker,
      sellMarker: this.drawConfiguration.signalConfiguration.sellMarker
    });
  }

}
