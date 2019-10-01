import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../../shared/validators/not-decimal-validator";
import { ArraySizeValidator } from "../../../../shared/validators/array-size-validator";
import { BaseStrategyConfigComponent } from "../../../../shared/components/strategy/base/base-strategy-config.component";

@Component({
  selector: 'app-stoch-ac-ma-config',
  templateUrl: './stoch-ac-ma-config.component.html'
})
export class StochAcMaConfigComponent extends BaseStrategyConfigComponent {

  constructor(private modal: NgbActiveModal,
              private fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'acSlowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'acFastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'acSmoothedPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'stochMovingAverageType': ['', Validators.required],
      'stochFastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'stochSlowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'stochOversoldLevel': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'stochOverboughtLevel': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'maPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'movingAverageType': ['', Validators.required],
      'maPriceType': ['', Validators.required],
      'positions': ['', [Validators.required, ArraySizeValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'stochFastStochasticColor': ['', Validators.required],
      'stochSlowStochasticColor': ['', Validators.required],
      'maLineColor': ['', Validators.required],
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
        stochOversoldLevel: this.configForm.get('stochOversoldLevel').value,
        stochOverboughtLevel: this.configForm.get('stochOverboughtLevel').value,
        acSlowPeriod: this.configForm.get('acSlowPeriod').value,
        acFastPeriod: this.configForm.get('acFastPeriod').value,
        acSmoothedPeriod: this.configForm.get('acSmoothedPeriod').value,
        maPeriod: this.configForm.get('maPeriod').value,
        movingAverageType: this.configForm.get('movingAverageType').value,
        maPriceType: this.configForm.get('maPriceType').value,
        positions: this.configForm.get('positions').value
      },
      drawConfiguration: {
        stochDrawConfiguration: {
          fastStochasticColor: this.drawConfigForm.get('stochFastStochasticColor').value,
          slowStochasticColor: this.drawConfigForm.get('stochSlowStochasticColor').value,
          overbought: this.configForm.get('stochOverboughtLevel').value,
          oversold: this.configForm.get('stochOversoldLevel').value,
        },
        maDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('maLineColor').value,
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
      stochOversoldLevel: this.configuration.stochOversoldLevel,
      stochOverboughtLevel: this.configuration.stochOverboughtLevel,
      acSlowPeriod: this.configuration.acSlowPeriod,
      acFastPeriod: this.configuration.acFastPeriod,
      acSmoothedPeriod: this.configuration.acSmoothedPeriod,
      maPeriod: this.configuration.maPeriod,
      movingAverageType: this.configuration.movingAverageType,
      maPriceType: this.configuration.maPriceType,
      positions: this.configuration.positions
    });
    this.drawConfigForm.setValue({
      stochFastStochasticColor: this.drawConfiguration.stochDrawConfiguration.fastStochasticColor,
      stochSlowStochasticColor: this.drawConfiguration.stochDrawConfiguration.slowStochasticColor,
      maLineColor: this.drawConfiguration.maDrawConfiguration.indicatorLineColor,
      entryLongColor: this.drawConfiguration.signalConfiguration.entryLongColor,
      entryShortColor: this.drawConfiguration.signalConfiguration.entryShortColor,
      signalMarkerSize: this.drawConfiguration.signalConfiguration.signalMarkerSize,
      buyMarker: this.drawConfiguration.signalConfiguration.buyMarker,
      sellMarker: this.drawConfiguration.signalConfiguration.sellMarker
    });
  }

}
