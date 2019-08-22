import { NgModule } from "@angular/core";
import { StrategyRoutingModule } from "./strategy-routing.module";
import { StrategyListComponent } from "./strategy-list/strategy-list.component";
import { CommonModule } from "@angular/common";
import { SharedComponentsModule } from "../shared/components/shared-components.module";
import { NgxPaginationModule } from "ngx-pagination";
import { StrategyMarketComponent } from './strategy-market/strategy-market.component';
import { NgbModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedPipesModule } from "../shared/pipes/shared-pipes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StrategyConfigComponent } from './strategy-config/strategy-config.component';
import { BillWilliamsStrategyComponent } from './type/bill-williams-strategy/bill-williams-strategy.component';
import { StrategyConfigHeaderComponent } from './strategy-config/header/strategy-config-header.component';
import { BaseStrategyTypeComponent } from "./type/base-strategy-type.component";
import { BwsConfigComponent } from './type/bill-williams-strategy/bws-config/bws-config.component';
import { BaseStrategyConfigComponent } from "./type/base-strategy-config.component";
import { IndicatorModule } from "../indicator/indicator.module";
import { SharedDirectivesModule } from "../shared/directives/shared-directives.module";
import { BwsSignalsComponent } from './type/bill-williams-strategy/bws-signals/bws-signals.component';
import { BaseStrategySignalComponent } from "./type/base-strategy-signal.component";
import { CciRsiAtrComponent } from "./type/cci-rsi-atr/cci.rsi.atr.component";
import { CciRsiAtrConfigComponent } from './type/cci-rsi-atr/cci-rsi-atr-config/cci-rsi-atr-config.component';
import { CciRsiAtrSignalsComponent } from './type/cci-rsi-atr/cci-rsi-atr-signals/cci-rsi-atr-signals.component';

const components = [
  BaseStrategyTypeComponent,
  BaseStrategyConfigComponent,
  BaseStrategySignalComponent,
  StrategyListComponent,
  StrategyMarketComponent,
  StrategyConfigComponent,
  BillWilliamsStrategyComponent,
  StrategyConfigHeaderComponent,
  CciRsiAtrComponent
];

const modalConfigs = [
  BwsConfigComponent,
  CciRsiAtrConfigComponent
];

const modalSignals = [
  BwsSignalsComponent,
  CciRsiAtrSignalsComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StrategyRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    NgxPaginationModule,
    NgbModule,
    IndicatorModule,
    NgbTooltipModule
  ],
  declarations: [
    components,
    modalConfigs,
    modalSignals
  ],
  entryComponents: [
    modalConfigs,
    modalSignals
  ],
  providers: []
})
export class StrategyModule {

}
