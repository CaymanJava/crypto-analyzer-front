import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './chande-momentum-oscillator.component.html'
})
export class ChandeMomentumOscillatorComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'signalLinePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'movingAverageType': ['', [Validators.required]]
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', [Validators.required]],
      'signalLineColor': ['#fa0f16', [Validators.required]],
      'overbought': [50, [Validators.required, Validators.min(0)]],
      'oversold': [-50, [Validators.required, Validators.max(0)]]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        period: this.configForm.get('period').value,
        signalLinePeriod: this.configForm.get('signalLinePeriod').value,
        movingAverageType: this.configForm.get('movingAverageType').value
      },
      drawConfiguration: {
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value,
        signalLineColor: this.drawConfigForm.get('signalLineColor').value,
        overbought: this.drawConfigForm.get('overbought').value,
        oversold: this.drawConfigForm.get('oversold').value,
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        period: this.configuration.period,
        signalLinePeriod: this.configuration.signalLinePeriod,
        movingAverageType: this.configuration.movingAverageType
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        signalLineColor: this.drawConfiguration.signalLineColor,
        overbought: this.drawConfiguration.overbought,
        oversold: this.drawConfiguration.oversold
      });
    }
  }

}
