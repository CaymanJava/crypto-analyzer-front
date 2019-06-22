import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './percentage-price-oscillator.component.html'
})
export class PercentagePriceOscillatorComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'movingAverageType': ['', [Validators.required]],
      'priceType': ['', [Validators.required]],
      'fastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'slowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'signalPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', Validators.required],
      'signalLineColor': ['#fa0f16', [Validators.required]],
      'barChartColor': ['#4e4e76', [Validators.required]],
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        movingAverageType: this.configForm.get('movingAverageType').value,
        priceType: this.configForm.get('priceType').value,
        fastPeriod: this.configForm.get('fastPeriod').value,
        slowPeriod: this.configForm.get('slowPeriod').value,
        signalPeriod: this.configForm.get('signalPeriod').value
      },
      drawConfiguration: {
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value,
        signalLineColor: this.drawConfigForm.get('signalLineColor').value,
        barChartColor: this.drawConfigForm.get('barChartColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        movingAverageType: this.configuration.movingAverageType,
        priceType: this.configuration.priceType,
        fastPeriod: this.configuration.fastPeriod,
        slowPeriod: this.configuration.slowPeriod,
        signalPeriod: this.configuration.signalPeriod
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        signalLineColor: this.drawConfiguration.signalLineColor,
        barChartColor: this.drawConfiguration.barChartColor
      });
    }
  }

}
