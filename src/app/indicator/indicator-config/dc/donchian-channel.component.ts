import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './donchian-channel.component.html'
})
export class DonchianChannelComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'highPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'lowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'dcTopColor': ['#0a2ecc', Validators.required],
      'dcBottomColor': ['#0a2ecc', Validators.required],
      'dcMiddleColor': ['#fa0f16', Validators.required],
      'dcChannelColor': ['#7276cc', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        highPeriod: this.configForm.get('highPeriod').value,
        lowPeriod: this.configForm.get('lowPeriod').value
      },
      drawConfiguration: {
        dcTopColor: this.drawConfigForm.get('dcTopColor').value,
        dcBottomColor: this.drawConfigForm.get('dcBottomColor').value,
        dcMiddleColor: this.drawConfigForm.get('dcMiddleColor').value,
        dcChannelColor: this.drawConfigForm.get('dcChannelColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        highPeriod: this.configuration.highPeriod,
        lowPeriod: this.configuration.lowPeriod
      });
      this.drawConfigForm.setValue({
        dcTopColor: this.drawConfiguration.dcTopColor,
        dcBottomColor: this.drawConfiguration.dcBottomColor,
        dcMiddleColor: this.drawConfiguration.dcMiddleColor,
        dcChannelColor: this.drawConfiguration.dcChannelColor
      });
    }
  }

}
