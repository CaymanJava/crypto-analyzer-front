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

  onColorPickerChange(color: string, line: string) {
    this.drawConfigForm.get(line).setValue(color);
  }

  abstract ngOnInit();

  abstract initForms();

  abstract onSubmit();

  abstract fillConfiguration();

}
