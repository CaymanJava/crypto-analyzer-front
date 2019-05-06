import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './average-directional-movement-index.component.html'
})
export class AverageDirectionalMovementIndexComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() drawConfiguration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;
  drawConfigForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
    });
    this.drawConfigForm = fb.group({
      'positiveDiLineColor': ['#3ba158', Validators.required],
      'negativeDiLineColor': ['#fa0f16', Validators.required],
      'indicatorLineColor': ['#1c1afa', Validators.required],
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        period: this.configForm.get('period').value
      },
      drawConfiguration: {
        positiveDiLineColor: this.drawConfigForm.get('positiveDiLineColor').value,
        negativeDiLineColor: this.drawConfigForm.get('negativeDiLineColor').value,
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value
      }
    });
  }

  onColorPickerChange(color: string, line: string) {
    this.drawConfigForm.get(line).setValue(color);
  }

  private initForm() {
    if (this.update) {
      this.configForm.setValue({
        period: this.configuration.period
      });
      this.drawConfigForm.setValue({
        positiveDiLineColor: this.drawConfiguration.positiveDiLineColor,
        negativeDiLineColor: this.drawConfiguration.negativeDiLineColor,
        indicatorLineColor: this.drawConfiguration.indicatorLineColor
      });
    }
  }

}
