import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { BaseIndicatorComponent } from "../base/base-indicator.component";

@Component({
  moduleId: module.id,
  templateUrl: './acceleration-deceleration-oscillator.component.html'
})
export class AccelerationDecelerationOscillatorComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'slowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'fastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'smoothedPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        slowPeriod: this.configForm.get('slowPeriod').value,
        fastPeriod: this.configForm.get('fastPeriod').value,
        smoothedPeriod: this.configForm.get('smoothedPeriod').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        slowPeriod: this.configuration.slowPeriod,
        fastPeriod: this.configuration.fastPeriod,
        smoothedPeriod: this.configuration.smoothedPeriod,
      });
    }
  }

}
