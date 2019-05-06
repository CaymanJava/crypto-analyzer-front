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
  @Input() drawConfiguration: any;
  @Input() update: boolean = false;

  configForm: FormGroup;
  drawConfigForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              protected fb: FormBuilder) {
    this.configForm = fb.group({
      'period': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'longFactor': ['', [Validators.required, Validators.min(0)]],
      'shortFactor': ['', [Validators.required, Validators.min(0)]],
    });
    this.drawConfigForm = fb.group({
      'longExitLineColor': ['#3ba158', Validators.required],
      'shortExitLineColor': ['#fa0f16', Validators.required]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.modal.close({
      configuration: {
        period: this.configForm.get('period').value,
        longFactor: this.configForm.get('longFactor').value,
        shortFactor: this.configForm.get('shortFactor').value
      },
      drawConfiguration: {
        longExitLineColor: this.drawConfigForm.get('longExitLineColor').value,
        shortExitLineColor: this.drawConfigForm.get('shortExitLineColor').value
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
        longFactor: this.configuration.longFactor,
        shortFactor: this.configuration.shortFactor
      });
      this.drawConfigForm.setValue({
        longExitLineColor: this.drawConfiguration.longExitLineColor,
        shortExitLineColor: this.drawConfiguration.shortExitLineColor
      });
    }
  }

}
