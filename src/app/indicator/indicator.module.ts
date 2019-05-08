import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IndicatorPickerComponent } from './indicator-picker/indicator-picker.component';
import { TieredMenuModule } from "primeng/primeng";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AccelerationDecelerationOscillatorComponent } from './indicator-config/ac/acceleration-deceleration-oscillator.component';
import { AverageDirectionalMovementIndexComponent } from './indicator-config/adx/average-directional-movement-index.component';
import { AlligatorComponent } from './indicator-config/alligator/alligator.component';
import { AwesomeOscillatorComponent } from './indicator-config/ao/awesome-oscillator.component';
import { AverageTrueRangeComponent } from './indicator-config/atr/average-true-range.component';
import { AroonComponent } from './indicator-config/aroon/aroon.component';
import { AccumulativeSwingIndexComponent } from './indicator-config/asi/accumulative-swing-index.component';
import { AverageTrueRangeBandsComponent } from './indicator-config/atrb/average-true-range-bands.component';
import { BollingerBandsComponent } from './indicator-config/bb/bollinger-bands.component';
import { CoppockCurveComponent } from './indicator-config/cc/coppock-curve.component';
import { CommodityChannelIndexComponent } from './indicator-config/cci/commodity-channel-index.component';
import { ChandelierExitComponent } from './indicator-config/ce/chandelier-exit.component';
import { ChandeForecastOscillatorComponent } from './indicator-config/cfo/chande-forecast-oscillator.component';
import { ChoppinessIndexComponent } from './indicator-config/chop/choppiness-index.component';
import { AccumulationDistributionLineComponent } from './indicator-config/adl/accumulation-distribution-line.component';
import { ColorPickerModule } from "ngx-color-picker";
import { AroonOscillatorComponent } from './indicator-config/aroon-osc/aroon-oscillator.component';
import { BollingerBandsWidthComponent } from './indicator-config/bbw/bollinger-bands-width.component';
import { SharedComponentsModule } from "../shared/components/shared-components.module";
import { ColorPickerComponent } from "./common/color-picker/color-picker.component";
import { IndicatorInputComponent } from './common/indicator-input/indicator-input.component';
import { MovingAverageShortPickerComponent } from './common/moving-average-short-picker/moving-average-short-picker.component';
import { PriceTypePickerComponent } from './common/price-type-picker/price-type-picker.component';
import { BaseIndicatorComponent } from './indicator-config/base/base-indicator.component';
import { ChaikinMoneyFlowComponent } from './indicator-config/cmf/chaikin-money-flow.component';
import { ChandeMomentumOscillatorComponent } from './indicator-config/cmo/chande-momentum-oscillator.component';

const components = [
  IndicatorPickerComponent,
  ColorPickerComponent,
  IndicatorInputComponent,
  MovingAverageShortPickerComponent,
  PriceTypePickerComponent
];

const modalConfig = [
  BaseIndicatorComponent,
  AccelerationDecelerationOscillatorComponent,
  AccumulationDistributionLineComponent,
  AverageDirectionalMovementIndexComponent,
  AlligatorComponent,
  AwesomeOscillatorComponent,
  AverageTrueRangeComponent,
  AroonComponent,
  AroonOscillatorComponent,
  AccumulativeSwingIndexComponent,
  AverageTrueRangeBandsComponent,
  BollingerBandsComponent,
  BollingerBandsWidthComponent,
  CoppockCurveComponent,
  CommodityChannelIndexComponent,
  ChandelierExitComponent,
  ChandeForecastOscillatorComponent,
  ChoppinessIndexComponent,
  ChaikinMoneyFlowComponent,
  ChandeMomentumOscillatorComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TieredMenuModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    SharedComponentsModule
  ],
  declarations: [components, modalConfig],
  providers: [],
  entryComponents: [modalConfig],
  exports: [components]
})
export class IndicatorModule {
}
