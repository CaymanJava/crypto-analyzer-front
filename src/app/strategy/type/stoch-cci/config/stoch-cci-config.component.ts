import { Component } from '@angular/core';
import { BaseStrategyConfigComponent } from "../../base-strategy-config.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../../shared/validators/not-decimal-validator";
import { ArraySizeValidator } from "../../../../shared/validators/array-size-validator";

@Component({
  selector: 'app-stoch-cci-config',
  templateUrl: './stoch-cci-config.component.html'
})
export class StochCciConfigComponent extends BaseStrategyConfigComponent {

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
      'cciPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'cciOversoldLevel': ['', [Validators.required]],
      'cciOverboughtLevel': ['', [Validators.required]],
      'positions': ['', [Validators.required, ArraySizeValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'stochFastStochasticColor': ['', Validators.required],
      'stochSlowStochasticColor': ['', Validators.required],
      'cciLineColor': ['', Validators.required],
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
        cciPeriod: this.configForm.get('cciPeriod').value,
        cciOversoldLevel: this.configForm.get('cciOversoldLevel').value,
        cciOverboughtLevel: this.configForm.get('cciOverboughtLevel').value,
        positions: this.configForm.get('positions').value
      },
      drawConfiguration: {
        stochDrawConfiguration: {
          fastStochasticColor: this.drawConfigForm.get('stochFastStochasticColor').value,
          slowStochasticColor: this.drawConfigForm.get('stochSlowStochasticColor').value,
          oversold: this.configForm.get('stochOversoldLevel').value,
          overbought: this.configForm.get('stochOverboughtLevel').value
        },
        cciDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('cciLineColor').value,
          oversold: this.configForm.get('cciOversoldLevel').value,
          overbought: this.configForm.get('cciOverboughtLevel').value,
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
      cciPeriod: this.configuration.cciPeriod,
      cciOversoldLevel: this.configuration.cciOversoldLevel,
      cciOverboughtLevel: this.configuration.cciOverboughtLevel,
      positions: this.configuration.positions
    });
    this.drawConfigForm.setValue({
      stochFastStochasticColor: this.drawConfiguration.stochDrawConfiguration.fastStochasticColor,
      stochSlowStochasticColor: this.drawConfiguration.stochDrawConfiguration.slowStochasticColor,
      cciLineColor: this.drawConfiguration.cciDrawConfiguration.indicatorLineColor,
      entryLongColor: this.drawConfiguration.signalConfiguration.entryLongColor,
      entryShortColor: this.drawConfiguration.signalConfiguration.entryShortColor,
      signalMarkerSize: this.drawConfiguration.signalConfiguration.signalMarkerSize,
      buyMarker: this.drawConfiguration.signalConfiguration.buyMarker,
      sellMarker: this.drawConfiguration.signalConfiguration.sellMarker
    });
  }

}
