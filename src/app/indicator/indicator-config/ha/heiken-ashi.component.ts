import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  moduleId: module.id,
  templateUrl: './heiken-ashi.component.html'
})
export class HeikenAshiComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.drawConfigForm = this.fb.group({
      'risingBarColor': ['#3ba158', Validators.required],
      'fallingBarColor': ['#fa0f16', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  fillConfiguration() {
    if (this.update) {
      this.drawConfigForm.setValue({
        risingBarColor: this.drawConfiguration.risingBarColor,
        fallingBarColor: this.drawConfiguration.fallingBarColor
      });
    }
  }

  onSubmit() {
    this.modal.close({
      configuration: {},
      drawConfiguration: {
        risingBarColor: this.drawConfigForm.get('risingBarColor').value,
        fallingBarColor: this.drawConfigForm.get('fallingBarColor').value
      }
    });
  }

}
