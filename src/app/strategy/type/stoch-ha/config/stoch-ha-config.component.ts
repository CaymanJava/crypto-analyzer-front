import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../../shared/validators/not-decimal-validator";
import { ArraySizeValidator } from "../../../../shared/validators/array-size-validator";
import { BaseStrategyConfigComponent } from "../../../../shared/components/strategy/base/base-strategy-config.component";

@Component({
  selector: 'app-stoch-ha-config',
  templateUrl: './stoch-ha-config.component.html'
})
export class StochHaConfigComponent extends BaseStrategyConfigComponent {

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
      'stochOversoldLevel': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'stochOverboughtLevel': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'positions': ['', [Validators.required, ArraySizeValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'stochFastStochasticColor': ['', Validators.required],
      'stochSlowStochasticColor': ['', Validators.required],
      'haRisingBarColor': ['', Validators.required],
      'haFallingBarColor': ['', Validators.required],
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
        positions: this.configForm.get('positions').value
      },
      drawConfiguration: {
        stochDrawConfiguration: {
          fastStochasticColor: this.drawConfigForm.get('stochFastStochasticColor').value,
          slowStochasticColor: this.drawConfigForm.get('stochSlowStochasticColor').value,
          oversold: this.configForm.get('stochOversoldLevel').value,
          overbought: this.configForm.get('stochOverboughtLevel').value
        },
        haDrawConfiguration: {
          risingBarColor: this.drawConfigForm.get('haRisingBarColor').value,
          fallingBarColor: this.drawConfigForm.get('haFallingBarColor').value
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
      positions: this.configuration.positions
    });
    this.drawConfigForm.setValue({
      stochFastStochasticColor: this.drawConfiguration.stochDrawConfiguration.fastStochasticColor,
      stochSlowStochasticColor: this.drawConfiguration.stochDrawConfiguration.slowStochasticColor,
      haRisingBarColor: this.drawConfiguration.haDrawConfiguration.risingBarColor,
      haFallingBarColor: this.drawConfiguration.haDrawConfiguration.fallingBarColor,
      entryLongColor: this.drawConfiguration.signalConfiguration.entryLongColor,
      entryShortColor: this.drawConfiguration.signalConfiguration.entryShortColor,
      signalMarkerSize: this.drawConfiguration.signalConfiguration.signalMarkerSize,
      buyMarker: this.drawConfiguration.signalConfiguration.buyMarker,
      sellMarker: this.drawConfiguration.signalConfiguration.sellMarker
    });
  }

}
