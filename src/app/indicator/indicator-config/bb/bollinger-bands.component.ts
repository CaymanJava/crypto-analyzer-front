import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  selector: 'app-bollinger-bands',
  templateUrl: './bollinger-bands.component.html'
})
export class BollingerBandsComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() drawConfiguration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;
  drawConfigForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'priceType': ['', [Validators.required]],
      'standardDeviationCoefficient': ['', [Validators.required, Validators.min(1.00001)]],
      'movingAverageType': ['', [Validators.required]]
    });
    this.drawConfigForm = fb.group({
      'bbTopColor': ['#ca0ecc', Validators.required],
      'bbBottomColor': ['#ca0ecc', Validators.required],
      'bbMiddleColor': ['#fa0f16', Validators.required],
      'bbChannelColor': ['#68cc98', Validators.required]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        period: this.configForm.get('period').value,
        priceType: this.configForm.get('priceType').value,
        standardDeviationCoefficient: this.configForm.get('standardDeviationCoefficient').value,
        movingAverageType: this.configForm.get('movingAverageType').value
      },
      drawConfiguration: {
        bbTopColor: this.drawConfigForm.get('bbTopColor').value,
        bbBottomColor: this.drawConfigForm.get('bbBottomColor').value,
        bbMiddleColor: this.drawConfigForm.get('bbMiddleColor').value,
        bbChannelColor: this.drawConfigForm.get('bbChannelColor').value
      }
    });
  }

  onColorPickerChange(color: string, line: string) {
    this.drawConfigForm.get(line).setValue(color);
  }

  private initForm() {
    if (this.update) {
      this.configForm.setValue({
        period: this.configuration.period,
        priceType: this.configuration.priceType,
        standardDeviationCoefficient: this.configuration.standardDeviationCoefficient,
        movingAverageType: this.configuration.movingAverageType,
      });
      this.drawConfigForm.setValue({
        bbTopColor: this.drawConfiguration.bbTopColor,
        bbBottomColor: this.drawConfiguration.bbBottomColor,
        bbMiddleColor: this.drawConfiguration.bbMiddleColor,
        bbChannelColor: this.drawConfiguration.bbChannelColor
      });
    }
  }

}
