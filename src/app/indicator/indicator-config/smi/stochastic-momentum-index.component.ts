import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './stochastic-momentum-index.component.html'
})
export class StochasticMomentumIndexComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'movingAverageType': ['', [Validators.required]],
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'smoothingPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', Validators.required],
      'signalLineColor': ['#fa0f16', Validators.required],
      'overbought': [40, [Validators.required, Validators.min(0)]],
      'oversold': [-40, [Validators.required, Validators.max(0)]],
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        movingAverageType: this.configForm.get('movingAverageType').value,
        period: this.configForm.get('period').value,
        smoothingPeriod: this.configForm.get('smoothingPeriod').value
      },
      drawConfiguration: {
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value,
        signalLineColor: this.drawConfigForm.get('signalLineColor').value,
        overbought: this.drawConfigForm.get('overbought').value,
        oversold: this.drawConfigForm.get('oversold').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        movingAverageType: this.configuration.movingAverageType,
        period: this.configuration.period,
        smoothingPeriod: this.configuration.smoothingPeriod
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
