import { Component } from '@angular/core';
import { BaseStrategyConfigComponent } from "../../base-strategy-config.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../../shared/validators/not-decimal-validator";
import { ArraySizeValidator } from "../../../../shared/validators/array-size-validator";

@Component({
  selector: 'app-pivot-rsi-macd-ma-config',
  templateUrl: './pivot-rsi-macd-ma-config.component.html'
})
export class PivotRsiMacdMaConfigComponent extends BaseStrategyConfigComponent {

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
      'macdMaType': ['', Validators.required],
      'macdPriceType': ['', Validators.required],
      'macdFastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'macdSlowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'macdSignalPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'maType': ['', Validators.required],
      'maPriceType': ['', Validators.required],
      'maPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'positions': ['', [Validators.required, ArraySizeValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'rsiLineColor': ['', Validators.required],
      'rsiOversold': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'rsiOverbought': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'macdLineColor': ['', Validators.required],
      'macdSignalLineColor': ['', Validators.required],
      'macdBarChartLineColor': ['', Validators.required],
      'maLineColor': ['', Validators.required],
      'pivotColor': ['', Validators.required],
      'firstResistanceColor': ['', Validators.required],
      'secondResistanceColor': ['', Validators.required],
      'thirdResistanceColor': ['', Validators.required],
      'fourthResistanceColor': ['', Validators.required],
      'firstSupportColor': ['', Validators.required],
      'secondSupportColor': ['', Validators.required],
      'thirdSupportColor': ['', Validators.required],
      'fourthSupportColor': ['', Validators.required],
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
        macdMaType: this.configForm.get('macdMaType').value,
        macdPriceType: this.configForm.get('macdPriceType').value,
        macdFastPeriod: this.configForm.get('macdFastPeriod').value,
        macdSlowPeriod: this.configForm.get('macdSlowPeriod').value,
        macdSignalPeriod: this.configForm.get('macdSignalPeriod').value,
        maType: this.configForm.get('maType').value,
        maPriceType: this.configForm.get('maPriceType').value,
        maPeriod: this.configForm.get('maPeriod').value,
        positions: this.configForm.get('positions').value
      },
      drawConfiguration: {
        rsiDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('rsiLineColor').value,
          overbought: this.drawConfigForm.get('rsiOversold').value,
          oversold: this.drawConfigForm.get('rsiOverbought').value
        },
        macdDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('macdLineColor').value,
          signalLineColor: this.drawConfigForm.get('macdSignalLineColor').value,
          barChartColor: this.drawConfigForm.get('macdBarChartLineColor').value
        },
        maDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('maLineColor').value
        },
        pivotDrawConfiguration: {
          pivotColor: this.drawConfigForm.get('pivotColor').value,
          firstResistanceColor: this.drawConfigForm.get('firstResistanceColor').value,
          secondResistanceColor: this.drawConfigForm.get('secondResistanceColor').value,
          thirdResistanceColor: this.drawConfigForm.get('thirdResistanceColor').value,
          fourthResistanceColor: this.drawConfigForm.get('fourthResistanceColor').value,
          firstSupportColor: this.drawConfigForm.get('firstSupportColor').value,
          secondSupportColor: this.drawConfigForm.get('secondSupportColor').value,
          thirdSupportColor: this.drawConfigForm.get('thirdSupportColor').value,
          fourthSupportColor: this.drawConfigForm.get('fourthSupportColor').value
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
      macdMaType: this.configuration.macdMaType,
      macdPriceType: this.configuration.macdPriceType,
      macdFastPeriod: this.configuration.macdFastPeriod,
      macdSlowPeriod: this.configuration.macdSlowPeriod,
      macdSignalPeriod: this.configuration.macdSignalPeriod,
      maType: this.configuration.maType,
      maPriceType: this.configuration.maPriceType,
      maPeriod: this.configuration.maPeriod,
      positions: this.configuration.positions
    });

    this.drawConfigForm.setValue({
      rsiLineColor: this.drawConfiguration.rsiDrawConfiguration.indicatorLineColor,
      rsiOversold: this.drawConfiguration.rsiDrawConfiguration.oversold,
      rsiOverbought: this.drawConfiguration.rsiDrawConfiguration.overbought,
      macdLineColor: this.drawConfiguration.macdDrawConfiguration.indicatorLineColor,
      macdSignalLineColor: this.drawConfiguration.macdDrawConfiguration.signalLineColor,
      macdBarChartLineColor: this.drawConfiguration.macdDrawConfiguration.barChartColor,
      maLineColor: this.drawConfiguration.maDrawConfiguration.indicatorLineColor,
      pivotColor: this.drawConfiguration.pivotDrawConfiguration.pivotColor,
      firstResistanceColor: this.drawConfiguration.pivotDrawConfiguration.firstResistanceColor,
      secondResistanceColor: this.drawConfiguration.pivotDrawConfiguration.secondResistanceColor,
      thirdResistanceColor: this.drawConfiguration.pivotDrawConfiguration.thirdResistanceColor,
      fourthResistanceColor: this.drawConfiguration.pivotDrawConfiguration.fourthResistanceColor,
      firstSupportColor: this.drawConfiguration.pivotDrawConfiguration.firstSupportColor,
      secondSupportColor: this.drawConfiguration.pivotDrawConfiguration.secondSupportColor,
      thirdSupportColor: this.drawConfiguration.pivotDrawConfiguration.thirdSupportColor,
      fourthSupportColor: this.drawConfiguration.pivotDrawConfiguration.fourthSupportColor,
      entryLongColor: this.drawConfiguration.signalConfiguration.entryLongColor,
      entryShortColor: this.drawConfiguration.signalConfiguration.entryShortColor,
      signalMarkerSize: this.drawConfiguration.signalConfiguration.signalMarkerSize,
      buyMarker: this.drawConfiguration.signalConfiguration.buyMarker,
      sellMarker: this.drawConfiguration.signalConfiguration.sellMarker,
    });
  }

}
