import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  moduleId: module.id,
  templateUrl: './moving-average.component.html'
})
export class MovingAverageComponent extends BaseIndicatorComponent {

  typesWithAlphaCoefficient = new Set<string>();
  validators: any;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'indicatorType': ['', [Validators.required]],
      'originalIndicatorType': [''],
      'shiftType': [''],
      'shiftValue': [''],
      'priceType': ['', [Validators.required]],
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'alphaCoefficient': [''],
    });
    this.drawConfigForm = this.fb.group({
      'indicatorLineColor': ['#1c1afa', Validators.required]
    });

    this.validators = {
      'originalIndicatorType': [Validators.required],
      'shiftType': [Validators.required],
      'shiftValue': [Validators.required, Validators.min(1), NotDecimalValidator.valid],
      'alphaCoefficient': [Validators.min(0.01)],
    };
  }

  ngOnInit() {
    this.fillConfiguration();
    this.initAlphaCoefficientMaTypes();
    this.enableControls();
  }

  onIndicatorTypeChange(type: string) {
    if (type === 'DISPLACED_MOVING_AVERAGE') {
      this.enableControl('originalIndicatorType');
      this.enableControl('shiftType');
      this.enableControl('shiftValue');
      this.disableControl('alphaCoefficient');
    } else {
      this.disableControl('originalIndicatorType');
      this.disableControl('shiftType');
      this.disableControl('shiftValue');
      if (this.typesWithAlphaCoefficient.has(type)) {
        this.enableControl('alphaCoefficient');
      }
    }
  }

  onOriginalIndicatorTypeChange(type: string) {
    if (this.typesWithAlphaCoefficient.has(type)) {
      this.enableControl('alphaCoefficient');
    } else {
      this.disableControl('alphaCoefficient');
    }
  }

  isMaWithAlphaCoefficient() {
    const indicatorType = this.configForm.get('indicatorType').value;
    const originalIndicatorType = this.configForm.get('originalIndicatorType').value; // only in DISPLACED_MOVING_AVERAGE case

    if (indicatorType == null) {
      return false;
    }

    if (indicatorType === 'DISPLACED_MOVING_AVERAGE') {
      return originalIndicatorType != null && this.typesWithAlphaCoefficient.has(originalIndicatorType);
    }

    return this.typesWithAlphaCoefficient.has(indicatorType);
  }

  enableControl(control: string) {
    this.configForm.get(control).enable();
    this.configForm.get(control).setValidators(this.validators[control]);
    this.configForm.get(control).updateValueAndValidity();
  }

  disableControl(control: string) {
    this.configForm.get(control).disable();
    this.configForm.get(control).setValidators(null);
    this.configForm.get(control).markAsUntouched();
    this.configForm.get(control).updateValueAndValidity();
    this.configForm.get(control).setValue('');
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        indicatorType: this.configForm.get('indicatorType').value,
        originalIndicatorType: this.configForm.get('originalIndicatorType').value,
        shift: this.configForm.get('indicatorType').value == 'DISPLACED_MOVING_AVERAGE' ?
          {
            type: this.configForm.get('shiftType').value,
            value: this.configForm.get('shiftValue').value
          }
          : null,
        priceType: this.configForm.get('priceType').value,
        period: this.configForm.get('period').value,
        alphaCoefficient: this.configForm.get('alphaCoefficient').value
      },
      drawConfiguration: {
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        indicatorType: this.configuration.indicatorType,
        originalIndicatorType: this.configuration.originalIndicatorType,
        shiftType: this.configuration.shift == null ? null : this.configuration.shift.type,
        shiftValue: this.configuration.shift == null ? null : this.configuration.shift.value,
        priceType: this.configuration.priceType,
        period: this.configuration.period,
        alphaCoefficient: this.configuration.alphaCoefficient
      });
      this.drawConfigForm.setValue({
        indicatorLineColor: this.drawConfiguration.indicatorLineColor
      });
    }
  }

  private initAlphaCoefficientMaTypes() {
    this.typesWithAlphaCoefficient.add('DISPLACED_MOVING_AVERAGE');
    this.typesWithAlphaCoefficient.add('EXPONENTIAL_MOVING_AVERAGE');
    this.typesWithAlphaCoefficient.add('DOUBLE_EXPONENTIAL_MOVING_AVERAGE');
    this.typesWithAlphaCoefficient.add('TRIPLE_EXPONENTIAL_MOVING_AVERAGE');
  }

  private enableControls() {
    if (this.configForm.get('indicatorType').value == 'DISPLACED_MOVING_AVERAGE') {
      this.enableControl('originalIndicatorType');
      this.enableControl('shiftType');
      this.enableControl('shiftValue');
      this.enableControl('alphaCoefficient');
    }
  }

}
