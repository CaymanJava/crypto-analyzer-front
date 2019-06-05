import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { PositiveNumberValidator } from "../../../shared/validators/positive-number-validator";
import { BaseIndicatorComponent } from "../base/base-indicator.component";

@Component({
  moduleId: module.id,
  templateUrl: './average-true-range-bands.component.html'
})
export class AverageTrueRangeBandsComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'shift': ['', [Validators.required, PositiveNumberValidator.valid]],
      'priceType': ['', [Validators.required]]
    });
    this.drawConfigForm = this.fb.group({
      'topBandColor': ['#0a2ecc', Validators.required],
      'bottomBandColor': ['#0a2ecc', Validators.required],
      'middleBandColor': ['#fa0f16', Validators.required],
      'channelColor': ['#7276cc', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        period: this.configForm.get('period').value,
        shift: this.configForm.get('shift').value,
        priceType: this.configForm.get('priceType').value
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
        shift: this.configuration.shift,
        priceType: this.configuration.priceType
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
