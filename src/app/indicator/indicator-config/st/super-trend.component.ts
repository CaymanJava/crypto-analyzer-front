import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './super-trend.component.html'
})
export class SuperTrendComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'multiplier': ['', [Validators.required, Validators.min(0.0001)]]
    });
    this.drawConfigForm = this.fb.group({
      'upTrendColor': ['#3ba158', [Validators.required]],
      'downTrendColor': ['#fa0f16', [Validators.required]]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        period: this.configForm.get('period').value,
        multiplier: this.configForm.get('multiplier').value
      },
      drawConfiguration: {
        upTrendColor: this.drawConfigForm.get('upTrendColor').value,
        downTrendColor: this.drawConfigForm.get('downTrendColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        period: this.configuration.period,
        multiplier: this.configuration.multiplier
      });
      this.drawConfigForm.setValue({
        upTrendColor: this.drawConfiguration.upTrendColor,
        downTrendColor: this.drawConfiguration.downTrendColor
      });
    }
  }

}
