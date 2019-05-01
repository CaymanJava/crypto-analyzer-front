import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  selector: 'app-bollinger-bands',
  templateUrl: './bollinger-bands.component.html'
})
export class BollingerBandsComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'priceType': ['', [Validators.required]],
      'standardDeviationCoefficient': ['', [Validators.required, Validators.min(1.00001)]],
      'movingAverageType': ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      period: this.configForm.get('period').value,
      priceType: this.configForm.get('priceType').value,
      standardDeviationCoefficient: this.configForm.get('standardDeviationCoefficient').value,
      movingAverageType: this.configForm.get('movingAverageType').value,
    });
  }

  private initForm() {
    if (this.configuration !== null && typeof this.configuration !== 'undefined') {
      this.configForm.setValue({
        period: this.configuration.period,
        priceType: this.configuration.priceType,
        standardDeviationCoefficient: this.configuration.standardDeviationCoefficient,
        movingAverageType: this.configuration.movingAverageType,
      });
    }
  }

}
