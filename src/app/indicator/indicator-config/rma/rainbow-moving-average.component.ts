import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './rainbow-moving-average.component.html'
})
export class RainbowMovingAverageComponent extends BaseIndicatorComponent {

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'priceType': ['', [Validators.required]],
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'firstMaColor': ['#fa0f16', Validators.required],
      'secondMaColor': ['#fa8a21', [Validators.required]],
      'thirdMaColor': ['#f9fa14', [Validators.required]],
      'fourthMaColor': ['#bdfa33', [Validators.required]],
      'fifthMaColor': ['#07962d', [Validators.required]],
      'sixthMaColor': ['#0cfaf7', [Validators.required]],
      'seventhMaColor': ['#1da2fa', [Validators.required]],
      'eighthMaColor': ['#4708fa', [Validators.required]],
      'ninthMaColor': ['#970ffa', [Validators.required]],
      'tenthMaColor': ['#fa08eb', [Validators.required]]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        priceType: this.configForm.get('priceType').value,
        period: this.configForm.get('period').value
      },
      drawConfiguration: {
        firstMaColor: this.drawConfigForm.get('firstMaColor').value,
        secondMaColor: this.drawConfigForm.get('secondMaColor').value,
        thirdMaColor: this.drawConfigForm.get('thirdMaColor').value,
        fourthMaColor: this.drawConfigForm.get('fourthMaColor').value,
        fifthMaColor: this.drawConfigForm.get('fifthMaColor').value,
        sixthMaColor: this.drawConfigForm.get('sixthMaColor').value,
        seventhMaColor: this.drawConfigForm.get('seventhMaColor').value,
        eighthMaColor: this.drawConfigForm.get('eighthMaColor').value,
        ninthMaColor: this.drawConfigForm.get('ninthMaColor').value,
        tenthMaColor: this.drawConfigForm.get('tenthMaColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        priceType: this.configuration.priceType,
        period: this.configuration.period
      });
      this.drawConfigForm.setValue({
        firstMaColor: this.drawConfiguration.firstMaColor,
        secondMaColor: this.drawConfiguration.secondMaColor,
        thirdMaColor: this.drawConfiguration.thirdMaColor,
        fourthMaColor: this.drawConfiguration.fourthMaColor,
        fifthMaColor: this.drawConfiguration.fifthMaColor,
        sixthMaColor: this.drawConfiguration.sixthMaColor,
        seventhMaColor: this.drawConfiguration.seventhMaColor,
        eighthMaColor: this.drawConfiguration.eighthMaColor,
        ninthMaColor: this.drawConfiguration.ninthMaColor,
        tenthMaColor: this.drawConfiguration.tenthMaColor
      });
    }
  }

}
