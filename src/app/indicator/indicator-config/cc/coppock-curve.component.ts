import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  selector: 'app-coppock-curve',
  templateUrl: './coppock-curve.component.html'
})
export class CoppockCurveComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'shortROCPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'longROCPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'priceType': ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      period: this.configForm.get('period').value,
      shortROCPeriod: this.configForm.get('shortROCPeriod').value,
      longROCPeriod: this.configForm.get('longROCPeriod').value,
      priceType: this.configForm.get('priceType').value
    });
  }

  private initForm() {
    if (this.configuration !== null && typeof this.configuration !== 'undefined') {
      this.configForm.setValue({
        period: this.configuration.period,
        shortROCPeriod: this.configuration.shortROCPeriod,
        longROCPeriod: this.configuration.longROCPeriod,
        priceType: this.configuration.priceType
      });
    }
  }

}
