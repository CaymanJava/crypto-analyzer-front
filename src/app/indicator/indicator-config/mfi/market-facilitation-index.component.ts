import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  moduleId: module.id,
  templateUrl: './market-facilitation-index.component.html'
})
export class MarketFacilitationIndexComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.drawConfigForm = this.fb.group({
      'indicatorUpVolumeUp': ['#15d87f', Validators.required],
      'indicatorUpVolumeDown': ['#cc631a', Validators.required],
      'indicatorDownVolumeUp': ['#2722d8', Validators.required],
      'indicatorDownVolumeDown': ['#d8159c', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  fillConfiguration() {
    if (this.update) {
      this.drawConfigForm.setValue({
        indicatorUpVolumeUp: this.drawConfiguration.indicatorUpVolumeUp,
        indicatorUpVolumeDown: this.drawConfiguration.indicatorUpVolumeDown,
        indicatorDownVolumeUp: this.drawConfiguration.indicatorDownVolumeUp,
        indicatorDownVolumeDown: this.drawConfiguration.indicatorDownVolumeDown,
      });
    }
  }

  onSubmit() {
    this.modal.close({
      configuration: {},
      drawConfiguration: {
        indicatorUpVolumeUp: this.drawConfigForm.get('indicatorUpVolumeUp').value,
        indicatorUpVolumeDown: this.drawConfigForm.get('indicatorUpVolumeDown').value,
        indicatorDownVolumeUp: this.drawConfigForm.get('indicatorDownVolumeUp').value,
        indicatorDownVolumeDown: this.drawConfigForm.get('indicatorDownVolumeDown').value,
      }
    });
  }

}
