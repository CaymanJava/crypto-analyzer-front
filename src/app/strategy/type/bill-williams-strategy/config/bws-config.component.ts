import { Component } from '@angular/core';
import { BaseStrategyConfigComponent } from "../../base-strategy-config.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../../shared/validators/not-decimal-validator";
import { ArraySizeValidator } from "../../../../shared/validators/array-size-validator";

@Component({
  selector: 'app-bws-config',
  templateUrl: './bws-config.component.html'
})
export class BwsConfigComponent extends BaseStrategyConfigComponent {

  constructor(private modal: NgbActiveModal,
              private fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'acFastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'acSlowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'acSmoothedPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'alligatorJawPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'alligatorJawOffset': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'alligatorTeethPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'alligatorTeethOffset': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'alligatorLipsPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'alligatorLipsOffset': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'aoFastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'aoSlowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'positions': ['', [Validators.required, ArraySizeValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'jawLineColor': ['', Validators.required],
      'teethLineColor': ['', Validators.required],
      'lipsLineColor': ['', Validators.required],
      'upFractalColor': ['', Validators.required],
      'downFractalColor': ['', Validators.required],
      'fractalMarkerSize': ['', [Validators.required, Validators.min(1)]],
      'fractalMarker': ['', Validators.required],
      'entryLongColor': ['', Validators.required],
      'exitShortColor': ['', Validators.required],
      'exitLongColor': ['', Validators.required],
      'entryShortColor': ['', Validators.required],
      'signalMarkerSize': ['', [Validators.required, Validators.min(1)]],
      'buyMarker': ['', Validators.required],
      'sellMarker': ['', Validators.required],

    });
  }

  ngOnInit() {
    this.fillConfiguration();
  }

  onSubmit() {
    this.modal.close({
      strategyConfiguration: {
        acFastPeriod: this.configForm.get('acFastPeriod').value,
        acSlowPeriod: this.configForm.get('acSlowPeriod').value,
        acSmoothedPeriod: this.configForm.get('acSmoothedPeriod').value,
        alligatorJawPeriod: this.configForm.get('alligatorJawPeriod').value,
        alligatorJawOffset: this.configForm.get('alligatorJawOffset').value,
        alligatorTeethPeriod: this.configForm.get('alligatorTeethPeriod').value,
        alligatorTeethOffset: this.configForm.get('alligatorTeethOffset').value,
        alligatorLipsPeriod: this.configForm.get('alligatorLipsPeriod').value,
        alligatorLipsOffset: this.configForm.get('alligatorLipsOffset').value,
        aoFastPeriod: this.configForm.get('aoFastPeriod').value,
        aoSlowPeriod: this.configForm.get('aoSlowPeriod').value,
        positions: this.configForm.get('positions').value
      },
      drawConfiguration: {
        alligatorConfiguration: {
          jawLineColor: this.drawConfigForm.get('jawLineColor').value,
          teethLineColor: this.drawConfigForm.get('teethLineColor').value,
          lipsLineColor: this.drawConfigForm.get('lipsLineColor').value
        },
        fractalConfiguration: {
          upFractalColor: this.drawConfigForm.get('upFractalColor').value,
          downFractalColor: this.drawConfigForm.get('downFractalColor').value,
          markerSize: this.drawConfigForm.get('fractalMarkerSize').value,
          marker: this.drawConfigForm.get('fractalMarker').value
        },
        signalConfiguration: {
          entryLongColor: this.drawConfigForm.get('entryLongColor').value,
          exitShortColor: this.drawConfigForm.get('exitShortColor').value,
          exitLongColor: this.drawConfigForm.get('exitLongColor').value,
          entryShortColor: this.drawConfigForm.get('entryShortColor').value,
          signalMarkerSize: this.drawConfigForm.get('signalMarkerSize').value,
          buyMarker: this.drawConfigForm.get('buyMarker').value,
          sellMarker: this.drawConfigForm.get('sellMarker').value
        }
      }
    });
  }

  fillConfiguration() {
    this.configForm.setValue({
      acFastPeriod: this.configuration.acFastPeriod,
      acSlowPeriod: this.configuration.acSlowPeriod,
      acSmoothedPeriod: this.configuration.acSmoothedPeriod,
      alligatorJawPeriod: this.configuration.alligatorJawPeriod,
      alligatorJawOffset: this.configuration.alligatorJawOffset,
      alligatorTeethPeriod: this.configuration.alligatorTeethPeriod,
      alligatorTeethOffset: this.configuration.alligatorTeethOffset,
      alligatorLipsPeriod: this.configuration.alligatorLipsPeriod,
      alligatorLipsOffset: this.configuration.alligatorLipsOffset,
      aoFastPeriod: this.configuration.aoFastPeriod,
      aoSlowPeriod: this.configuration.aoSlowPeriod,
      positions: this.configuration.positions
    });

    this.drawConfigForm.setValue({
      jawLineColor: this.drawConfiguration.alligatorConfiguration.jawLineColor,
      teethLineColor: this.drawConfiguration.alligatorConfiguration.teethLineColor,
      lipsLineColor: this.drawConfiguration.alligatorConfiguration.lipsLineColor,
      upFractalColor: this.drawConfiguration.fractalConfiguration.upFractalColor,
      downFractalColor: this.drawConfiguration.fractalConfiguration.downFractalColor,
      fractalMarkerSize: this.drawConfiguration.fractalConfiguration.markerSize,
      fractalMarker: this.drawConfiguration.fractalConfiguration.marker,
      entryLongColor: this.drawConfiguration.signalConfiguration.entryLongColor,
      exitShortColor: this.drawConfiguration.signalConfiguration.exitShortColor,
      exitLongColor: this.drawConfiguration.signalConfiguration.exitLongColor,
      entryShortColor: this.drawConfiguration.signalConfiguration.entryShortColor,
      signalMarkerSize: this.drawConfiguration.signalConfiguration.signalMarkerSize,
      buyMarker: this.drawConfiguration.signalConfiguration.buyMarker,
      sellMarker: this.drawConfiguration.signalConfiguration.sellMarker,
    });

  }

}
