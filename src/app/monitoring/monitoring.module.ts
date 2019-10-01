import { NgModule } from "@angular/core";
import { MonitoringRoutingModule } from "./monitoring-routing.module";
import { CommonModule } from "@angular/common";
import { SharedComponentsModule } from "../shared/components/shared-components.module";
import { NgxPaginationModule } from "ngx-pagination";
import { NgbModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedPipesModule } from "../shared/pipes/shared-pipes.module";
import { SharedDirectivesModule } from "../shared/directives/shared-directives.module";
import { StrategyModule } from "../strategy/strategy.module";
import { MemberStrategyComponent } from "./member-strategy/member-strategy.component";
import { MemberStrategyListComponent } from './member-strategy-list/member-strategy-list.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonitoringRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    NgxPaginationModule,
    NgbModule,
    NgbTooltipModule,
    StrategyModule
  ],
  declarations: [
    MemberStrategyComponent,
    MemberStrategyListComponent
  ],
  providers: []
})
export class MonitoringModule {

}
