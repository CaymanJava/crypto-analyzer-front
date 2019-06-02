import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { BaseIndicatorComponent } from "../base/base-indicator.component";

@Component({
  moduleId: module.id,
  templateUrl: './bollinger-bands-width.component.html'
})
export class BollingerBandsWidthComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'priceType': ['', [Validators.required]],
      'standardDeviationCoefficient': ['', [Validators.required, Validators.min(1.00001)]],
      'movingAverageType': ['', [Validators.required]]
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#2722d8', Validators.required]
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
        standardDeviationCoefficient: this.configForm.get('standardDeviationCoefficient').value,
        movingAverageType: this.configForm.get('movingAverageType').value
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
        priceType: this.configuration.priceType,
        standardDeviationCoefficient: this.configuration.standardDeviationCoefficient,
        movingAverageType: this.configuration.movingAverageType,
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor
      });
    }
  }

}
