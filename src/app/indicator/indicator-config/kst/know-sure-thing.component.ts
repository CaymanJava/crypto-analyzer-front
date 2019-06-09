import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './know-sure-thing.component.html'
})
export class KnowSureThingComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'priceType': ['', [Validators.required]],
      'lightestROCPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'lightestSMAPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'lightROCPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'lightSMAPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'heavyROCPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'heavySMAPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'heaviestROCPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'heaviestSMAPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'signalLinePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', Validators.required],
      'signalLineColor': ['#fa0f16', [Validators.required]]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        priceType: this.configForm.get('priceType').value,
        lightestROCPeriod: this.configForm.get('lightestROCPeriod').value,
        lightestSMAPeriod: this.configForm.get('lightestSMAPeriod').value,
        lightROCPeriod: this.configForm.get('lightROCPeriod').value,
        lightSMAPeriod: this.configForm.get('lightSMAPeriod').value,
        heavyROCPeriod: this.configForm.get('heavyROCPeriod').value,
        heavySMAPeriod: this.configForm.get('heavySMAPeriod').value,
        heaviestROCPeriod: this.configForm.get('heaviestROCPeriod').value,
        heaviestSMAPeriod: this.configForm.get('heaviestSMAPeriod').value,
        signalLinePeriod: this.configForm.get('signalLinePeriod').value
      },
      drawConfiguration: {
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value,
        signalLineColor: this.drawConfigForm.get('signalLineColor').value,
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        priceType: this.configuration.priceType,
        lightestROCPeriod: this.configuration.lightestROCPeriod,
        lightestSMAPeriod: this.configuration.lightestSMAPeriod,
        lightROCPeriod: this.configuration.lightROCPeriod,
        lightSMAPeriod: this.configuration.lightSMAPeriod,
        heavyROCPeriod: this.configuration.heavyROCPeriod,
        heavySMAPeriod: this.configuration.heavySMAPeriod,
        heaviestROCPeriod: this.configuration.heaviestROCPeriod,
        heaviestSMAPeriod: this.configuration.heaviestSMAPeriod,
        signalLinePeriod: this.configuration.signalLinePeriod
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        signalLineColor: this.drawConfiguration.signalLineColor
      });
    }
  }

}
