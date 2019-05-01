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
import { FormsModule } from "@angular/forms";
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

const components = [
  BtnLoadingComponent,
  FeatherIconComponent,
  SpinnerComponent,
  DateTimeRangeComponent,
  TimeFramePickerComponent,
  DrawingToolsComponent,
  FormInputErrorComponent,
  SavingToolsComponent
];

const gridComponents = [
  GridComponent,
  GridColumnComponent,
  GridActionComponent,
  GridHeaderComponent
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
    NgbTooltipModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ColorPickerModule
  ],
  declarations: [components, gridComponents],
  exports: [components, gridComponents]
})
export class SharedComponentsModule {
}
