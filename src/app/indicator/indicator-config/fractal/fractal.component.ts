import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  moduleId: module.id,
  templateUrl: './fractal.component.html'
})
export class FractalComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.drawConfigForm = this.fb.group({
      'upFractalColor': ['#3ba158', Validators.required],
      'downFractalColor': ['#fa0f16', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  fillConfiguration() {
    if (this.update) {
      this.drawConfigForm.setValue({
        upFractalColor: this.drawConfiguration.upFractalColor,
        downFractalColor: this.drawConfiguration.downFractalColor
      });
    }
  }

  onSubmit() {
    this.modal.close({
      configuration: {},
      drawConfiguration: {
        upFractalColor: this.drawConfigForm.get('upFractalColor').value,
        downFractalColor: this.drawConfigForm.get('downFractalColor').value
      }
    });
  }

}
