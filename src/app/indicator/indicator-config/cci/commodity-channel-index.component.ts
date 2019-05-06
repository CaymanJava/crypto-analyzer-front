import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotDecimalValidator } from "../../../shared/validators/not-decimal-validator";

@Component({
  selector: 'app-commodity-channel-index',
  templateUrl: './commodity-channel-index.component.html'
})
export class CommodityChannelIndexComponent implements OnInit {

  @Input() name: string;
  @Input() configuration: any;
  @Input() drawConfiguration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;
  drawConfigForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]]
    });
    this.drawConfigForm = fb.group({
      'overbought': [100, [Validators.required, Validators.min(0)]],
      'oversold': [-100, [Validators.required, Validators.max(0)]],
      'indicatorLineColor': ['#0a2ecc', Validators.required]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        period: this.configForm.get('period').value
      },
      drawConfiguration: {
        overbought: this.drawConfigForm.get('overbought').value,
        oversold: this.drawConfigForm.get('oversold').value,
        indicatorLineColor: this.drawConfigForm.get('indicatorLineColor').value
      }
    });
  }

  onColorPickerChange(color: string) {
    this.drawConfigForm.get('indicatorLineColor').setValue(color);
  }

  private initForm() {
    if (this.update) {
      this.configForm.setValue({
        period: this.configuration.period,
      });
      this.drawConfigForm.setValue({
        overbought: this.drawConfiguration.overbought,
        oversold: this.drawConfiguration.oversold,
        indicatorLineColor: this.drawConfiguration.indicatorLineColor
      });
    }
  }

}
