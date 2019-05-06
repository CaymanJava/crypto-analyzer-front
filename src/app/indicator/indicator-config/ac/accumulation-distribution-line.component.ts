import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-accumulation-distribution-line',
  templateUrl: './accumulation-distribution-line.component.html'
})
export class AccumulationDistributionLineComponent implements OnInit {

  @Input() name: string;
  @Input() drawConfiguration: any;
  @Input() update: boolean = false;

  drawConfigForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.drawConfigForm = fb.group({
      'indicatorLineColor': ['#2722d8', Validators.required]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      configuration: {},
      drawConfiguration: {
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value
      }
    });
  }

  onColorPickerChange(color: string) {
    this.drawConfigForm.get('indicatorLineColor').setValue(color);
  }

  private initForm() {
    if (this.update) {
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor
      });
    }
  }

}
