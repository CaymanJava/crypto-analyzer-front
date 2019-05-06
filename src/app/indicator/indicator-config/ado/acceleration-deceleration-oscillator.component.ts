import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './acceleration-deceleration-oscillator.component.html'
})
export class AccelerationDecelerationOscillatorComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'slowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'fastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'smoothedPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        slowPeriod: this.configForm.get('slowPeriod').value,
        fastPeriod: this.configForm.get('fastPeriod').value,
        smoothedPeriod: this.configForm.get('smoothedPeriod').value
      }
    });
  }

  private initForm() {
    if (this.update) {
      this.configForm.setValue({
        slowPeriod: this.configuration.slowPeriod,
        fastPeriod: this.configuration.fastPeriod,
        smoothedPeriod: this.configuration.smoothedPeriod,
      });
    }
  }
}
