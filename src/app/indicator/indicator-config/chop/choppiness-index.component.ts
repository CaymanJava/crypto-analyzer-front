import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { BaseIndicatorComponent } from "../base/base-indicator.component";

@Component({
  selector: 'app-choppiness-index',
  templateUrl: './choppiness-index.component.html'
})
export class ChoppinessIndexComponent extends BaseIndicatorComponent {

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
      'indicatorLineColor': ['#1c1afa', [Validators.required]],
      'overbought': [61.8, [Validators.required, Validators.min(0), Validators.max(100)]],
      'oversold': [38.2, [Validators.required, Validators.min(0), Validators.max(100)]]
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
        overbought: this.drawConfigForm.get('overbought').value,
        oversold: this.drawConfigForm.get('oversold').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        period: this.configuration.period,
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor,
        overbought: this.drawConfiguration.overbought,
        oversold: this.drawConfiguration.oversold
      });
    }
  }

}
