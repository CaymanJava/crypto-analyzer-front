import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './stochastic-oscillator.component.html'
})
export class StochasticOscillatorComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'fastStochPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'slowStochPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'movingAverageType': ['', [Validators.required]]
    });
    this.drawConfigForm = this.fb.group({
      'fastStochasticColor': ['#1c1afa', Validators.required],
      'slowStochasticColor': ['#fa0f16', Validators.required],
      'overbought': [80, [Validators.required, Validators.min(0)]],
      'oversold': [20, [Validators.required, Validators.max(100)]],
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        fastStochPeriod: this.configForm.get('fastStochPeriod').value,
        slowStochPeriod: this.configForm.get('slowStochPeriod').value,
        movingAverageType: this.configForm.get('movingAverageType').value
      },
      drawConfiguration: {
        fastStochasticColor: this.drawConfigForm.get('fastStochasticColor').value,
        slowStochasticColor: this.drawConfigForm.get('slowStochasticColor').value,
        overbought: this.drawConfigForm.get('overbought').value,
        oversold: this.drawConfigForm.get('oversold').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        fastStochPeriod: this.configuration.fastStochPeriod,
        slowStochPeriod: this.configuration.slowStochPeriod,
        movingAverageType: this.configuration.movingAverageType
      });
      this.drawConfigForm.setValue({
        fastStochasticColor: this.drawConfiguration.fastStochasticColor,
        slowStochasticColor: this.drawConfiguration.slowStochasticColor,
        overbought: this.drawConfiguration.overbought,
        oversold: this.drawConfiguration.oversold
      });
    }
  }

}
