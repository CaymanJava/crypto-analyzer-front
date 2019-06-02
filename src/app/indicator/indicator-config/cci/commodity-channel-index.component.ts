import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { BaseIndicatorComponent } from "../base/base-indicator.component";

@Component({
  moduleId: module.id,
  templateUrl: './commodity-channel-index.component.html'
})
export class CommodityChannelIndexComponent extends BaseIndicatorComponent {

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
      'overbought': [100, [Validators.required, Validators.min(0)]],
      'oversold': [-100, [Validators.required, Validators.max(0)]],
      'indicatorLineColor': ['#0a2ecc', Validators.required]
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
        overbought: this.drawConfigForm.get('overbought').value,
        oversold: this.drawConfigForm.get('oversold').value,
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        period: this.configuration.period,
      });
      this.drawConfigForm.setValue({
        overbought: this.drawConfiguration.overbought,
        oversold: this.drawConfiguration.oversold,
        indicatorLineColor: this.drawConfiguration.indicatorLineColor
      });
    }
  }

}
