import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { BaseIndicatorComponent } from "../base/base-indicator.component";

@Component({
  selector: 'app-coppock-curve',
  templateUrl: './coppock-curve.component.html'
})
export class CoppockCurveComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'shortROCPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'longROCPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'priceType': ['', [Validators.required]]
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#0a2ecc', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        period: this.configForm.get('period').value,
        shortROCPeriod: this.configForm.get('shortROCPeriod').value,
        longROCPeriod: this.configForm.get('longROCPeriod').value,
        priceType: this.configForm.get('priceType').value
      },
      drawConfiguration: {
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        period: this.configuration.period,
        shortROCPeriod: this.configuration.shortROCPeriod,
        longROCPeriod: this.configuration.longROCPeriod,
        priceType: this.configuration.priceType
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor
      });
    }
  }

}
