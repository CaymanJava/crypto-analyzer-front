import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './high-low-bands.component.html'
})
export class HighLowBandsComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'priceType': ['', [Validators.required]],
      'shiftPercentage': ['', [Validators.required, Validators.min(1.00001)]],
    });
    this.drawConfigForm = this.fb.group({
      'topBandColor': ['#2b17cc', Validators.required],
      'bottomBandColor': ['#2b17cc', Validators.required],
      'middleBandColor': ['#fa0f16', Validators.required],
      'channelColor': ['#81cc29', Validators.required]
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
        shiftPercentage: this.configForm.get('shiftPercentage').value
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
        shiftPercentage: this.configuration.shiftPercentage
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
