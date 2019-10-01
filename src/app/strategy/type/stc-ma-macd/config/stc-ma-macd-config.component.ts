import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { NotDecimalValidator } from "../../../../shared/validators/not-decimal-validator";
import { ArraySizeValidator } from "../../../../shared/validators/array-size-validator";
import { BaseStrategyConfigComponent } from "../../../../shared/components/strategy/base/base-strategy-config.component";

@Component({
  selector: 'app-stc-ma-macd-config',
  templateUrl: './stc-ma-macd-config.component.html'
})
export class StcMaMacdConfigComponent extends BaseStrategyConfigComponent {

  constructor(private modal: NgbActiveModal,
              private fb: FormBuilder) {
    super();
    this.initForms();
  }

  initForms() {
    this.configForm = this.fb.group({
      'stcPriceType': ['', Validators.required],
      'stcMaType': ['', Validators.required],
      'stcPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'stcShortCycle': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'stcLongCycle': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'stcOversoldLevel': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'stcOverboughtLevel': ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      'maType': ['', Validators.required],
      'maPriceType': ['', Validators.required],
      'maPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'macdMaType': ['', Validators.required],
      'macdPriceType': ['', Validators.required],
      'macdFastPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'macdSlowPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'macdSignalPeriod': ['', [Validators.required, Validators.min(1), NotDecimalValidator.valid]],
      'positions': ['', [Validators.required, ArraySizeValidator.valid]]
    });
    this.drawConfigForm = this.fb.group({
      'stcLineColor': ['', Validators.required],
      'maLineColor': ['', Validators.required],
      'macdLineColor': ['', Validators.required],
      'macdSignalLineColor': ['', Validators.required],
      'macdBarChartLineColor': ['', Validators.required],
      'entryLongColor': ['', Validators.required],
      'exitLongColor': ['', Validators.required],
      'entryShortColor': ['', Validators.required],
      'exitShortColor': ['', Validators.required],
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
        stcPriceType: this.configForm.get('stcPriceType').value,
        stcMaType: this.configForm.get('stcMaType').value,
        stcPeriod: this.configForm.get('stcPeriod').value,
        stcShortCycle: this.configForm.get('stcShortCycle').value,
        stcLongCycle: this.configForm.get('stcLongCycle').value,
        stcOversoldLevel: this.configForm.get('stcOversoldLevel').value,
        stcOverboughtLevel: this.configForm.get('stcOverboughtLevel').value,
        maType: this.configForm.get('maType').value,
        maPriceType: this.configForm.get('maPriceType').value,
        maPeriod: this.configForm.get('maPeriod').value,
        macdMaType: this.configForm.get('macdMaType').value,
        macdPriceType: this.configForm.get('macdPriceType').value,
        macdFastPeriod: this.configForm.get('macdFastPeriod').value,
        macdSlowPeriod: this.configForm.get('macdSlowPeriod').value,
        macdSignalPeriod: this.configForm.get('macdSignalPeriod').value,
        positions: this.configForm.get('positions').value
      },
      drawConfiguration: {
        stcDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('stcLineColor').value,
          oversold: this.configForm.get('stcOversoldLevel').value,
          overbought: this.configForm.get('stcOverboughtLevel').value
        },
        maDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('maLineColor').value,
        },
        macdDrawConfiguration: {
          indicatorLineColor: this.drawConfigForm.get('macdLineColor').value,
          signalLineColor: this.drawConfigForm.get('macdSignalLineColor').value,
          barChartColor: this.drawConfigForm.get('macdBarChartLineColor').value
        },
        signalConfiguration: {
          entryLongColor: this.drawConfigForm.get('entryLongColor').value,
          exitLongColor: this.drawConfigForm.get('exitLongColor').value,
          entryShortColor: this.drawConfigForm.get('entryShortColor').value,
          exitShortColor: this.drawConfigForm.get('exitShortColor').value,
          signalMarkerSize: this.drawConfigForm.get('signalMarkerSize').value,
          buyMarker: this.drawConfigForm.get('buyMarker').value,
          sellMarker: this.drawConfigForm.get('sellMarker').value
        }
      }
    });
  }

  fillConfiguration() {
    this.configForm.setValue({
      stcPriceType: this.configuration.stcPriceType,
      stcMaType: this.configuration.stcMaType,
      stcPeriod: this.configuration.stcPeriod,
      stcShortCycle: this.configuration.stcShortCycle,
      stcLongCycle: this.configuration.stcLongCycle,
      stcOversoldLevel: this.configuration.stcOversoldLevel,
      stcOverboughtLevel: this.configuration.stcOverboughtLevel,
      maType: this.configuration.maType,
      maPriceType: this.configuration.maPriceType,
      maPeriod: this.configuration.maPeriod,
      macdMaType: this.configuration.macdMaType,
      macdPriceType: this.configuration.macdPriceType,
      macdFastPeriod: this.configuration.macdFastPeriod,
      macdSlowPeriod: this.configuration.macdSlowPeriod,
      macdSignalPeriod: this.configuration.macdSignalPeriod,
      positions: this.configuration.positions
    });
    this.drawConfigForm.setValue({
      stcLineColor: this.drawConfiguration.stcDrawConfiguration.indicatorLineColor,
      maLineColor: this.drawConfiguration.maDrawConfiguration.indicatorLineColor,
      macdLineColor: this.drawConfiguration.macdDrawConfiguration.indicatorLineColor,
      macdSignalLineColor: this.drawConfiguration.macdDrawConfiguration.signalLineColor,
      macdBarChartLineColor: this.drawConfiguration.macdDrawConfiguration.barChartColor,
      entryLongColor: this.drawConfiguration.signalConfiguration.entryLongColor,
      exitLongColor: this.drawConfiguration.signalConfiguration.exitLongColor,
      entryShortColor: this.drawConfiguration.signalConfiguration.entryShortColor,
      exitShortColor: this.drawConfiguration.signalConfiguration.exitShortColor,
      signalMarkerSize: this.drawConfiguration.signalConfiguration.signalMarkerSize,
      buyMarker: this.drawConfiguration.signalConfiguration.buyMarker,
      sellMarker: this.drawConfiguration.signalConfiguration.sellMarker
    });
  }

}
