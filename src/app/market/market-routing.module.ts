import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockMarketComponent } from "./stock-market/stock-market.component";
import { MarketListComponent } from "./market-list/market-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: MarketListComponent
  },
  {
    path: 'list/:stockId',
    component: MarketListComponent
  },
  {
    path: ':marketId',
    component: StockMarketComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketRoutingModule {
}
