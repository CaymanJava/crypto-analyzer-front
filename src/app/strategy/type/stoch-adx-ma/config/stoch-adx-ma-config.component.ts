import { Component } from '@angular/core';
import { BaseStrategyConfigComponent } from "../../base-strategy-config.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../../shared/validators/not-decimal-validator";
import { ArraySizeValidator } from "../../../../shared/validators/array-size-validator";

@Component({
  selector: 'app-stoch-adx-ma-config',
  templateUrl: './stoch-adx-ma-config.component.html'
})
export class StochAdxMaConfigComponent extends BaseStrategyConfigComponent {

  constructor(private modal: NgbActiveModal,
              private fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'stochMovingAverageType': ['', Validators.required],
      'stochFastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'stochSlowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'stochasticSignalLine': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'adxPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'adxSignalLine': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'firstMaPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'secondMaPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'thirdMaPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'positions': ['', [Validators.required, ArraySizeValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'stochFastStochasticColor': ['', Validators.required],
      'stochSlowStochasticColor': ['', Validators.required],
      'stochOverboughtLevel': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'stochOversoldLevel': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'adxPositiveDiLineColor': ['', Validators.required],
      'adxNegativeDiLineColor': ['', Validators.required],
      'adxIndicatorLineColor': ['', Validators.required],
      'firstMaLineColor': ['', Validators.required],
      'secondMaLineColor': ['', Validators.required],
      'thirdMaLineColor': ['', Validators.required],
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
        stochMovingAverageType: this.configForm.get('stochMovingAverageType').value,
        stochFastPeriod: this.configForm.get('stochFastPeriod').value,
        stochSlowPeriod: this.configForm.get('stochSlowPeriod').value,
        stochasticSignalLine: this.configForm.get('stochasticSignalLine').value,
        adxPeriod: this.configForm.get('adxPeriod').value,
        adxSignalLine: this.configForm.get('adxSignalLine').value,
        firstMaPeriod: this.configForm.get('firstMaPeriod').value,
        secondMaPeriod: this.configForm.get('secondMaPeriod').value,
        thirdMaPeriod: this.configForm.get('thirdMaPeriod').value,
        positions: this.configForm.get('positions').value
      },
      drawConfiguration: {
        stochDrawConfiguration: {
          fastStochasticColor: this.drawConfigForm.get('stochFastStochasticColor').value,
          slowStochasticColor: this.drawConfigForm.get('stochSlowStochasticColor').value,
          overbought: this.drawConfigForm.get('stochOverboughtLevel').value,
          oversold: this.drawConfigForm.get('stochOversoldLevel').value,
        },
        adxDrawConfiguration: {
          positiveDiLineColor: this.drawConfigForm.get('adxPositiveDiLineColor').value,
          negativeDiLineColor: this.drawConfigForm.get('adxNegativeDiLineColor').value,
          indicatorLineColor: this.drawConfigForm.get('adxIndicatorLineColor').value,
        },
        firstMaDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('firstMaLineColor').value
        },
        secondMaDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('secondMaLineColor').value
        },
        thirdMaDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('thirdMaLineColor').value
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
      stochMovingAverageType: this.configuration.stochMovingAverageType,
      stochFastPeriod: this.configuration.stochFastPeriod,
      stochSlowPeriod: this.configuration.stochSlowPeriod,
      stochasticSignalLine: this.configuration.stochasticSignalLine,
      adxPeriod: this.configuration.adxPeriod,
      adxSignalLine: this.configuration.adxSignalLine,
      firstMaPeriod: this.configuration.firstMaPeriod,
      secondMaPeriod: this.configuration.secondMaPeriod,
      thirdMaPeriod: this.configuration.thirdMaPeriod,
      positions: this.configuration.positions
    });
    this.drawConfigForm.setValue({
      stochFastStochasticColor: this.drawConfiguration.stochDrawConfiguration.fastStochasticColor,
      stochSlowStochasticColor: this.drawConfiguration.stochDrawConfiguration.slowStochasticColor,
      stochOverboughtLevel: this.drawConfiguration.stochDrawConfiguration.overbought,
      stochOversoldLevel: this.drawConfiguration.stochDrawConfiguration.oversold,
      adxPositiveDiLineColor: this.drawConfiguration.adxDrawConfiguration.positiveDiLineColor,
      adxNegativeDiLineColor: this.drawConfiguration.adxDrawConfiguration.negativeDiLineColor,
      adxIndicatorLineColor: this.drawConfiguration.adxDrawConfiguration.indicatorLineColor,
      firstMaLineColor: this.drawConfiguration.firstMaDrawConfiguration.indicatorLineColor,
      secondMaLineColor: this.drawConfiguration.secondMaDrawConfiguration.indicatorLineColor,
      thirdMaLineColor: this.drawConfiguration.thirdMaDrawConfiguration.indicatorLineColor,
      entryLongColor: this.drawConfiguration.signalConfiguration.entryLongColor,
      entryShortColor: this.drawConfiguration.signalConfiguration.entryShortColor,
      signalMarkerSize: this.drawConfiguration.signalConfiguration.signalMarkerSize,
      buyMarker: this.drawConfiguration.signalConfiguration.buyMarker,
      sellMarker: this.drawConfiguration.signalConfiguration.sellMarker
    });
  }

}
