import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IndicatorPickerComponent } from './indicator-picker/indicator-picker.component';
import { TieredMenuModule } from "primeng/primeng";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AccelerationDecelerationOscillatorComponent } from './indicator-config/ado/acceleration-deceleration-oscillator.component';
import { AverageDirectionalMovementIndexComponent } from './indicator-config/adx/average-directional-movement-index.component';
import { AlligatorComponent } from './indicator-config/alligator/alligator.component';
import { AwesomeOscillatorComponent } from './indicator-config/ao/awesome-oscillator.component';
import { AverageTrueRangeComponent } from './indicator-config/atr/average-true-range.component';
import { AroonComponent } from './indicator-config/aroon/aroon.component';
import { AccumulativeSwingIndexComponent } from './indicator-config/asi/accumulative-swing-index.component';
import { AverageTrueRangeBandsComponent } from './indicator-config/atrb/average-true-range-bands.component';
import { BollingerBandsComponent } from './indicator-config/bb/bollinger-bands.component';

const components = [
  IndicatorPickerComponent
];

const modalConfig = [
  AccelerationDecelerationOscillatorComponent,
  AverageDirectionalMovementIndexComponent,
  AlligatorComponent,
  AwesomeOscillatorComponent,
  AverageTrueRangeComponent,
  AroonComponent,
  AccumulativeSwingIndexComponent,
  AverageTrueRangeBandsComponent,
  BollingerBandsComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TieredMenuModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [components, modalConfig],
  providers: [],
  entryComponents: [modalConfig],
  exports: [components]
})
export class IndicatorModule {
}
