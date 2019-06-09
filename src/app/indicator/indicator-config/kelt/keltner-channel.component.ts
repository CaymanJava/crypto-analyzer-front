import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './keltner-channel.component.html'
})
export class KeltnerChannelComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'priceType': ['', [Validators.required]],
      'movingAverageType': ['', [Validators.required]],
      'movingAveragePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'averageTrueRangePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'averageTrueRangeShift': ['', [Validators.required, Validators.min(0.01)]]
    });
    this.drawConfigForm = this.fb.group({
      'topBandColor': ['#cc7c17', Validators.required],
      'bottomBandColor': ['#cc7c17', Validators.required],
      'middleBandColor': ['#fa0f16', Validators.required],
      'channelColor': ['#11ccbb', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        priceType: this.configForm.get('priceType').value,
        movingAverageType: this.configForm.get('movingAverageType').value,
        movingAveragePeriod: this.configForm.get('movingAveragePeriod').value,
        averageTrueRangePeriod: this.configForm.get('averageTrueRangePeriod').value,
        averageTrueRangeShift: this.configForm.get('averageTrueRangeShift').value
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
        priceType: this.configuration.priceType,
        movingAverageType: this.configuration.movingAverageType,
        movingAveragePeriod: this.configuration.movingAveragePeriod,
        averageTrueRangePeriod: this.configuration.averageTrueRangePeriod,
        averageTrueRangeShift: this.configuration.averageTrueRangeShift
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
