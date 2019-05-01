import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { PositiveNumberValidator } from "../../../shared/validators/positive-number-validator";

@Component({
  moduleId: module.id,
  templateUrl: './average-true-range-bands.component.html'
})
export class AverageTrueRangeBandsComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'shift': ['', [Validators.required, PositiveNumberValidator.valid]],
      'priceType': ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      period: this.configForm.get('period').value,
      shift: this.configForm.get('shift').value,
      priceType: this.configForm.get('priceType').value
    });
  }

  private initForm() {
    if (this.configuration !== null && typeof this.configuration !== 'undefined') {
      this.configForm.setValue({
        period: this.configuration.period,
        shift: this.configuration.shift,
        priceType: this.configuration.priceType
      });
    }
  }

}
