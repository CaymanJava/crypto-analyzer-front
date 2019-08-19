import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarketRoutingModule } from "./market-routing.module";
import { SharedComponentsModule } from "../shared/components/shared-components.module";
import { FormsModule } from "@angular/forms";
import { StockMarketComponent } from './stock-market/stock-market.component';
import { SharedPipesModule } from "../shared/pipes/shared-pipes.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IndicatorModule } from "../indicator/indicator.module";
import { MarketListComponent } from "./market-list/market-list.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MarketRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
    NgbModule,
    IndicatorModule,
  ],
  declarations: [
    MarketListComponent,
    StockMarketComponent
  ],
  providers: []
})
export class MarketModule {
}
