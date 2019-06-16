import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './on-balance-volume.component.html'
})
export class OnBalanceVolumeComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'movingAverageType': ['', [Validators.required]],
      'movingAveragePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', Validators.required],
      'signalLineColor': ['#fa0f16', [Validators.required]],
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
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
