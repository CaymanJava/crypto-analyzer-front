import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLoadingComponent } from './btn-loading/btn-loading.component';
import { FeatherIconComponent } from './feather-icon/feather-icon.component';
import { NgbModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SpinnerComponent } from "./spinner/spinner.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GridColumnComponent, GridComponent } from "./grid";
import { GridActionComponent } from "./grid/grid-action.component";
import { GridHeaderComponent } from "./grid/grid.header.component";
import { DateTimeRangeComponent } from './date-time-range/date-time-range.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { TimeFramePickerComponent } from './time-frame-picker/time-frame-picker.component';
import { DrawingToolsComponent } from './drawing-tools/drawing-tools.component';
import { ColorPickerModule } from "ngx-color-picker";
import { FormInputErrorComponent } from "./error/form.input.error.component";
import { SavingToolsComponent } from './saving-tools/saving-tools.component';
import { StockMarketListComponent } from './market-list/stock-market-list.component';
import { StockMarketHeader } from "./stock-market-header/stock-market-header.component";
import { SliderComponent } from './slider/slider.component';
import { MatSliderModule } from "@angular/material";
import { MarkerPickerComponent } from './marker-picker/marker-picker.component';
import { ColorPickerComponent } from "./indicator/color-picker/color-picker.component";
import { IndicatorInputComponent } from "./indicator/indicator-input/indicator-input.component";
import { MovingAverageTypePickerComponent } from "./indicator/moving-average-picker/moving-average-type-picker.component";
import { PriceTypePickerComponent } from "./indicator/price-type-picker/price-type-picker.component";
import { IndicatorSwitcherComponent } from "./indicator/indicator-switcher/indicator-switcher.component";
import { ShiftTypePickerComponent } from "./indicator/shift-type-picker/shift-type-picker.component";
import { PivotPointsPickerComponent } from "./indicator/pivot-points-picker/pivot-points-picker.component";
import { VolumeIndexTypePickerComponent } from "./indicator/volume-index-type-picker/volume-index-type-picker.component";
import { MarkerSizeSliderComponent } from "./indicator/marker-size-slider/marker-size-slider.component";
import { IndicatorMarkerPickerComponent } from "./indicator/indicator-marker-picker/indicator-marker-picker.component";
import { PositionPickerComponent } from './indicator/position-picker/position-picker.component';
import { BaseStrategySignalComponent } from "./strategy/base/base-strategy-signal.component";
import { BaseStrategyConfigComponent } from "./strategy/base/base-strategy-config.component";
import { BaseStrategyTypeComponent } from "./strategy/base/base-strategy-type.component";
import { MemberStrategyConfigComponent } from './strategy/member-strategy-config/member-strategy-config.component';
import { TimeUnitPickerComponent } from './strategy/time-unut-picker/time-unit-picker.component';
import { NotificationDestinationComponent } from './strategy/notification-destination/notification-destination.component';

const components = [
  BtnLoadingComponent,
  FeatherIconComponent,
  SpinnerComponent,
  DateTimeRangeComponent,
  TimeFramePickerComponent,
  DrawingToolsComponent,
  FormInputErrorComponent,
  SavingToolsComponent,
  StockMarketListComponent,
  StockMarketHeader,
  SliderComponent,
  MarkerPickerComponent,
  ColorPickerComponent,
  IndicatorInputComponent,
  MovingAverageTypePickerComponent,
  PriceTypePickerComponent,
  IndicatorSwitcherComponent,
  ShiftTypePickerComponent,
  PivotPointsPickerComponent,
  VolumeIndexTypePickerComponent,
  MarkerSizeSliderComponent,
  IndicatorMarkerPickerComponent,
  PositionPickerComponent,
  BaseStrategyTypeComponent,
  BaseStrategyConfigComponent,
  BaseStrategySignalComponent,
  TimeUnitPickerComponent,
  NotificationDestinationComponent
];

const gridComponents = [
  GridComponent,
  GridColumnComponent,
  GridActionComponent,
  GridHeaderComponent
];

const modalComponents = [
  MemberStrategyConfigComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedPipesModule,
    SharedDirectivesModule,
    PerfectScrollbarModule,
    NgbModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ColorPickerModule,
    MatSliderModule
  ],
  declarations: [components, gridComponents, modalComponents],
  entryComponents: [modalComponents],
  exports: [components, gridComponents]
})
export class SharedComponentsModule {
}
