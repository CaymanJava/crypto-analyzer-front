import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './ichimoku-clouds.component.html'
})
export class IchimokuCloudsComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'conversionLinePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'baseLinePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'leadingSpanPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'displaced': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      "conversionLineColor": ['#2b17cc', Validators.required],
      "baseLineColor": ['#fa0cec', Validators.required],
      "leadingSpanAColor": ['#81cc29', Validators.required],
      "leadingSpanBColor": ['#fa0f16', Validators.required],
      "laggingSpanColor": ['#948b13', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        conversionLinePeriod: this.configForm.get('conversionLinePeriod').value,
        baseLinePeriod: this.configForm.get('baseLinePeriod').value,
        leadingSpanPeriod: this.configForm.get('leadingSpanPeriod').value,
        displaced: this.configForm.get('displaced').value
      },
      drawConfiguration: {
        conversionLineColor: this.drawConfigForm.get('conversionLineColor').value,
        baseLineColor: this.drawConfigForm.get('baseLineColor').value,
        leadingSpanAColor: this.drawConfigForm.get('leadingSpanAColor').value,
        leadingSpanBColor: this.drawConfigForm.get('leadingSpanBColor').value,
        laggingSpanColor: this.drawConfigForm.get('laggingSpanColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        conversionLinePeriod: this.configuration.conversionLinePeriod,
        baseLinePeriod: this.configuration.baseLinePeriod,
        leadingSpanPeriod: this.configuration.leadingSpanPeriod,
        displaced: this.configuration.displaced
      });
      this.drawConfigForm.setValue({
        conversionLineColor: this.drawConfiguration.conversionLineColor,
        baseLineColor: this.drawConfiguration.baseLineColor,
        leadingSpanAColor: this.drawConfiguration.leadingSpanAColor,
        leadingSpanBColor: this.drawConfiguration.leadingSpanBColor,
        laggingSpanColor: this.drawConfiguration.laggingSpanColor
      });
    }
  }

}
