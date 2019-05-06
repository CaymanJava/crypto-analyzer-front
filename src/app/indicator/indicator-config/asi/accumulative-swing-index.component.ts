import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { PositiveNumberValidator } from "../../../shared/validators/positive-number-validator";
import { BaseIndicatorComponent } from "../base/base-indicator.component";

@Component({
  moduleId: module.id,
  templateUrl: './accumulative-swing-index.component.html'
})
export class AccumulativeSwingIndexComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'limitMoveValue': ['', [Validators.required, PositiveNumberValidator.valid]],
      'movingAverageType': ['', [Validators.required]],
      'movingAveragePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
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
        limitMoveValue: this.configForm.get('limitMoveValue').value,
        movingAverageType: this.configForm.get('movingAverageType').value,
        movingAveragePeriod: this.configForm.get('movingAveragePeriod').value
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
        limitMoveValue: this.configuration.limitMoveValue,
        movingAverageType: this.configuration.movingAverageType,
        movingAveragePeriod: this.configuration.movingAveragePeriod
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        signalLineColor: this.drawConfiguration.signalLineColor
      });
    }
  }

}
