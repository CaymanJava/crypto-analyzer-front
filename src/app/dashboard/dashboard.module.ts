import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopVolumeMarketComponent } from './top-volume/top-volume-market.component';
import { LastAddedMarketComponent } from './market/last-added-market.component';
import { LastSignalsDataComponent } from './signal/last-signals-data.component';
import { SharedComponentsModule } from "../shared/components/shared-components.module";
import { DashboardComponent } from "./dashboard.component";
import { StatisticComponent } from './statistic/statistic.component';
import { CoreModule } from "../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    NgbModule,
    DashboardRoutingModule,
    SharedComponentsModule,
    CoreModule
  ],
  declarations: [
    DashboardComponent,
    TopVolumeMarketComponent,
    LastAddedMarketComponent,
    LastSignalsDataComponent,
    StatisticComponent
  ]
})
export class DashboardModule {
}
