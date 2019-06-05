import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { PositiveNumberValidator } from "../../../shared/validators/positive-number-validator";

@Component({
  moduleId: module.id,
  templateUrl: './moving-average-envelopes.component.html'
})
export class MovingAverageEnvelopesComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'movingAveragePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'indentationPercentage': ['', [Validators.required, PositiveNumberValidator.valid, Validators.max(100)]],
      'movingAverageType': ['', [Validators.required]]
    });
    this.drawConfigForm = this.fb.group({
      'topBandColor': ['#0a2ecc', Validators.required],
      'bottomBandColor': ['#0a2ecc', Validators.required],
      'middleBandColor': ['#fa0f16', Validators.required],
      'channelColor': ['#7276cc', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        movingAveragePeriod: this.configForm.get('movingAveragePeriod').value,
        indentationPercentage: this.configForm.get('indentationPercentage').value,
        movingAverageType: this.configForm.get('movingAverageType').value
      },
      drawConfiguration: {
        topBandColor: this.drawConfigForm.get('topBandColor').value,
        bottomBandColor: this.drawConfigForm.get('bottomBandColor').value,
        middleBandColor: this.drawConfigForm.get('middleBandColor').value,
        channelColor: this.drawConfigForm.get('channelColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        movingAveragePeriod: this.configuration.movingAveragePeriod,
        indentationPercentage: this.configuration.indentationPercentage,
        movingAverageType: this.configuration.movingAverageType
      });
      this.drawConfigForm.setValue({
        topBandColor: this.drawConfiguration.topBandColor,
        bottomBandColor: this.drawConfiguration.bottomBandColor,
        middleBandColor: this.drawConfiguration.middleBandColor,
        channelColor: this.drawConfiguration.channelColor
      });
    }
  }

}
