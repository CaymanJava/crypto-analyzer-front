import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './connors-relative-strength-index.component.html'
})
export class ConnorsRelativeStrengthIndexComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'movingAverageType': ['', [Validators.required]],
      'simpleRsiPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'streakRsiPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'percentRankPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', [Validators.required]],
      'overbought': [80, [Validators.required, Validators.min(0), Validators.max(100)]],
      'oversold': [20, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        movingAverageType: this.configForm.get('movingAverageType').value,
        simpleRsiPeriod: this.configForm.get('simpleRsiPeriod').value,
        streakRsiPeriod: this.configForm.get('streakRsiPeriod').value,
        percentRankPeriod: this.configForm.get('percentRankPeriod').value
      },
      drawConfiguration: {
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value,
        overbought: this.drawConfigForm.get('overbought').value,
        oversold: this.drawConfigForm.get('oversold').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        movingAverageType: this.configuration.movingAverageType,
        simpleRsiPeriod: this.configuration.simpleRsiPeriod,
        streakRsiPeriod: this.configuration.streakRsiPeriod,
        percentRankPeriod: this.configuration.percentRankPeriod
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        overbought: this.drawConfiguration.overbought,
        oversold: this.drawConfiguration.oversold
      });
    }
  }

}
