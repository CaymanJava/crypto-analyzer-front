import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './elder-ray-index.component.html'
})
export class ElderRayIndexComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'signalLinePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'smoothLinePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', Validators.required],
      'signalLineColor': ['#fa0f16', Validators.required],
      'smoothLineColor': ['#3ba158', Validators.required]
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
        smoothLinePeriod: this.configForm.get('smoothLinePeriod').value
      },
      drawConfiguration: {
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value,
        signalLineColor: this.drawConfigForm.get('signalLineColor').value,
        smoothLineColor: this.drawConfigForm.get('smoothLineColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        period: this.configuration.period,
        signalLinePeriod: this.configuration.signalLinePeriod,
        smoothLinePeriod: this.configuration.smoothLinePeriod
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        signalLineColor: this.drawConfiguration.signalLineColor,
        smoothLineColor: this.drawConfiguration.smoothLineColor
      });
    }
  }

}
