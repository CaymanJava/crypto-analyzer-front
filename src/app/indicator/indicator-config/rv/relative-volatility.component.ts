import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './relative-volatility.component.html'
})
export class RelativeVolatilityComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'priceType': ['', [Validators.required]],
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'stDevPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', [Validators.required]],
      'bullishSignalLine': [50, [Validators.required, Validators.min(0), Validators.max(100)]],
      'bearerSignalLine': [50, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        priceType: this.configForm.get('priceType').value,
        period: this.configForm.get('period').value,
        stDevPeriod: this.configForm.get('stDevPeriod').value
      },
      drawConfiguration: {
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value,
        bullishSignalLine: this.drawConfigForm.get('bullishSignalLine').value,
        bearerSignalLine: this.drawConfigForm.get('bearerSignalLine').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        priceType: this.configuration.priceType,
        period: this.configuration.period,
        stDevPeriod: this.configuration.stDevPeriod
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        bullishSignalLine: this.drawConfiguration.bullishSignalLine,
        bearerSignalLine: this.drawConfiguration.bearerSignalLine
      });
    }
  }


}
