import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { PositiveNumberValidator } from "../../../shared/validators/positive-number-validator";

@Component({
  moduleId: module.id,
  templateUrl: './accumulative-swing-index.component.html'
})
export class AccumulativeSwingIndexComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'limitMoveValue': ['', [Validators.required, PositiveNumberValidator.valid]],
      'movingAverageType': ['', [Validators.required]],
      'movingAveragePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      limitMoveValue: this.configForm.get('limitMoveValue').value,
      movingAverageType: this.configForm.get('movingAverageType').value,
      movingAveragePeriod: this.configForm.get('movingAveragePeriod').value
    });
  }

  private initForm() {
    if (this.configuration !== null && typeof this.configuration !== 'undefined') {
      this.configForm.setValue({
        limitMoveValue: this.configuration.limitMoveValue,
        movingAverageType: this.configuration.movingAverageType,
        movingAveragePeriod: this.configuration.movingAveragePeriod
      });
    }
  }

}
