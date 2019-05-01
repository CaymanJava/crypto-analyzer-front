import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './average-true-range.component.html'
})
export class AverageTrueRangeComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'movingAverageType': ['', [Validators.required]],
      'movingAveragePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      period: this.configForm.get('period').value,
      movingAverageType: this.configForm.get('movingAverageType').value,
      movingAveragePeriod: this.configForm.get('movingAveragePeriod').value
    });
  }

  private initForm() {
    if (this.configuration !== null && typeof this.configuration !== 'undefined') {
      this.configForm.setValue({
        period: this.configuration.period,
        movingAverageType: this.configuration.movingAverageType,
        movingAveragePeriod: this.configuration.movingAveragePeriod
      });
    }
  }

}
