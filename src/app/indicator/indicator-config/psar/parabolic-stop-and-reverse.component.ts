import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  moduleId: module.id,
  templateUrl: './parabolic-stop-and-reverse.component.html'
})
export class ParabolicStopAndReverseComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'minAccelerationFactor': ['', [Validators.required, Validators.min(0.0001)]],
      'maxAccelerationFactor': ['', [Validators.required, Validators.min(0.0001)]]
    });
    this.drawConfigForm = this.fb.group({
      'indicatorColor': ['#7e05a1', Validators.required],
      'markerSize': ['5', Validators.required],
      'marker': ['star4', Validators.required],
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        minAccelerationFactor: this.configForm.get('minAccelerationFactor').value,
        maxAccelerationFactor: this.configForm.get('maxAccelerationFactor').value
      },
      drawConfiguration: {
        indicatorColor: this.drawConfigForm.get('indicatorColor').value,
        markerSize: this.drawConfigForm.get('markerSize').value,
        marker: this.drawConfigForm.get('marker').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        minAccelerationFactor: this.configuration.minAccelerationFactor,
        maxAccelerationFactor: this.configuration.maxAccelerationFactor
      });
      this.drawConfigForm.setValue({
        indicatorColor: this.drawConfiguration.indicatorColor,
        markerSize: this.drawConfiguration.markerSize,
        marker: this.drawConfiguration.marker
      });
    }
  }

}
