import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";
import { PositiveNumberValidator } from "../../../shared/validators/positive-number-validator";

@Component({
  moduleId: module.id,
  templateUrl: './average-true-range-bands.component.html'
})
export class AverageTrueRangeBandsComponent implements OnInit {

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
      'shift': ['', [Validators.required, PositiveNumberValidator.valid]],
      'priceType': ['', [Validators.required]]
    });
    this.drawConfigForm = fb.group({
      'atrBandsTopColor': ['#0a2ecc', Validators.required],
      'atrBandsBottomColor': ['#0a2ecc', Validators.required],
      'atrBandsMiddleColor': ['#fa0f16', Validators.required],
      'atrBandsChannelColor': ['#7276cc', Validators.required]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        period: this.configForm.get('period').value,
        shift: this.configForm.get('shift').value,
        priceType: this.configForm.get('priceType').value
      },
      drawConfiguration: {
        atrBandsTopColor: this.drawConfigForm.get('atrBandsTopColor').value,
        atrBandsBottomColor: this.drawConfigForm.get('atrBandsBottomColor').value,
        atrBandsMiddleColor: this.drawConfigForm.get('atrBandsMiddleColor').value,
        atrBandsChannelColor: this.drawConfigForm.get('atrBandsChannelColor').value
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
        shift: this.configuration.shift,
        priceType: this.configuration.priceType
      });
      this.drawConfigForm.setValue({
        atrBandsTopColor: this.drawConfiguration.atrBandsTopColor,
        atrBandsBottomColor: this.drawConfiguration.atrBandsBottomColor,
        atrBandsMiddleColor: this.drawConfiguration.atrBandsMiddleColor,
        atrBandsChannelColor: this.drawConfiguration.atrBandsChannelColor
      });
    }
  }

}
