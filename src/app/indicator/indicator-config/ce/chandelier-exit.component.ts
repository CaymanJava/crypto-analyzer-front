import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  selector: 'app-chandelier-exit',
  templateUrl: './chandelier-exit.component.html'
})
export class ChandelierExitComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'period' : ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'longFactor' : ['', [Validators.required, Validators.min(0)]],
      'shortFactor' : ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      period: this.configForm.get('period').value,
      longFactor: this.configForm.get('longFactor').value,
      shortFactor: this.configForm.get('shortFactor').value
    });
  }

  private initForm() {
    if (this.configuration !== null && typeof this.configuration !== 'undefined') {
      this.configForm.setValue({
        period: this.configuration.period,
        longFactor: this.configuration.longFactor,
        shortFactor: this.configuration.shortFactor
      });
    }
  }

}
