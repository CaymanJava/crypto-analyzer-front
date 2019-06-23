import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './mass-index.component.html'
})
export class MassIndexComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', Validators.required],
      'firstReversalLine': [27, [Validators.required]],
      'secondReversalLine': [26.5, [Validators.required]]
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
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value,
        firstReversalLine: this.drawConfigForm.get('firstReversalLine').value,
        secondReversalLine: this.drawConfigForm.get('secondReversalLine').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        period: this.configuration.period
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        firstReversalLine: this.drawConfiguration.firstReversalLine,
        secondReversalLine: this.drawConfiguration.secondReversalLine
      });
    }
  }

}