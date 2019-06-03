import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './elder-impulse-system.component.html'
})
export class ElderImpulseSystemComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'maPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'maType': ['', [Validators.required]],
      'maPriceType': ['', [Validators.required]],
      'macdMaType': ['', [Validators.required]],
      'macdPriceType': ['', [Validators.required]],
      'macdFastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'macdSlowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'macdSignalPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        maPeriod: this.configForm.get('maPeriod').value,
        maType: this.configForm.get('maType').value,
        maPriceType: this.configForm.get('maPriceType').value,
        macdMaType: this.configForm.get('macdMaType').value,
        macdPriceType: this.configForm.get('macdPriceType').value,
        macdFastPeriod: this.configForm.get('macdFastPeriod').value,
        macdSlowPeriod: this.configForm.get('macdSlowPeriod').value,
        macdSignalPeriod: this.configForm.get('macdSignalPeriod').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        maPeriod: this.configuration.maPeriod,
        maType: this.configuration.maType,
        maPriceType: this.configuration.maPriceType,
        macdMaType: this.configuration.macdMaType,
        macdPriceType: this.configuration.macdPriceType,
        macdFastPeriod: this.configuration.macdFastPeriod,
        macdSlowPeriod: this.configuration.macdSlowPeriod,
        macdSignalPeriod: this.configuration.macdSignalPeriod
      });
    }
  }

}
