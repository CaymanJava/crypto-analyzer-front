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
import { BwsConfigComponent } from './type/bill-williams-strategy/config/bws-config.component';
import { BaseStrategyConfigComponent } from "./type/base-strategy-config.component";
import { IndicatorModule } from "../indicator/indicator.module";
import { SharedDirectivesModule } from "../shared/directives/shared-directives.module";
import { BwsSignalsComponent } from './type/bill-williams-strategy/signals/bws-signals.component';
import { BaseStrategySignalComponent } from "./type/base-strategy-signal.component";
import { CciRsiAtrComponent } from "./type/cci-rsi-atr/cci.rsi.atr.component";
import { CciRsiAtrConfigComponent } from './type/cci-rsi-atr/config/cci-rsi-atr-config.component';
import { CciRsiAtrSignalsComponent } from './type/cci-rsi-atr/signals/cci-rsi-atr-signals.component';
import { DoubleParabolicStrategyComponent } from './type/double-parabolic-strategy/double-parabolic-strategy.component';
import { DpsarConfigComponent } from './type/double-parabolic-strategy/config/dpsar-config.component';
import { DpsarSignalsComponent } from './type/double-parabolic-strategy/signals/dpsar-signals.component';
import { HaMacdPsarComponent } from './type/ha-macd-psar/ha-macd-psar.component';
import { HaMacdPsarConfigComponent } from './type/ha-macd-psar/config/ha-macd-psar-config.component';
import { HaMacdPsarSignalsComponent } from './type/ha-macd-psar/signals/ha-macd-psar-signals.component';
import { MacdCciComponent } from './type/macd-cci/macd-cci.component';
import { LrsiMaPsarComponent } from './type/lrsi-ma-psar/lrsi-ma-psar.component';
import { LrsiMaPsarConfigComponent } from './type/lrsi-ma-psar/config/lrsi-ma-psar-config.component';
import { LrsiMaPsarSignalsComponent } from './type/lrsi-ma-psar/signals/lrsi-ma-psar-signals.component';
import { MacdCciConfigComponent } from './type/macd-cci/config/macd-cci-config.component';
import { MacdCciSignalsComponent } from './type/macd-cci/signals/macd-cci-signals.component';
import { PivotRsiMacdMaComponent } from './type/pivot-rsi-macd-ma/pivot-rsi-macd-ma.component';
import { PivotRsiMacdMaConfigComponent } from './type/pivot-rsi-macd-ma/config/pivot-rsi-macd-ma-config.component';
import { PivotRsiMacdMaSignalsComponent } from './type/pivot-rsi-macd-ma/signals/pivot-rsi-macd-ma-signals.component';
import { RsiEisMaComponent } from "./type/rsi-eis-ma/rsi-eis-ma.component";
import { RsiEisMaConfigComponent } from './type/rsi-eis-ma/config/rsi-eis-ma-config.component';
import { RsiEisMaSignalsComponent } from './type/rsi-eis-ma/signals/rsi-eis-ma-signals.component';
import { StcMaMacdComponent } from './type/stc-ma-macd/stc-ma-macd.component';
import { StcMaMacdConfigComponent } from './type/stc-ma-macd/config/stc-ma-macd-config.component';
import { StcMaMacdSignalsComponent } from './type/stc-ma-macd/signals/stc-ma-macd-signals.component';

const components = [
  BaseStrategyTypeComponent,
  BaseStrategyConfigComponent,
  BaseStrategySignalComponent,
  StrategyListComponent,
  StrategyMarketComponent,
  StrategyConfigComponent,
  BillWilliamsStrategyComponent,
  StrategyConfigHeaderComponent,
  CciRsiAtrComponent,
  DoubleParabolicStrategyComponent,
  HaMacdPsarComponent,
  MacdCciComponent,
  LrsiMaPsarComponent,
  PivotRsiMacdMaComponent,
  RsiEisMaComponent,
  StcMaMacdComponent
];

const modalConfigs = [
  BwsConfigComponent,
  CciRsiAtrConfigComponent,
  DpsarConfigComponent,
  HaMacdPsarConfigComponent,
  LrsiMaPsarConfigComponent,
  MacdCciConfigComponent,
  PivotRsiMacdMaConfigComponent,
  RsiEisMaConfigComponent,
  StcMaMacdConfigComponent
];

const modalSignals = [
  BwsSignalsComponent,
  CciRsiAtrSignalsComponent,
  DpsarSignalsComponent,
  HaMacdPsarSignalsComponent,
  LrsiMaPsarSignalsComponent,
  MacdCciSignalsComponent,
  PivotRsiMacdMaSignalsComponent,
  RsiEisMaSignalsComponent,
  StcMaMacdSignalsComponent
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
