import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  moduleId: module.id,
  template: ''
})
export abstract class BaseStrategyConfigComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() drawConfiguration: any;

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

  positionsSelected(positions: any, key: string) {
    this.configForm.get(key).setValue(positions);
  }

  abstract ngOnInit();

  abstract initForms();

  abstract onSubmit();

  abstract fillConfiguration();

}
