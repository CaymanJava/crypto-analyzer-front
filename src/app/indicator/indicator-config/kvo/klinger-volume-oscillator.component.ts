import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './klinger-volume-oscillator.component.html'
})
export class KlingerVolumeOscillatorComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'shortPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'longPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'signalPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
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
        shortPeriod: this.configForm.get('shortPeriod').value,
        longPeriod: this.configForm.get('longPeriod').value,
        signalPeriod: this.configForm.get('signalPeriod').value
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
        shortPeriod: this.configuration.shortPeriod,
        longPeriod: this.configuration.longPeriod,
        signalPeriod: this.configuration.signalPeriod
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        signalLineColor: this.drawConfiguration.signalLineColor
      });
    }
  }

}
