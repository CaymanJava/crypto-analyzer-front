import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { BaseIndicatorComponent } from "../base/base-indicator.component";

@Component({
  moduleId: module.id,
  templateUrl: './average-directional-movement-index.component.html'
})
export class AverageDirectionalMovementIndexComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
    });
    this.drawConfigForm = this.fb.group({
      'positiveDiLineColor': ['#3ba158', Validators.required],
      'negativeDiLineColor': ['#fa0f16', Validators.required],
      'indicatorLineColor': ['#1c1afa', Validators.required],
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        period: this.configForm.get('period').value
      },
      drawConfiguration: {
        positiveDiLineColor: this.drawConfigForm.get('positiveDiLineColor').value,
        negativeDiLineColor: this.drawConfigForm.get('negativeDiLineColor').value,
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        period: this.configuration.period
      });
      this.drawConfigForm.setValue({
        positiveDiLineColor: this.drawConfiguration.positiveDiLineColor,
        negativeDiLineColor: this.drawConfiguration.negativeDiLineColor,
        indicatorLineColor: this.drawConfiguration.indicatorLineColor
      });
    }
  }

}
