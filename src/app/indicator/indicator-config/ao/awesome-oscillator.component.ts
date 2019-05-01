import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './awesome-oscillator.component.html'
})
export class AwesomeOscillatorComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'slowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'fastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      slowPeriod: this.configForm.get('slowPeriod').value,
      fastPeriod: this.configForm.get('fastPeriod').value
    });
  }

  private initForm() {
    if (this.configuration !== null && typeof this.configuration !== 'undefined') {
      this.configForm.setValue({
        slowPeriod: this.configuration.slowPeriod,
        fastPeriod: this.configuration.fastPeriod
      });
    }
  }

}
