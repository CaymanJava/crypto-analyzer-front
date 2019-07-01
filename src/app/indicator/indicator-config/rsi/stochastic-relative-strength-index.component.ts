import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './stochastic-relative-strength-index.component.html'
})
export class StochasticRelativeStrengthIndexComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'movingAverageType': ['', [Validators.required]],
      'rsiPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'stochPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', [Validators.required]],
      'overbought': [0.8, [Validators.required, Validators.min(0), Validators.max(1)]],
      'oversold': [0.2, [Validators.required, Validators.min(0), Validators.max(1)]]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        movingAverageType: this.configForm.get('movingAverageType').value,
        rsiPeriod: this.configForm.get('rsiPeriod').value,
        stochPeriod: this.configForm.get('stochPeriod').value
      },
      drawConfiguration: {
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value,
        overbought: this.drawConfigForm.get('overbought').value,
        oversold: this.drawConfigForm.get('oversold').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        movingAverageType: this.configuration.movingAverageType,
        rsiPeriod: this.configuration.rsiPeriod,
        stochPeriod: this.configuration.stochPeriod
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        overbought: this.drawConfiguration.overbought,
        oversold: this.drawConfiguration.oversold
      });
    }
  }

}
