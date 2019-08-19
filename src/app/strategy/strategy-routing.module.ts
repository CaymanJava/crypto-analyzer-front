import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StrategyListComponent } from "./strategy-list/strategy-list.component";
import { StrategyMarketComponent } from "./strategy-market/strategy-market.component";
import { StrategyConfigComponent } from "./strategy-config/strategy-config.component";
import { StrategyActivator } from "../core/strategy/strategy-activator.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: StrategyListComponent,
    canDeactivate: [StrategyActivator]
  },
  {
    path: 'market',
    component: StrategyMarketComponent,
    canDeactivate: [StrategyActivator]
  },
  {
    path: 'config',
    component: StrategyConfigComponent,
    canDeactivate: [StrategyActivator]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyRoutingModule {

}
