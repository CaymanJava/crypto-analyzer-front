import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { BaseIndicatorComponent } from "../base/base-indicator.component";

@Component({
  moduleId: module.id,
  templateUrl: './alligator.component.html'
})
export class AlligatorComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'jawPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'jawOffset': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'teethPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'teethOffset': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'lipsPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'lipsOffset': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'jawLineColor': ['#1c1afa', Validators.required],
      'teethLineColor': ['#fa0f16', Validators.required],
      'lipsLineColor': ['#3ba158', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        jawPeriod: this.configForm.get('jawPeriod').value,
        jawOffset: this.configForm.get('jawOffset').value,
        teethPeriod: this.configForm.get('teethPeriod').value,
        teethOffset: this.configForm.get('teethOffset').value,
        lipsPeriod: this.configForm.get('lipsPeriod').value,
        lipsOffset: this.configForm.get('lipsOffset').value
      },
      drawConfiguration: {
        jawLineColor: this.drawConfigForm.get('jawLineColor').value,
        teethLineColor: this.drawConfigForm.get('teethLineColor').value,
        lipsLineColor: this.drawConfigForm.get('lipsLineColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        jawPeriod: this.configuration.jawPeriod,
        jawOffset: this.configuration.jawOffset,
        teethPeriod: this.configuration.teethPeriod,
        teethOffset: this.configuration.teethOffset,
        lipsPeriod: this.configuration.lipsPeriod,
        lipsOffset: this.configuration.lipsOffset
      });
      this.drawConfigForm.setValue({
        jawLineColor: this.drawConfiguration.jawLineColor,
        teethLineColor: this.drawConfiguration.teethLineColor,
        lipsLineColor: this.drawConfiguration.lipsLineColor
      });
    }
  }

}
