import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  moduleId: module.id,
  template: ''
})
export abstract class BaseIndicatorComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() drawConfiguration: any;
  @Input() update: boolean = false;
  @Input() id: string;

  configForm: FormGroup;
  drawConfigForm: FormGroup;

  onColorPickerChange(color: string, key: string) {
    this.drawConfigForm.get(key).setValue(color);
  }

  onMarkerSizeChange(size: number, key: string) {
    this.drawConfigForm.get(key).setValue(size);
  }

  onMarkerChange(marker: string, key: string) {
    this.drawConfigForm.get(key).setValue(marker);
  }

  abstract ngOnInit();

  abstract initForms();

  abstract onSubmit();

  abstract fillConfiguration();

}
