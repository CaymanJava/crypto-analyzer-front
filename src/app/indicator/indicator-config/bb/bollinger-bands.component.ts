import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { BaseIndicatorComponent } from "../base/base-indicator.component";

@Component({
  moduleId: module.id,
  templateUrl: './bollinger-bands.component.html'
})
export class BollingerBandsComponent extends BaseIndicatorComponent {

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
      'topBandColor': ['#ca0ecc', Validators.required],
      'bottomBandColor': ['#ca0ecc', Validators.required],
      'middleBandColor': ['#fa0f16', Validators.required],
      'channelColor': ['#68cc98', Validators.required]
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
        topBandColor: this.drawConfigForm.get('topBandColor').value,
        bottomBandColor: this.drawConfigForm.get('bottomBandColor').value,
        middleBandColor: this.drawConfigForm.get('middleBandColor').value,
        channelColor: this.drawConfigForm.get('channelColor').value
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
        topBandColor: this.drawConfiguration.topBandColor,
        bottomBandColor: this.drawConfiguration.bottomBandColor,
        middleBandColor: this.drawConfiguration.middleBandColor,
        channelColor: this.drawConfiguration.channelColor
      });
    }
  }

}
