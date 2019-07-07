import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './ultimate-oscillator.component.html'
})
export class UltimateOscillatorComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'shortPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'middlePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'longPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', Validators.required],
      'overbought': [70, [Validators.required, Validators.min(0)]],
      'oversold': [30, [Validators.required, Validators.max(100)]],
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        shortPeriod: this.configForm.get('shortPeriod').value,
        middlePeriod: this.configForm.get('middlePeriod').value,
        longPeriod: this.configForm.get('longPeriod').value
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
        shortPeriod: this.configuration.shortPeriod,
        middlePeriod: this.configuration.middlePeriod,
        longPeriod: this.configuration.longPeriod
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        overbought: this.drawConfiguration.overbought,
        oversold: this.drawConfiguration.oversold
      });
    }
  }

}
