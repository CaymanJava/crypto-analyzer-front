import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { BaseIndicatorComponent } from "../base/base-indicator.component";

@Component({
  selector: 'app-accumulation-distribution-line',
  templateUrl: './accumulation-distribution-line.component.html'
})
export class AccumulationDistributionLineComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#2722d8', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  fillConfiguration() {
    if (this.update) {
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor
      });
    }
  }

  onSubmit() {
    this.modal.close({
      configuration: {},
      drawConfiguration: {
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value
      }
    });
  }

}
