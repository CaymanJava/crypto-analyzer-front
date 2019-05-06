import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { BaseIndicatorComponent } from "../base/base-indicator.component";

@Component({
  selector: 'app-chande-forecast-oscillator',
  templateUrl: './chande-forecast-oscillator.component.html'
})
export class ChandeForecastOscillatorComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'movingAveragePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'movingAverageType': ['', [Validators.required]],
      'priceType': ['', [Validators.required]]
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', [Validators.required]],
      'signalLineColor': ['#fa0f16', [Validators.required]]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        period: this.configForm.get('period').value,
        movingAveragePeriod: this.configForm.get('movingAveragePeriod').value,
        movingAverageType: this.configForm.get('movingAverageType').value,
        priceType: this.configForm.get('priceType').value
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
        period: this.configuration.period,
        movingAveragePeriod: this.configuration.movingAveragePeriod,
        movingAverageType: this.configuration.movingAverageType,
        priceType: this.configuration.priceType
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        signalLineColor: this.drawConfiguration.signalLineColor
      });
    }
  }

}
