import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { BaseIndicatorComponent } from "../base/base-indicator.component";

@Component({
  moduleId: module.id,
  templateUrl: './aroon.component.html'
})
export class AroonComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'aroonUpLineColor': ['#3ba158', Validators.required],
      'aroonDownLineColor': ['#fa0f16', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        period: this.configForm.get('period').value
      },
      drawConfiguration: {
        aroonUpLineColor: this.drawConfigForm.get('aroonUpLineColor').value,
        aroonDownLineColor: this.drawConfigForm.get('aroonDownLineColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        period: this.configuration.period
      });
      this.drawConfigForm.setValue({
        aroonUpLineColor: this.drawConfiguration.aroonUpLineColor,
        aroonDownLineColor: this.drawConfiguration.aroonDownLineColor
      });
    }
  }

}
