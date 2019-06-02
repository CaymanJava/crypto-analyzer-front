import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './center-of-gravity.component.html'
})
export class CenterOfGravityComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'priceType': ['', [Validators.required]],
      'movingAverageType': ['', [Validators.required]],
      'signalLinePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', [Validators.required]],
      'signalLineColor': ['#fa0f16', [Validators.required]]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        period: this.configForm.get('period').value,
        priceType: this.configForm.get('priceType').value,
        movingAverageType: this.configForm.get('movingAverageType').value,
        signalLinePeriod: this.configForm.get('signalLinePeriod').value
      },
      drawConfiguration: {
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value,
        signalLineColor: this.drawConfigForm.get('signalLineColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        period: this.configuration.period,
        priceType: this.configuration.priceType,
        movingAverageType: this.configuration.movingAverageType,
        signalLinePeriod: this.configuration.signalLinePeriod
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        signalLineColor: this.drawConfiguration.signalLineColor
      });
    }
  }

}
