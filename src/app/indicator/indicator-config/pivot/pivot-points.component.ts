import { Component } from '@angular/core';
import { BaseIndicatorComponent } from "../base/base-indicator.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  moduleId: module.id,
  templateUrl: './pivot-points.component.html'
})
export class PivotPointsComponent extends BaseIndicatorComponent {

  secondLineTypes = new Set<string>();
  thirdLineTypes = new Set<string>();
  fourthLineTypes = new Set<string>();

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'indicatorType': ['', [Validators.required]]
    });
    this.drawConfigForm = this.fb.group({
      'pivotColor': ['#1c1afa', Validators.required],
      'firstResistanceColor': ['#0cbb3b', Validators.required],
      'secondResistanceColor': ['#fa1c30', Validators.required],
      'thirdResistanceColor': ['#fa9a12', Validators.required],
      'fourthResistanceColor': ['#a00796', Validators.required],
      'firstSupportColor': ['#0cbb3b', Validators.required],
      'secondSupportColor': ['#fa1c30', Validators.required],
      'thirdSupportColor': ['#fa9a12', Validators.required],
      'fourthSupportColor': ['#a00796', Validators.required]
    });
  }

  ngOnInit() {
    this.fillConfiguration();
    this.initLineTypes();
  }

  initLineTypes() {
    this.initSecondLineTypes();
    this.initThirdLineTypes();
    this.initFourthLineTypes();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        indicatorType: this.configForm.get('indicatorType').value
      },
      drawConfiguration: {
        pivotColor: this.drawConfigForm.get('pivotColor').value,
        firstResistanceColor: this.drawConfigForm.get('firstResistanceColor').value,
        secondResistanceColor: this.drawConfigForm.get('secondResistanceColor').value,
        thirdResistanceColor: this.drawConfigForm.get('thirdResistanceColor').value,
        fourthResistanceColor: this.drawConfigForm.get('fourthResistanceColor').value,
        firstSupportColor: this.drawConfigForm.get('firstSupportColor').value,
        secondSupportColor: this.drawConfigForm.get('secondSupportColor').value,
        thirdSupportColor: this.drawConfigForm.get('thirdSupportColor').value,
        fourthSupportColor: this.drawConfigForm.get('fourthSupportColor').value
      }
    });
  }

  fillConfiguration() {
    if (this.update) {
      this.configForm.setValue({
        indicatorType: this.configuration.indicatorType
      });
      this.drawConfigForm.setValue({
        pivotColor: this.drawConfiguration.pivotColor,
        firstResistanceColor: this.drawConfiguration.firstResistanceColor,
        secondResistanceColor: this.drawConfiguration.secondResistanceColor,
        thirdResistanceColor: this.drawConfiguration.thirdResistanceColor,
        fourthResistanceColor: this.drawConfiguration.fourthResistanceColor,
        firstSupportColor: this.drawConfiguration.firstSupportColor,
        secondSupportColor: this.drawConfiguration.secondSupportColor,
        thirdSupportColor: this.drawConfiguration.thirdSupportColor,
        fourthSupportColor: this.drawConfiguration.fourthSupportColor
      });
    }
  }

  hasPivotTypeChosen() {
    return this.configForm.get('indicatorType').valid;
  }

  isPivotLineEnable() {
    return this.configForm.get('indicatorType').value != 'DE_MARK_PIVOT_POINTS';
  }

  isSecondLineEnable() {
    return this.secondLineTypes.has(this.configForm.get('indicatorType').value);
  }

  isThirdLineEnable() {
    return this.thirdLineTypes.has(this.configForm.get('indicatorType').value);
  }

  isFourthLineEnable() {
    return this.fourthLineTypes.has(this.configForm.get('indicatorType').value);
  }

  private initSecondLineTypes() {
    this.secondLineTypes
      .add('CAMARILLA_PIVOT_POINTS')
      .add('FIBONACCI_PIVOT_POINTS')
      .add('FLOOR_PIVOT_POINTS')
      .add('WOODIE_PIVOT_POINTS');
  }

  private initThirdLineTypes() {
    this.thirdLineTypes
      .add('CAMARILLA_PIVOT_POINTS')
      .add('FIBONACCI_PIVOT_POINTS')
      .add('FLOOR_PIVOT_POINTS');
  }

  private initFourthLineTypes() {
    this.fourthLineTypes.add('CAMARILLA_PIVOT_POINTS');
  }

}
