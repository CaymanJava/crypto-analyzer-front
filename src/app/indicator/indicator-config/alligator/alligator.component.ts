import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './alligator.component.html'
})
export class AlligatorComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'jawPeriod' : ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'jawOffset' : ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'teethPeriod' : ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'teethOffset' : ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'lipsPeriod' : ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'lipsOffset' : ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      jawPeriod: this.configForm.get('jawPeriod').value,
      jawOffset: this.configForm.get('jawOffset').value,
      teethPeriod: this.configForm.get('teethPeriod').value,
      teethOffset: this.configForm.get('teethOffset').value,
      lipsPeriod: this.configForm.get('lipsPeriod').value,
      lipsOffset: this.configForm.get('lipsOffset').value
    });
  }

  private initForm() {
    if (this.configuration !== null && typeof this.configuration !== 'undefined') {
      this.configForm.setValue({
        jawPeriod: this.configuration.jawPeriod,
        jawOffset: this.configuration.jawOffset,
        teethPeriod: this.configuration.teethPeriod,
        teethOffset: this.configuration.teethOffset,
        lipsPeriod: this.configuration.lipsPeriod,
        lipsOffset: this.configuration.lipsOffset
      });
    }
  }

}
