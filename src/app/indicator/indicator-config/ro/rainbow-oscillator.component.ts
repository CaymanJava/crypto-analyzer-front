import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './rainbow-oscillator.component.html'
})
export class RainbowOscillatorComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'priceType': ['', [Validators.required]],
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'highLowLookBack': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'upperEnvelopeColor': ['#3ba158', Validators.required],
      'lowerEnvelopeColor': ['#fa0f16', [Validators.required]]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        priceType: this.configForm.get('priceType').value,
        period: this.configForm.get('period').value,
        highLowLookBack: this.configForm.get('highLowLookBack').value
      },
      drawConfiguration: {
        upperEnvelopeColor: this.drawConfigForm.get('upperEnvelopeColor').value,
        lowerEnvelopeColor: this.drawConfigForm.get('lowerEnvelopeColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        priceType: this.configuration.priceType,
        period: this.configuration.period,
        highLowLookBack: this.configuration.highLowLookBack
      });
      this.drawConfigForm.setValue({
        upperEnvelopeColor: this.drawConfiguration.upperEnvelopeColor,
        lowerEnvelopeColor: this.drawConfiguration.lowerEnvelopeColor
      });
    }
  }

}
