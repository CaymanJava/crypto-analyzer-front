import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  selector: 'app-choppiness-index',
  templateUrl: './choppiness-index.component.html'
})
export class ChoppinessIndexComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'period' : ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'overbought' : [61.8, [Validators.required, Validators.min(0), Validators.max(100)]],
      'oversold' : [38.2, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      period: this.configForm.get('period').value,
      overbought: this.configForm.get('overbought').value,
      oversold: this.configForm.get('oversold').value
    });
  }

  private initForm() {
    if (this.configuration !== null && typeof this.configuration !== 'undefined') {
      this.configForm.setValue({
        period: this.configuration.period,
        overbought: this.configuration.overbought,
        oversold: this.configuration.oversold
      });
    }
  }

}
