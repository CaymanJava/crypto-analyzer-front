import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  selector: 'app-chande-forecast-oscillator',
  templateUrl: './chande-forecast-oscillator.component.html'
})
export class ChandeForecastOscillatorComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'movingAveragePeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'movingAverageType': ['', [Validators.required]],
      'priceType': ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      period: this.configForm.get('period').value,
      movingAveragePeriod: this.configForm.get('movingAveragePeriod').value,
      movingAverageType: this.configForm.get('movingAverageType').value,
      priceType: this.configForm.get('priceType').value,
    });
  }

  private initForm() {
    if (this.configuration !== null && typeof this.configuration !== 'undefined') {
      this.configForm.setValue({
        period: this.configuration.period,
        movingAveragePeriod: this.configuration.movingAveragePeriod,
        movingAverageType: this.configuration.movingAverageType,
        priceType: this.configuration.priceType
      });
    }
  }

}
