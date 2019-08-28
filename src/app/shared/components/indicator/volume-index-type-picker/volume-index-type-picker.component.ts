import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-volume-index-type-picker',
  templateUrl: './volume-index-type-picker.component.html'
})
export class VolumeIndexTypePickerComponent implements OnInit {

  @Input() configForm: FormGroup;
  @Input() key: string;
  @Input() label = 'Volume index type';

  constructor() {
  }

  ngOnInit() {
  }

  onChange(type) {
    this.configForm.get(this.key).setValue(type);
  }

}
